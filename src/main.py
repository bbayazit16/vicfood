import requests
from bs4 import BeautifulSoup, element
import json
from typing import List, Dict


def get_menu_url(menu_week: int) -> str:
    base_url: str = (
        "https://www.vicu.utoronto.ca/"
        "hospitality-services/"
        "student-meal-plans-and-dining-hall-menus/"
        "burwash-dining-hall"
    )

    if menu_week == 1:
        return base_url + "/"
    return f"{base_url}-{menu_week}/"


def get_page_content(url: str) -> str:
    headers: Dict[str, str] = {"User-Agent": "VicFood.ca"}
    response = requests.get(url, headers=headers)
    return response.text


def get_food_type(item: BeautifulSoup) -> str:
    td_text: str = item.find_parent("tr").find("td").get_text()
    normalized_text: str = td_text.replace("\n", "").lower().replace(" ", "")

    match normalized_text:
        case "entrée":
            return "entree"
        case "vegetarianentrée":
            return "vegetarian_entree"

    return normalized_text


def parse_menu_item(item: element.Tag) -> Dict[str, any]:
    food_type: str = get_food_type(item)

    tags: List[str] = []
    if "(H)" in item.text:
        tags.append("H")
    if "(GF)" in item.text:
        tags.append("GF")
    if "(DF)" in item.text:
        tags.append("DF")
    if "(VEG)" in item.text:
        tags.append("VEG")
    if "(VGN)" in item.text:
        tags.append("VGN")

    # EXPERIMENTAL: replace <br> tags with newlines
    for br in item.find_all('br'):
        br.replace_with("\n")

    menu_item_text: str = item.text.replace("(H)", "").replace("(GF)", "").replace(
        "(DF)", "").replace("(VEG)", "").replace("(VGN)", "")

    # EXPERIMENTAL: catch any remaining parentheses
    # Noticed that some menu items have double parentheses in the original menu,
    # i.e sides of Week 1 Tuesday Lunch:
    # 
    # Roasted Broccoli & Carrots
    # (GF))(VGN)
    menu_item_text = menu_item_text.strip().replace(")", "").replace("(", "")

    return {
        "foodtype": food_type,
        "item": menu_item_text,
        "tags": tags
    }


def scrape_menus() -> List[List[Dict[str, List[Dict[str, str]]]]]:
    weeks: List[List[Dict[str, List[Dict[str, str]]]]] = []

    for week in range(3):
        menu_url: str = get_menu_url(week + 1)
        page_content: str = get_page_content(menu_url)
        soup = BeautifulSoup(page_content, "html.parser")
        accordion_section = soup.find("section", class_="accordion")
        accordion_details = accordion_section.find_all(
            "details", class_="accordion")
        week_menus: List[Dict[str, List[Dict[str, str]]]] = []

        for details_tag in accordion_details:
            accordion_content = details_tag.find(
                "div", class_="accordion-content")

            if accordion_content:
                menu = {"lunch": [], "dinner": []}
                ul_elements = accordion_content.find_all("ul")

                for ul_element in ul_elements:
                    category = "lunch" if "Lunch" in ul_element.find_previous(
                        'h3').text else "dinner"
                    menu_items = ul_element.find_all("li")

                    for item in menu_items:
                        menu_item = parse_menu_item(item)
                        menu[category].append(menu_item)

                week_menus.append(menu)
        weeks.append(week_menus)
    return weeks


if __name__ == "__main__":
    all_menus = scrape_menus()
    with open("menu.json", "w+") as f:
        json.dump(all_menus, f)

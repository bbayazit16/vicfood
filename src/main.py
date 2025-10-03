from json import loads, dump

DAYS = ["monday", "tuesday", "wednesday",
        "thursday", "friday", "saturday", "sunday"]


def parse_food(item: str) -> tuple[str, list[str]]:
    """
    Return a tuple of the:
        1) Normalized food text (without tags, stripped)
        2) List of tags (H, GF, DF, VEG, VGN)
    """

    # Regex pattern to extract (item): \(.+\)
    tags: list[str] = []
    if "(H)" in item:
        tags.append("H")
    if "(GF)" in item:
        tags.append("GF")
    if "(DF)" in item:
        tags.append("DF")
    if "(VEG)" in item:
        tags.append("VEG")
    if "(VGN)" in item:
        tags.append("VGN")

    menu_item_text: str = item.replace("(H)", "").replace("(GF)", "").replace(
        "(DF)", "").replace("(VEG)", "").replace("(VGN)", "")

    # EXPERIMENTAL: catch any remaining parentheses
    # Noticed that some menu items have double parentheses in the original menu,
    # i.e sides of Week 1 Tuesday Lunch:
    #
    # Update 2024-2025 year: Not sure if this is still the case.
    #
    # Roasted Broccoli & Carrots
    # (GF))(VGN)
    menu_item_text = menu_item_text.strip().replace(")", "").replace("(", "")

    return menu_item_text, tags


def get_food_type(item: str) -> str:
    """Given a food type, return the normalized food type"""
    match item:
        case "eggs specialty":
            return "eggs_specialty"
        case "sweet breakfast":
            return "sweet_breakfast"
        case "veg_entree":
            return "vegetarian_entree"
        case "gluten-free":
            return "gluten_free"
        case "soup":
            return "soups"
        # Otherwise:
        case _:
            return item


def parse_lunch_or_dinner(partitioned_json: dict):
    output = []
    for lunch in partitioned_json:
        week_output = []
        for item in DAYS:
            day: dict = lunch[item]
            day_output = {}

            for key in day:
                foods = []
                for food in day[key]:
                    item, tags = parse_food(food)
                    foods.append({
                        "name": item,
                        "tags": tags
                    })
                new_key = get_food_type(key)
                if new_key == "gluten_free":
                    # Add 'GF' tag to all items in gluten-free category, if not exists.
                    # Original menu does not have 'GF' tag for gluten-free items, becuase
                    # it is considered 'explicit'.
                    for food in foods:
                        if "GF" not in food["tags"]:
                            food["tags"].append("GF")
                day_output[new_key] = foods
            week_output.append(day_output)
        output.append(week_output)

    return output


def parse_breakfast(json):
    breakfast_output = []
    breakfast_original: dict = json[0]
    for item in DAYS:
        day: dict = breakfast_original[item]
        day_output = {}

        for key in day:
            # We have: "eggs": ["Scrambled Eggs (VEG)(GF)", "Soft-Boiled Eggs (VEG)(GF)"],
            # We want: "eggs": [{"name": "Scrambled Eggs", "tags": ["VEG", "GF"]}, ...]
            foods = []
            for food in day[key]:
                item, tags = parse_food(food)
                foods.append({
                    "name": item,
                    "tags": tags
                })
            day_output[get_food_type(key)] = foods

        breakfast_output.append(day_output)
    return breakfast_output


def normalize_json(json: list) -> tuple[dict, dict]:
    breakfast = parse_breakfast(json)

    lunch = parse_lunch_or_dinner(json[1:1+3])
    dinner = parse_lunch_or_dinner(json[4:4+3])

    return {
        "breakfast": breakfast,
        "lunch": lunch,
        "dinner": dinner
    }


# perl -pi -e 's/\\xe9/e/g' burwash-fall-original.json
if __name__ == "__main__":
    with open("burwash-fall-original.json", 'r') as original_json_file, open("normalized_menu.json", "w+") as output:
        json = loads(original_json_file.read())
        menu = normalize_json(json)
        dump(menu, output)


# ======
# Original scraper code
# ======
#

# import requests
# from bs4 import BeautifulSoup, element
# import json
# from typing import List, Dict


# def get_menu_url(menu_week: int) -> str:
#     base_url: str = (
#         "https://www.vicu.utoronto.ca/"
#         "hospitality-services/"
#         "student-meal-plans-and-dining-hall-menus/"
#         "burwash-dining-hall"
#     )

#     if menu_week == 1:
#         return base_url + "/"
#     return f"{base_url}-{menu_week}/"


# def get_page_content(url: str) -> str:
#     headers: Dict[str, str] = {"User-Agent": "VicFood.ca"}
#     response = requests.get(url, headers=headers)
#     return response.text


# def get_food_type(item: BeautifulSoup) -> str:
#     td_text: str = item.find_parent("tr").find("td").get_text()
#     normalized_text: str = td_text.replace("\n", "").lower().replace(" ", "")

#     match normalized_text:
#         case "entrée":
#             return "entree"
#         case "vegetarianentrée":
#             return "vegetarianentree"

#     return normalized_text


# def parse_menu_item(item: element.Tag) -> Dict[str, any]:
#     food_type: str = get_food_type(item)

#     # Regex pattern to extract (item): \(.+\)
#     tags: List[str] = []
#     if "(H)" in item.text:
#         tags.append("H")
#     if "(GF)" in item.text:
#         tags.append("GF")
#     if "(DF)" in item.text:
#         tags.append("DF")
#     if "(VEG)" in item.text:
#         tags.append("VEG")
#     if "(VGN)" in item.text:
#         tags.append("VGN")

#     # EXPERIMENTAL: replace <br> tags with newlines
#     for br in item.find_all('br'):
#         br.replace_with("\n")

#     menu_item_text: str = item.text.replace("(H)", "").replace("(GF)", "").replace(
#         "(DF)", "").replace("(VEG)", "").replace("(VGN)", "")

#     # EXPERIMENTAL: catch any remaining parentheses
#     # Noticed that some menu items have double parentheses in the original menu,
#     # i.e sides of Week 1 Tuesday Lunch:
#     #
#     # Roasted Broccoli & Carrots
#     # (GF))(VGN)
#     menu_item_text = menu_item_text.strip().replace(")", "").replace("(", "")

#     return {
#         "foodtype": food_type,
#         "item": menu_item_text,
#         "tags": tags
#     }


# def scrape_menus() -> List[List[Dict[str, List[Dict[str, str]]]]]:
#     weeks: List[List[Dict[str, List[Dict[str, str]]]]] = []

#     for week in range(3):
#         menu_url: str = get_menu_url(week + 1)
#         page_content: str = get_page_content(menu_url)
#         soup = BeautifulSoup(page_content, "html.parser")
#         accordion_section = soup.find("section", class_="accordion")
#         accordion_details = accordion_section.find_all(
#             "details", class_="accordion")
#         week_menus: List[Dict[str, List[Dict[str, str]]]] = []

#         for details_tag in accordion_details:
#             accordion_content = details_tag.find(
#                 "div", class_="accordion-content")

#             if accordion_content:
#                 menu = {"lunch": [], "dinner": []}
#                 ul_elements = accordion_content.find_all("ul")

#                 for ul_element in ul_elements:
#                     category = "lunch" if "Lunch" in ul_element.find_previous(
#                         'h3'
#                     ).text else "dinner"
#                     menu_items = ul_element.find_all("li")

#                     for item in menu_items:
#                         menu_item = parse_menu_item(item)
#                         menu[category].append(menu_item)

#                 week_menus.append(menu)
#         weeks.append(week_menus)
#     return weeks


# if __name__ == "__main__":
#     all_menus = scrape_menus()
#     with open("menu.json", "w+") as f:
#         json.dump(all_menus, f)

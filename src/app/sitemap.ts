import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://vicfood.ca",
            lastModified: new Date(),
            priority: 1,
        },
    ]
}

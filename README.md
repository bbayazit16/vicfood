# vicfood.ca: The Burwash Dining Hall Menu

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

VicFood simplifies access to the daily menu at the University of Toronto's Victoria University Burwash Dining Hall. With VicFood, students can easily view what's being served without the hassle of navigating through multiple web pages on the Victoria College website.

## Features

-   View Lunch & Dinner for the current day
-   See reviews for each meal
-   Menu preview for upcoming days

## Motivation

As a student at Victoria College, I found it hard to check what food is being served at Burwash Dining Hall. The only way to check the menu was to go on the Victoria College website, click on the Burwash Dining Hall page, and then click on the menu, and then choose the correct week, and then the day, etc. This was a very tedious process, and I wanted to make it easier for myself and other students to check the menu. VicFood automatically displays the menu for the current day, and also allows users to check the menu for other days.

## Technical Details

-   Built with Next.js, React, Typescript, and TailwindCSS.
-   Hosted on Vercel with Firebase Firestore for storing reviews.
-   Uses open-source, GDPR-compliant [Plausible Analytics](https://plausible.io), hosted on a Google Cloud Engine E2 Micro instance. The Plausible instance is available at [analytics.vicfood.ca](https://analytics.vicfood.ca).
-   Vicfood.ca is behind Cloudflare for caching and SSL.
-   For potential future migration to GCP Cloud Run, [Dockerfile](Dockerfile) and [cloudbuild.yaml](cloudbuild.yaml) file are included.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Building Locally

```sh
yarn dev # run
yarn build # build

# Using Docker:
docker build -t vicfood.ca . # build docker image
docker run -p 3000:3000 -e FIREBASE_ADMIN_KEY=... vicfood.ca # run docker image
```

## License

VicFood is licensed under [AGPL-3.0-only](LICENSE)

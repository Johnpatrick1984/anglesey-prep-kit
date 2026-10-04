# Anglesey Prep Kit

A free home emergency prep app and advice site.

- `index.html` is the website: Home, Prep guides, Catalogue, Videos, About.
- `app/` is the standalone app. It stores everything on the visitor's own phone (no accounts, no server).
- `data/catalogue.js` holds every kit item. Add a price paid, where it was bought, a rating, a verdict and a video id to an item to publish a review.
- `data/site-config.js` holds the YouTube channel address, the contact email and the list of videos.
- `assets/` holds the fonts (Barlow, SIL Open Font Licence) and screenshots.

When the app changes, bump `VERSION` in `app/sw.js` so phones pick up the new copy.

The site is served by GitHub Pages from the `main` branch.

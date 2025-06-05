# ZigExplore

ZigExplore is a small static website demonstrating a tourism portal for the
Ziguinchor region of Senegal. The site showcases local activities, culture,
and accommodation options with a modern responsive layout built with
[Tailwind CSS](https://tailwindcss.com) and small amounts of vanilla
JavaScript.

This repository contains only HTML, CSS and JavaScript files. All third party
libraries such as Tailwind and Font Awesome are loaded from public CDNs so no
additional packages are required.

## Running the site

1. Clone or download this repository.
2. Start a small web server from the project directory, for example:

   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and navigate to `http://localhost:8000/index.html`.
   You can also open `index.html` directly from your file system, but using a
   local server better mimics a real deployment.

The site is completely static so there is no build step. Any modern browser
with internet access should be able to display it.

## Project structure

- `index.html` – main page with all sections (hero banner, FAQ, shop, trips,
  etc.).
- `style.css` – additional styling on top of Tailwind defaults.
- `script.js` – small interactive behaviours such as filtering items.
- Media assets (images and demo video) are included in the repository.

Feel free to adapt the content or styling to create your own tourism landing
page.

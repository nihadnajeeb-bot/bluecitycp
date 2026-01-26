# Blue City Group — Static Website

This is a lightweight, responsive static site for Blue City Group. It includes Home, About, Services, Gallery, Investors, Blog, and Contact pages.

## Run locally
- Double-click `index.html` to open in your browser, or
- Use a simple server:
  - Python: `python -m http.server 8080`
  - Node: `npx serve` or `npx http-server`

## Deploy (no coding)
- Netlify: drag-and-drop this folder into the Netlify dashboard.
- GitHub Pages: push to a repo and enable Pages for the `main` branch (root).
- Vercel: import the repo; select framework = "Other".

## Customize
- Edit text in the `.html` files.
- Replace placeholder images in `assets/images/` and update `<img>` sources.
- Colors and spacing live in `assets/css/style.css` under `:root` variables.

## Contact form
Currently uses `mailto:` for simplicity. For a proper form backend, connect to Netlify Forms, Formspree, or a serverless endpoint.

## Credits
Design inspired by the original reference site (https://cardoso.ae/). Update names and numbers to your business details.

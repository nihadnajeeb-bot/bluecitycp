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

## Live Google rating (footer)
The footer shows a Google rating block that can display **live** rating and review count from your [Google Business Profile](https://business.google.com).

### One-time setup (Netlify)
1. **Get your Place ID**  
   Use [Place ID finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) or [Find Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id): search for your business (e.g. "Blue City Technical Contracting") and copy the Place ID (e.g. `ChIJ...`).

2. **Google Cloud**  
   - Go to [Google Cloud Console](https://console.cloud.google.com/).  
   - Create or select a project.  
   - Enable **Places API (New)** (APIs & Services → Library → search "Places API").  
   - Create an API key (APIs & Services → Credentials → Create credentials → API key).  
   - Restrict the key to "Places API (New)" and your site’s domain (optional but recommended).

3. **Netlify environment variables**  
   In your Netlify site: Site settings → Environment variables → Add:
   - `GOOGLE_PLACE_ID` = your Place ID (e.g. `ChIJ...`)  
   - `GOOGLE_PLACES_API_KEY` = your API key  

4. **Redeploy**  
   Trigger a new deploy so the serverless function picks up the new variables.

The homepage footer will then load the current rating and review count from Google. If the function is not set up or fails, the block shows "—" until the next successful load.

### Hosting elsewhere
The live rating uses a Netlify Function at `/.netlify/functions/get-google-rating`. On another host (e.g. Vercel), deploy an equivalent serverless function that calls [Google Places API (New) Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details) with `fields=rating,userRatingCount` and returns `{ rating, user_ratings_total }`. Then set the link’s `data-google-rating-api` attribute to your function URL.

## Credits
Design inspired by the original reference site (https://cardoso.ae/). Update names and numbers to your business details.

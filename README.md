# Zain Ul Abideen Furniture House — Website

React + Vite landing page with GSAP animations and Lenis smooth scrolling.

## Run on your computer

```bash
npm install      # first time only
npm run dev      # opens at http://localhost:5173
```

## Make the live version

```bash
npm run build    # creates the dist/ folder
```

Upload the `dist/` folder to any static host — Netlify, Vercel, Cloudflare Pages or your cPanel `public_html`.

## What to edit

| What | Where |
|---|---|
| Phone, WhatsApp number, email, address, hours, social links | `src/data.js` → `CONFIG` |
| Services, gallery items, materials, process text | `src/data.js` |
| Customer reviews (the section is hidden until you add some) | `src/data.js` → `REVIEWS` |
| Colours and fonts | top of `src/styles.css` |
| Photos | `public/images/` (each photo has `name.webp` + `name-sm.webp`) |
| Sheet catalogue (`#/sheets` page) | list in `src/sheets.json`, swatches in `public/sheets/` |

### Design Studio (`#/studio` page)
Customers pick a room, a part (e.g. shutters, side panel) and a sheet; the sheet is drawn onto the photo in perspective while keeping the photo's own light and shadow (`src/lib/roomRender.js`).
Rooms are defined in `src/studioRooms.js`: each part is four corner points given as fractions of the photo (top-left, top-right, bottom-right, bottom-left), with optional `clip` outlines and `holes` for mirrors or objects in front. To add a room, put the photo in `public/images/` and mark its surfaces the same way.

### Sheet catalogue
The 408 sheet designs on the Sheets page are from ZRK Group (zrkgroup.com), taken from their public product pages in October 2026.
To add or remove a design, edit `src/sheets.json` (`code`, `name`, `series`, `finish`, `img`) and put a square `<img>.webp` in `public/sheets/`.

### Replacing photos with your own work
Save your photo as `public/images/<name>.webp`, plus a half-width copy named `<name>-sm.webp`. Keep the same name to replace an existing photo, or use a new name and add it to `GALLERY` in `src/data.js`.

## Photo credits
Photos named `work-*`, `school-*`, `podium-*`, `study-*` and `office-*` were supplied by the owner (originals kept in `_source-photos/`; third-party logos and watermarks were removed).
The other photos come from Unsplash and are free for commercial use under the Unsplash License. Photographer names and links are listed in `src/photo-credits.json`.
Replace them with photos of your own projects as you collect them. Real work builds the most trust.

## Old version
The first static (non-React) version is kept in `_old-static-site/`.

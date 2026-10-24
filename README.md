# Champoccino menu

A mobile-first digital menu for **Champoccino** and its sister brand, **Whisk'N by Champoccino**. Built with plain HTML, CSS, and vanilla JavaScript. No installation, build step, or backend is required.

## GitHub Pages site

- Site URL: [reindell.github.io/champoccino](https://reindell.github.io/champoccino/)
- Source repository: [reindell/champoccino](https://github.com/reindell/champoccino)
- Publishing source: `main`, `/ (root)`. Future pushes to `main` publish automatically.

## QR code

- [Download the PNG QR code](assets/champoccino-qr.png) for sharing or adding to a table sign.
- [Download the SVG QR code](assets/champoccino-qr.svg) for printing at any size.

The QR code opens `https://reindell.github.io/champoccino/` directly. Keep the white border around it when printing. Menu changes at the same URL do not require a new QR code; regenerate it if the site address changes.

## Designed menu sticker

- [Print the sticker PDF](assets/champoccino-sticker.pdf): finished size **80 × 100 mm**.
- [Print four stickers on A4](assets/champoccino-sticker-a4.pdf), with light cut guides.
- [Download the high-resolution PNG](assets/champoccino-sticker.png) for sharing or placing in a print layout.
- [Download the vector SVG](assets/champoccino-sticker.svg) for a print shop or further editing.

Print the PDF at **Actual size / 100%** on sticker paper. Keep the QR code's white border intact. The sticker uses the same live menu URL as the standalone QR code above. Its simple layout omits stars and cartoon characters.

## Files

```text
index.html
style.css
script.js
README.md
assets/
  logo.svg
  favicon.svg
  mascot-coffee.svg
  mascot-matcha.svg
  mascot-iced.svg
  mascot-fries.svg
  menu.jpg
  champoccino-qr.png
  champoccino-qr.svg
  champoccino-sticker.pdf
  champoccino-sticker-a4.pdf
  champoccino-sticker.png
  champoccino-sticker.svg
```

The website uses the original illustrated coffee and matcha hero, category mascots, decorative stars, and smiling coffee-cup favicon. The included **menu.jpg is a typeset recreation of the supplied menu content and visual reference**, containing all 31 items and their prices; it is not the original uploaded artwork. Replace it with your original high-resolution export whenever available, keeping the same filename.

## Preview locally

Double-click `index.html` to open it in a browser. All local links are relative, so the same files also work in a GitHub Pages project repository.

For an optional local web server, open a terminal in this folder and run:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Google Fonts loads Anton and Poppins when online; local font fallbacks keep the page usable otherwise.

## Menu and controls

- **View Menu** scrolls to the menu and moves keyboard focus to it. Reduced-motion preferences are respected.
- Category buttons filter the menu immediately. The default selection is **All**, with **Iced** drinks.
- **Hot / Iced** controls Coffee and Matcha: Hot shows 8oz; Iced shows 12oz and 16oz. Iced-only items disappear when Hot is selected. In All, the other categories stay visible and retain their normal sizes.
- All 31 items display their sizes and prices in Philippine pesos (₱). Snack flavors appear as descriptions.
- The customer menu is for viewing only, with no ordering controls or featured-item badges. The website retains its original characters and decorative design; the printable QR sticker stays simple.
- **View Full Menu Image** opens the full image in a modal. Close it with the close button, Escape, or the backdrop. Keyboard focus stays inside the modal and returns to the opening button when closed. The Download link saves `assets/menu.jpg`.
- The floating **Back to top** button appears after scrolling.

## Deploy free with GitHub Pages

These instructions use your GitHub account, `reindell`, and the example repository name `champoccino`.

1. Sign in to [GitHub](https://github.com/reindell) and create a **new public repository** named `champoccino`.
2. Leave **Add a README file**, **Add .gitignore**, and **Choose a license** unchecked so the repository starts empty. Click **Create repository**.
3. Install Git if necessary. Open a terminal in the folder containing `index.html` and run:

   ```sh
   git init
   git add index.html style.css script.js README.md assets
   git commit -m "Add Champoccino digital menu"
   git branch -M main
   git remote add origin https://github.com/reindell/champoccino.git
   git push -u origin main
   ```

   Complete GitHub sign-in if Git asks. If you chose a different repository name, replace `champoccino` in the remote URL.

4. Open the repository on GitHub. Go to **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
6. Select branch **main** and folder **/ (root)**, then click **Save**.
7. Wait for the Pages deployment to finish. The Pages settings will show the live link:

   ```text
   https://reindell.github.io/champoccino/
   ```

   The general format is `https://<username>.github.io/<repo-name>/`.

8. Open the live link on your phone and test the category buttons and full-menu image. Use that full HTTPS URL as the destination for a printed QR code, social profile link, or table sign.

The publishing steps follow [GitHub's official Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). The `reindell/champoccino` repository already has Pages configured; use the setup steps above when deploying a separate copy.

## Update a price

Edit the single **`MENU` object near the top of `script.js`**. Each item contains a `prices` object. For example:

```js
{ name: "Americano", prices: { hot8: 109, iced12: 119, iced16: 139 } }
```

Change the appropriate number and save. `hot8` means Hot 8oz, `iced12` means Iced 12oz, and `iced16` means Iced 16oz. Snacks, meals, and add-ons use `single`. Omit a size if it is unavailable; do not set it to zero.

The cards render from this object, so there is no menu-card HTML to edit. **The downloadable `assets/menu.jpg` is a separate static image: update or replace it too when prices or items change.**

Publish future updates with:

```sh
git add index.html style.css script.js README.md assets
git commit -m "Update menu"
git push
```

GitHub Pages redeploys after the push.

## Replace artwork and social links

- The wordmarks and hero artwork are in `index.html`; category mascot paths are in `MENU` in `script.js`. Keep descriptive alt text when replacing illustrations. The printable QR sticker stays free of decorative stars and cartoon characters.
- Replace `assets/menu.jpg` with your original complete menu export. Keep the filename so the modal, direct image link, and download continue to work.
- Replace `assets/favicon.svg` to change the browser icon.
- The shared Facebook and TikTok buttons are in the footer of `index.html`: [Facebook](https://www.facebook.com/profile.php?id=61591409438206) and [TikTok @champoccino.x.whi](https://www.tiktok.com/@champoccino.x.whi). Update their `href` values if the account links change.
- Instagram URLs are built in `script.js` from the `data-instagram` handles in `index.html`: `Champo_ccino` and `Whisk_nc`. Update those attributes if the handles change.
- Social links use `target="_blank"` and `rel="noopener noreferrer"`.
- The title, description, Open Graph tags, and favicon are in the `<head>` of `index.html`. The `og:url` and `og:image` metadata use the production URL `https://reindell.github.io/champoccino/` so social preview crawlers can find the site and image. Update those two metadata values if the account or repository name changes. Page links, scripts, styles, and image sources stay relative.

Keep local asset links relative, such as `assets/menu.jpg` and `style.css`. A leading slash like `/assets/menu.jpg` would point outside the repository path on GitHub Pages.

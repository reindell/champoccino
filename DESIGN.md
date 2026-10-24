---
version: alpha
name: Champoccino
description: A simple customer menu for viewing café items, sizes, flavors, and prices.
colors:
  coffee: "#5a4d41"
  white: "#ffffff"
  cream: "#f6f1ea"
  yellow: "#f9b233"
  muted: "#756b60"
  line: "#ded6cc"
typography:
  display:
    fontFamily: '"Anton", Impact, "Arial Narrow", sans-serif'
  body:
    fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif'
rounded:
  control: "5px"
  card: "8px"
  dialog: "12px"
spacing:
  page-max: "1160px"
  phone-gutter: "20px"
components:
  button: {}
  card: {}
  dialog: {}
---

# Champoccino design

## Overview

Customers scan the QR code to browse the Champoccino and Whisk'N menu on their phones. Keep the website's original illustrated characters, decorative stars, hero artwork, and good-days strip while offering menu viewing without ordering controls. The printed QR sticker stays simple, without stars or characters. Keep the established coffee brown, cream, yellow accents, and typography. README.md and MENU in script.js establish English copy, Philippine peso prices, and a static site without a backend.

## Colors

`style.css` is the canonical token source. The frontmatter mirrors its `:root` properties: coffee → `--coffee`, white → `--white`, cream → `--cream`, yellow → `--yellow`, muted → `--muted`, line → `--line`. Coffee carries text and primary actions; cream is the menu card surface; yellow supplies restrained accents. Keep the global scrollbar baseline and system forced-color support.

## Typography

Anton through `--display` carries headings; Poppins through `--body` carries body text and controls. Preserve local fallbacks and tabular numerals for prices. Display prices in Philippine pesos (₱).

## Layout

Keep the original illustrated hero: copy above the coffee and matcha characters on phones, with copy and artwork side by side on desktop. Retain the happy sticker, good-days strip, category mascots, and decorative callout. Keep the one-, two-, and three-column menu grid at its 540px and 850px breakpoints and the 1160px page width. The category bar stays sticky and scrolls horizontally on narrow screens. The document owns vertical scrolling. The full-menu image dialog scrolls within the viewport. Preserve the centered Reindell M. Almazan footer credit.

## Elevation & Depth

Use borders and cream surfaces for menu cards. Reuse the full-menu dialog's backdrop and modal shadow.

## Shapes

Keep 5px category controls, 7px action buttons, 8px cards, and 12px dialog corners. Circular close controls match the existing full-menu window.

## Components

Reuse `.button`, `.button-primary`, `.button-outline`, `.menu-dialog`, `.dialog-header`, and `.close-menu`. Keep semantic buttons, visible focus, hover states, and 44px minimum control targets. Cards display item names, flavor descriptions, sizes, and prices.

| Capability | Canonical owner | Source of truth | Verification |
|---|---|---|---|
| Menu content | MENU in script.js | All 31 items and their prices | Category counts and price checks |
| Filters | Category and temperature button groups | renderMenu in script.js | Categories, Hot/Iced, keyboard |
| Scrollbar | Global style.css baseline | :root scrollbar tokens | Narrow viewport and dialog |
| Full-menu image | #menu-dialog with bindModal | assets/menu.jpg | Open, close, Escape, focus restoration |

## Iconography

Use the original cartoon coffee, matcha, iced-drink, and fries artwork in the website hero and category headers, alongside decorative brand stars. Functional icons support navigation, temperature, social links, and closing the image dialog. The favicon uses the original smiling coffee cup. Item-level featured badges remain omitted. The full-menu image and printable QR sticker stay free of stars; the QR sticker also omits characters and preserves the QR code's white border and destination.

## Motion

Keep existing hover transitions and reduced-motion scrolling. Reduced-motion preferences disable transitions and animations.

## Workflow

Visitors browse all categories or select a category. Coffee and Matcha switch between Hot 8oz and Iced 12oz/16oz; unavailable sizes are omitted. Other categories retain their normal sizes. Snack flavors appear as informational descriptions. The menu has no selection, quantity, customer-name, payment, waiting, or receipt flow.

View Menu moves focus to the menu. View Full Menu Image opens the complete menu, with keyboard focus contained and restored by the shared bindModal behavior. Close, Escape, and the backdrop dismiss it. An image failure displays a message directing visitors to the text menu. Back to top returns to the header. Social links remain available in the footer.

---
version: alpha
name: Champoccino
description: A friendly café menu with an order list to show at the counter.
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

The café's existing illustrated cups, matcha whisk, coffee brown, and yellow accents define the identity. Keep the menu familiar as ordering features are added. Visitors browse on their phones and show their selections to staff at the counter. README.md and the existing menu establish English copy, Philippine peso prices, and a static site without a backend. The page combines a brand introduction with a functional menu; task clarity leads in the order window.

## Colors

`style.css` is the canonical token source. The frontmatter mirrors its `:root` properties: coffee → `--coffee`, white → `--white`, cream → `--cream`, yellow → `--yellow`, muted → `--muted`, line → `--line`. New order UI consumes these existing tokens. Coffee is the text and primary action color, cream is the secondary surface, and yellow highlights the counter instructions. Use text as well as color for status. Keep the global scrollbar baseline and system forced-color support.

## Typography

Anton through `--display` carries the headings; Poppins through `--body` carries body text and controls. Preserve the existing local fallbacks. Prices and quantities use tabular numerals; format order totals with `Intl.NumberFormat("en-PH")` and PHP currency.

## Layout

Keep the existing one-, two-, and three-column menu grid at its 540px and 850px breakpoints. Page width is capped at 1160px. The order bar fixes to the bottom with safe-area padding and reserves page space; Back to top sits above it. The order dialog is capped at 560px, scrolls within the viewport, and wraps long content.

## Elevation & Depth

Use borders and cream surfaces for menu cards and instructions. Reuse the existing dialog backdrop and modal shadow. Keep the fixed order bar simple, with a coffee border.

## Shapes

Keep 5px control corners, 8px card corners, and 12px dialog corners. Circular close controls match the full-menu window.

## Components

Reuse `.button`, `.button-primary`, `.button-outline`, `.menu-dialog`, `.dialog-header`, and `.close-menu`. Add controls have visible labels, 44px minimum targets, hover and focus treatments. Quantity actions use semantic buttons and accessible item-specific names. Both dialogs use the shared `bindModal` behavior in script.js.

### Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Native select created by makeCard | MENU item.options | Snack flavor; platform popup accepted | Browser flavor selection and keyboard checks |
| Scrollbar | Global style.css baseline | :root scrollbar tokens | Dialog and horizontal category overflow | Browser computed style and narrow viewport |
| Toast | Inline live status in script.js | announceOrder | Page and open-dialog status | Browser order updates |

## Iconography

Keep the established simple symbols and SVG artwork. Add, quantity, close, and remove actions have text or accessible names; do not rely on the symbol alone.

## Motion

Reuse existing hover transitions and reduced-motion rules. The order window opens without decorative animation. During preparation, the existing coffee mascot gently rocks with rising steam. This decorative animation has a Pause/Resume control and becomes static with reduced motion. It stops when the customer confirms receipt. Preserve the current reduced-motion scrolling behavior.

## Workflow

The customer builds a list, shows it at the counter, and pays there. Each size and flavor is a separate line, repeated adds increase quantity, and filters preserve the order. Quantity is bounded at 99 per line. Removing the final draft selection shows the empty state and hides the counter instructions and order bar.

Per the user's request and explicit same-phone choice on 2026-10-18, the owner or barista confirms payment on the customer's phone. The staff action asks them to review the total and confirm receipt of payment. This is a manual counter acknowledgement on that phone; it does not process a payment, authenticate staff, or send an order to another device. There is no automatic transition or timer that marks an order paid or received.

Confirmed orders enter the preparing state and lock additions, quantities, and flavors. Snapshot item names, sizes/flavors, prices, and quantities at confirmation; later menu changes must not alter that snapshot. Keep the summary available alongside the waiting animation. The customer chooses “I've received my order” and explicitly confirms that everything has arrived before the received state appears. Only then offer “Start a new order,” which clears the completed list and restores selection controls.

The existing session-storage key accepts legacy selection arrays and now saves a versioned object containing both the draft and confirmed progress in one write. Validate both formats and resume preparing/received states across refreshes in the same tab. If storage is blocked, preserve the in-memory flow and tell the customer to keep the page open. This state is local to the customer's tab and is not a payment receipt or shared staff record. Closing either dialog restores focus to its opener, or the menu when that opener is hidden; cancelling a staff or receipt confirmation leaves the prior lifecycle state intact.

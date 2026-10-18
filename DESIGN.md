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

Reuse existing hover transitions and reduced-motion rules. The order window opens without decorative animation. During preparation, the existing coffee and matcha mascots sway together with rising steam and gentle sparkles. “Cheer them on” triggers a short dance, floating hearts, and a friendly message in a fixed-size speech bubble. These interactions never change order status or imply an estimated preparation time. Per the user's preference, there is no pause button; device reduced-motion settings keep the illustration and heart response static. Close the dialog or confirm receipt to stop the cheer effect. Preserve the current reduced-motion scrolling behavior.

Final receipt confirmation opens a full-screen cream thank-you dialog with large Anton lettering, the customer's name, dancing mascots, and falling coffee-brown/yellow confetti. All celebration motion finishes within five seconds and becomes static with reduced motion. Keep the message visible until Back to menu, the close button, or Escape is used; never hide it on a timer. Reuse `bindModal` for focus containment, scroll lock, and focus restoration. Long names and short screens scroll within the full-screen dialog without clipping the action.

## Workflow

The customer builds a list, shows it at the counter, and pays there. Each size and flavor is a separate line, repeated adds increase quantity, and filters preserve the order. Quantity is bounded at 99 per line. Removing the final draft selection shows the empty state and hides the counter instructions and order bar.

Per the user's request and explicit same-phone choice on 2026-10-18, the owner or barista confirms payment on the customer's phone. The staff action asks them to review the total and confirm receipt of payment. This is a manual counter acknowledgement on that phone; it does not process a payment, authenticate staff, or send an order to another device. There is no automatic transition or timer that marks an order paid or received.

Confirmed orders enter the preparing state and lock additions, quantities, and flavors. Snapshot item names, sizes/flavors, prices, and quantities at confirmation; later menu changes must not alter that snapshot. Keep the summary available alongside the waiting animation. The customer chooses “I've received my order” and explicitly confirms that everything has arrived. That final confirmation immediately clears the order and saved progress, closes the order window, restores selection controls, and opens the full-screen thank-you celebration. The order is already reset while that screen is visible. Dismissing it returns focus to the menu's thank-you message. No separate reset action is required. Staff payment confirmation and cancelling the receipt prompt must preserve the order.

The optional “Name for your order” field accepts a first name or nickname, including Unicode, spaces, and punctuation, up to 60 characters. Keep edits intact during typing and normalize whitespace when leaving the field. Names stay with the order in this tab's session storage and become read-only with the confirmed snapshot. Render them only as text. On receipt, show “Thank you for ordering, Alex!” on the full-screen celebration and retain the menu's smaller thank-you as feedback after dismissal. Clear the name from the form and saved order along with all selections. The visible thank-you retains the name only in page memory until a new order starts; clear the hidden celebration's name on close. Customers who skip the field receive a generic thank-you.

The existing session-storage key accepts legacy selection arrays and now saves a versioned object containing both the draft and confirmed progress in one write. Validate both formats and resume preparing states across refreshes in the same tab. Automatically clear valid completed records left by the previous manual-reset flow. If storage is blocked, preserve the in-memory flow and tell the customer to keep the page open. This state is local to the customer's tab and is not a payment receipt or shared staff record. Dialogs normally restore focus to their opener, or the menu when that opener is hidden. Final receipt confirmation instead focuses the full-screen celebration's heading; dismissing that celebration focuses the menu's thank-you status. Cancelling a staff or receipt confirmation leaves the prior lifecycle state intact.

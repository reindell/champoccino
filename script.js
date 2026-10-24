// Update names and prices here. All menu cards come from MENU.
// Prices are in Philippine pesos. Omit a size when an item is not sold in it.
const MENU = {
  coffee: {
    label: "Coffee",
    description: "Your daily pick-me-up, made just right.",
    mascot: "assets/mascot-coffee.svg",
    mascotAlt: "A cheerful cartoon coffee cup waving hello",
    items: [
      { name: "Americano", prices: { hot8: 109, iced12: 119, iced16: 139 } },
      { name: "Cafe Latte", prices: { hot8: 119, iced12: 129, iced16: 149 } },
      { name: "Caramel Macchiato", prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Spanish Latte", prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Salted Caramel", prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Mocha", prices: { iced12: 139, iced16: 159 } },
      { name: "White Choco Latte", prices: { iced12: 139, iced16: 159 } },
      { name: "Nutella Espresso", prices: { iced12: 149, iced16: 169 } },
      { name: "Biscoff Latte", prices: { iced12: 149, iced16: 169 } },
      { name: "Honey Oat Latte", prices: { iced12: 169, iced16: 189 } }
    ]
  },
  matcha: {
    label: "Matcha",
    description: "A little green, a whole lot of goodness.",
    mascot: "assets/mascot-matcha.svg",
    mascotAlt: "A friendly cartoon matcha whisk holding a cup",
    items: [
      { name: "Matcha Latte", prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Honey Matcha", prices: { iced12: 139, iced16: 159 } },
      { name: "White Choco Matcha", prices: { iced12: 139, iced16: 159 } },
      { name: "Earl Grey Matcha", prices: { iced12: 149, iced16: 169 } },
      { name: "Strawberry Matcha", prices: { iced12: 149, iced16: 169 } },
      { name: "Dirty Matcha", prices: { iced12: 159, iced16: 179 } }
    ]
  },
  "non-coffee": {
    label: "Non-Coffee",
    description: "Sweet sips for your kind of day.",
    mascot: "assets/mascot-iced.svg",
    mascotAlt: "A smiling cartoon iced drink with whipped cream",
    items: [
      { name: "Chocolate", prices: { iced12: 119, iced16: 139 } },
      { name: "Strawberry Milk", prices: { iced12: 119, iced16: 139 } },
      { name: "Biscoff Caramel Milk", prices: { iced12: 129, iced16: 149 } },
      { name: "Nutella Milk", prices: { iced12: 129, iced16: 149 } }
    ]
  },
  fizzies: {
    label: "Fizzies",
    description: "Bright, bubbly, and full of good vibes.",
    mascot: "assets/mascot-iced.svg",
    mascotAlt: "A happy cartoon iced drink",
    items: [
      { name: "Strawberry Crush", prices: { iced12: 99, iced16: 119 } },
      { name: "Apple Burst", prices: { iced12: 99, iced16: 119 } },
      { name: "Lemon Rush", prices: { iced12: 99, iced16: 119 } }
    ]
  },
  snacks: {
    label: "Snacks & Meals",
    description: "A good bite makes everything better.",
    mascot: "assets/mascot-fries.svg",
    mascotAlt: "A playful cartoon carton of fries waving hello",
    items: [
      { name: "Fries", description: "Cheese, Sour & Cream, or BBQ", prices: { single: 99 } },
      { name: "Nachos", description: "Cheese or BBQ", prices: { single: 99 } },
      { name: "Tapsilog", prices: { single: 129 } },
      { name: "Hungarian Silog", prices: { single: 129 } },
      { name: "Sisig", prices: { single: 129 } }
    ]
  },
  addons: {
    label: "Add-ons",
    description: "Make your favorite a little more you.",
    items: [
      { name: "Extra Syrup", prices: { single: 20 } },
      { name: "Extra Espresso Shot", prices: { single: 30 } },
      { name: "Oatmilk Substitute", prices: { single: 30 } }
    ]
  }
};

(() => {
  "use strict";

  const sizeLabels = { hot8: "Hot 8oz", iced12: "Iced 12oz", iced16: "Iced 16oz" };
  const menuContent = document.getElementById("menu-content");
  const menuStatus = document.getElementById("menu-status");
  const categoryFilters = document.getElementById("category-filters");
  const temperatureControls = document.getElementById("temperature-controls");
  const temperatureNote = document.getElementById("temperature-note");
  let selectedCategory = "all";
  let selectedTemperature = "iced";

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isTemperatureCategory(category) {
    return category === "coffee" || category === "matcha";
  }

  function visibleSizes(item, category) {
    if (Object.hasOwn(item.prices, "single")) return ["single"];
    const sizes = isTemperatureCategory(category) && selectedTemperature === "hot"
      ? ["hot8"]
      : ["iced12", "iced16"];
    return sizes.filter((size) => Object.hasOwn(item.prices, size));
  }

  function makeCard(item, category, sizes, itemIndex) {
    const card = element("article", "menu-card");
    const heading = element("div", "card-heading");
    const title = element("h4", "card-title", item.name);
    title.id = "item-" + category + "-" + itemIndex;
    card.setAttribute("aria-labelledby", title.id);
    heading.append(title);
    card.append(heading);
    if (item.description) card.append(element("p", "item-description", item.description));

    if (sizes[0] === "single") {
      const price = element("p", "price-single");
      price.append(element("span", "single-price-label", category === "addons" ? "Add to your drink" : "Per serving"));
      price.append(element("span", "single-price-value", "\u20b1" + item.prices.single));
      card.append(price);
    } else {
      const prices = element("dl", "prices");
      for (const size of sizes) {
        const option = element("div", "price-option");
        option.append(element("dt", "", sizeLabels[size]));
        const value = element("dd");
        value.append(element("span", "single-price-value", "\u20b1" + item.prices[size]));
        option.append(value);
        prices.append(option);
      }
      card.append(prices);
    }
    return card;
  }

  function makeCategory(category, data, visibleItems) {
    const section = element("section", "menu-category category-" + category);
    const headingId = "heading-" + category;
    section.setAttribute("aria-labelledby", headingId);
    const header = element("div", "category-header");
    const copy = element("div", "category-heading-copy");
    const title = element("h3", "menu-category-heading category-title", data.label);
    title.id = headingId;
    copy.append(title, element("p", "category-description", data.description));
    header.append(copy);
    if (data.mascot) {
      const frame = element("div", "mascot-frame category-mascot");
      const mascot = element("img", "category-mascot-image");
      mascot.src = data.mascot;
      mascot.alt = data.mascotAlt;
      mascot.loading = "lazy";
      mascot.decoding = "async";
      mascot.width = 140;
      mascot.height = 140;
      frame.append(mascot);
      header.append(frame);
    }
    const grid = element("div", "menu-grid");
    for (const { item, sizes, index } of visibleItems) grid.append(makeCard(item, category, sizes, index));
    section.append(header, grid);
    return section;
  }

  function renderMenu() {
    if (!menuContent) return;
    const fragment = document.createDocumentFragment();
    const categories = selectedCategory === "all" ? Object.keys(MENU) : [selectedCategory];
    let count = 0;
    for (const category of categories) {
      const data = MENU[category];
      const visibleItems = data.items
        .map((item, index) => ({ item, index, sizes: visibleSizes(item, category) }))
        .filter(({ sizes }) => sizes.length > 0);
      count += visibleItems.length;
      if (visibleItems.length) fragment.append(makeCategory(category, data, visibleItems));
    }
    menuContent.replaceChildren(fragment);
    const hasTemperature = selectedCategory === "all" || isTemperatureCategory(selectedCategory);
    if (temperatureControls) temperatureControls.hidden = !hasTemperature;
    if (temperatureNote) temperatureNote.hidden = selectedCategory !== "all";
    if (menuStatus) {
      const categoryLabel = selectedCategory === "all" ? "all categories" : MENU[selectedCategory].label;
      const temperatureLabel = hasTemperature
        ? " - " + (selectedTemperature === "hot" ? "Hot" : "Iced") + (selectedCategory === "all" ? " coffee & matcha" : "")
        : "";
      menuStatus.textContent = count + (count === 1 ? " item" : " items") + " - " + categoryLabel + temperatureLabel;
    }
  }

  if (categoryFilters) {
    categoryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-category]");
      if (!button || !categoryFilters.contains(button)) return;
      const category = button.dataset.category;
      if (category !== "all" && !Object.hasOwn(MENU, category)) return;
      selectedCategory = category;
      categoryFilters.querySelectorAll("button[data-category]").forEach((tab) => {
        tab.setAttribute("aria-pressed", String(tab === button));
      });
      renderMenu();
    });
  }

  if (temperatureControls) {
    temperatureControls.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-temperature]");
      if (!button || !temperatureControls.contains(button)) return;
      const temperature = button.dataset.temperature;
      if (temperature !== "hot" && temperature !== "iced") return;
      selectedTemperature = temperature;
      temperatureControls.querySelectorAll("button[data-temperature]").forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
      renderMenu();
    });
  }

  function moveTo(target) {
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
  }

  document.getElementById("view-menu")?.addEventListener("click", () => {
    moveTo(document.getElementById("menu"));
  });

  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    let scrollQueued = false;
    const updateBackToTop = () => {
      backToTop.hidden = window.scrollY < 500;
      scrollQueued = false;
    };
    window.addEventListener("scroll", () => {
      if (!scrollQueued) {
        scrollQueued = true;
        window.requestAnimationFrame(updateBackToTop);
      }
    }, { passive: true });
    backToTop.addEventListener("click", () => moveTo(document.getElementById("top")));
    updateBackToTop();
  }

  // Native dialog supplies the modal semantics, focus containment, and Escape support.
  function bindModal(dialog, openers, closeButtons) {
    if (!dialog) return;
    let dialogOpener = null;
    let pointerStartedOutside = false;
    function outsideDialog(event) {
      if (event.target !== dialog) return false;
      const bounds = dialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
    }
    function openModal(opener) {
      if (dialog.open) return;
      dialogOpener = opener;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.classList.add("dialog-open");
      dialog.querySelector("[autofocus]")?.focus({ preventScroll: true });
    }
    openers.forEach((button) => button.addEventListener("click", () => openModal(button)));
    closeButtons.filter(Boolean).forEach((button) => button.addEventListener("click", () => dialog.close()));
    dialog.addEventListener("pointerdown", (event) => {
      pointerStartedOutside = outsideDialog(event);
    });
    dialog.addEventListener("pointerup", (event) => {
      if (pointerStartedOutside && outsideDialog(event)) dialog.close();
      pointerStartedOutside = false;
    });
    dialog.addEventListener("pointercancel", () => { pointerStartedOutside = false; });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.toggle("dialog-open", Boolean(document.querySelector("dialog[open]")));
      const returnTarget = dialogOpener?.isConnected && dialogOpener.getClientRects().length ? dialogOpener : document.getElementById("menu");
      returnTarget?.focus({ preventScroll: true });
      dialogOpener = null;
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
        .filter((node) => !node.disabled && !node.closest("[hidden]") && node.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  bindModal(document.getElementById("menu-dialog"), [...document.querySelectorAll("[data-open-menu]")], [document.getElementById("close-menu")]);

  const fullMenuImage = document.getElementById("full-menu-image");
  const menuImageError = document.getElementById("menu-image-error");
  const downloadMenu = document.getElementById("download-menu");

  function setMenuImageState(loaded) {
    if (!fullMenuImage) return;
    fullMenuImage.hidden = !loaded;
    if (menuImageError) menuImageError.hidden = loaded;
    if (downloadMenu) downloadMenu.hidden = !loaded;
  }

  if (fullMenuImage) {
    fullMenuImage.addEventListener("error", () => setMenuImageState(false));
    fullMenuImage.addEventListener("load", () => setMenuImageState(true));
    if (fullMenuImage.complete) setMenuImageState(fullMenuImage.naturalWidth > 0);
  }

  // Keep the reserved illustration space tidy if an optional mascot is missing.
  document.addEventListener("error", (event) => {
    if (!(event.target instanceof HTMLImageElement)) return;
    const frame = event.target.closest(".mascot-frame");
    if (!frame) return;
    frame.classList.add("image-missing");
    event.target.hidden = true;
  }, true);
  document.querySelectorAll(".mascot-frame img").forEach((image) => {
    if (image.complete && image.naturalWidth === 0) {
      image.closest(".mascot-frame").classList.add("image-missing");
      image.hidden = true;
    }
  });

  document.querySelectorAll("[data-instagram]").forEach((link) => {
    const handle = link.dataset.instagram.replace(/^@/, "");
    link.href = "https://www.instagram.com/" + encodeURIComponent(handle) + "/";
  });

  renderMenu();
})();

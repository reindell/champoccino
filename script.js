// Update names, prices, or featured items here. All menu cards come from MENU.
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
      { name: "Spanish Latte", featured: true, prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Salted Caramel", prices: { hot8: 129, iced12: 139, iced16: 159 } },
      { name: "Mocha", prices: { iced12: 139, iced16: 159 } },
      { name: "White Choco Latte", prices: { iced12: 139, iced16: 159 } },
      { name: "Nutella Espresso", featured: true, prices: { iced12: 149, iced16: 169 } },
      { name: "Biscoff Latte", featured: true, prices: { iced12: 149, iced16: 169 } },
      { name: "Honey Oat Latte", featured: true, prices: { iced12: 169, iced16: 189 } }
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
      { name: "White Choco Matcha", featured: true, prices: { iced12: 139, iced16: 159 } },
      { name: "Earl Grey Matcha", featured: true, prices: { iced12: 149, iced16: 169 } },
      { name: "Strawberry Matcha", featured: true, prices: { iced12: 149, iced16: 169 } },
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
      { name: "Fries", description: "Cheese, Sour & Cream, or BBQ", options: ["Cheese", "Sour & Cream", "BBQ"], prices: { single: 99 } },
      { name: "Nachos", description: "Cheese or BBQ", options: ["Cheese", "BBQ"], prices: { single: 99 } },
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
  const orderDialog = document.getElementById("order-dialog");
  const thankYouDialog = document.getElementById("thank-you-dialog");
  const orderItems = document.getElementById("order-items");
  const orderBar = document.getElementById("order-bar");
  const customerNameInput = document.getElementById("customer-name");
  const order = new Map();
  const orderStorageKey = "champoccino-order-v1";
  const maxQuantity = 99;
  const currency = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
  let orderProgress = null;
  let orderJustReceived = false;
  let customerName = "";
  let receivedCustomerName = "";
  let staffConfirmationOpen = false;
  let receiptConfirmationOpen = false;
  let orderStorageAvailable = true;
  let cheerTimer = null;
  let cheerIndex = 0;
  const cheerMessages = ["You're a whole latte awesome!", "A little happy, just for you.", "Sip, smile, repeat.", "Your coffee crew says hi!"];
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

  function makeAddButton(item, category, itemIndex, size) {
    const button = element("button", "add-to-order", "+ Add");
    button.type = "button";
    button.dataset.category = category;
    button.dataset.itemIndex = itemIndex;
    button.dataset.size = size;
    button.disabled = Boolean(orderProgress);
    if (button.disabled) button.title = "This order is confirmed. Start a new order after receiving it.";
    button.setAttribute("aria-label", `Add ${item.name}${sizeLabels[size] ? `, ${sizeLabels[size]}` : ""} to your order`);
    return button;
  }

  function makeCard(item, category, sizes, itemIndex) {
    const card = element("article", "menu-card");
    const heading = element("div", "card-heading");
    const title = element("h4", "card-title", item.name);
    title.id = `item-${category}-${itemIndex}`;
    card.setAttribute("aria-labelledby", title.id);
    heading.append(title);
    if (item.featured) {
      const badge = element("span", "featured-badge", "★");
      badge.setAttribute("role", "img");
      badge.setAttribute("aria-label", "Featured");
      heading.append(badge);
    }
    card.append(heading);
    if (item.description) card.append(element("p", "item-description", item.description));

    if (sizes[0] === "single") {
      const price = element("p", "price-single");
      price.append(element("span", "single-price-label", category === "addons" ? "Add to your drink" : "Per serving"));
      price.append(element("span", "single-price-value", `₱${item.prices.single}`));
      card.append(price);
      if (item.options) {
        const label = element("label", "flavor-label", "Flavor");
        const select = element("select", "flavor-select");
        select.id = `flavor-${category}-${itemIndex}`;
        select.name = "flavor";
        select.disabled = Boolean(orderProgress);
        select.setAttribute("aria-label", `${item.name} flavor`);
        label.htmlFor = select.id;
        for (const flavor of item.options) {
          const option = element("option", "", flavor);
          option.value = flavor;
          select.append(option);
        }
        card.append(label, select);
      }
      card.append(makeAddButton(item, category, itemIndex, "single"));
    } else {
      const prices = element("dl", "prices");
      for (const size of sizes) {
        const option = element("div", "price-option");
        option.append(element("dt", "", sizeLabels[size]));
        const value = element("dd");
        value.append(element("span", "single-price-value", `₱${item.prices[size]}`), makeAddButton(item, category, itemIndex, size));
        option.append(value);
        prices.append(option);
      }
      card.append(prices);
    }
    return card;
  }

  function makeCategory(category, data, visibleItems) {
    const section = element("section", `menu-category category-${category}`);
    const headingId = `heading-${category}`;
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
        ? ` · ${selectedTemperature === "hot" ? "Hot" : "Iced"}${selectedCategory === "all" ? " coffee & matcha" : ""}`
        : "";
      menuStatus.textContent = `${count} ${count === 1 ? "item" : "items"} · ${categoryLabel}${temperatureLabel}`;
    }
  }

  function orderKey(line) {
    return JSON.stringify([line.category, line.itemIndex, line.size, line.option]);
  }

  function getOrderItem(line) {
    return MENU[line.category].items[line.itemIndex];
  }

  function orderDetail(line) {
    return [sizeLabels[line.size] || (line.category === "addons" ? "Add-on" : "Per serving"), line.option].filter(Boolean).join(" · ");
  }

  function draftOrderLines() {
    return [...order].map(([key, line]) => ({
      key,
      name: getOrderItem(line).name,
      detail: orderDetail(line),
      price: getOrderItem(line).prices[line.size],
      quantity: line.quantity
    }));
  }

  function normalizeCustomerName(value) {
    if (typeof value !== "string") return "";
    return [...value.normalize("NFC").replace(/\s+/gu, " ").trim()].slice(0, 60).join("");
  }

  function validOrderProgress(progress) {
    return progress && ["preparing", "received"].includes(progress.phase)
      && Number.isSafeInteger(progress.confirmedAt) && progress.confirmedAt > 0
      && (progress.phase !== "received" || (Number.isSafeInteger(progress.receivedAt) && progress.receivedAt >= progress.confirmedAt))
      && Array.isArray(progress.lines) && progress.lines.length > 0 && progress.lines.length <= 100
      && progress.lines.every((line) => line
        && typeof line.name === "string" && line.name.length > 0 && line.name.length <= 120
        && typeof line.detail === "string" && line.detail.length <= 150
        && Number.isSafeInteger(line.price) && line.price > 0 && line.price <= 100000
        && Number.isInteger(line.quantity) && line.quantity >= 1 && line.quantity <= maxQuantity);
  }

  function restoreOrder() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(orderStorageKey));
      if (saved?.version === 2) customerName = normalizeCustomerName(saved.customerName);
      // Accept selections saved by the original menu as well as the full order lifecycle.
      const items = Array.isArray(saved) ? saved : saved?.version === 2 && Array.isArray(saved.items) ? saved.items : [];
      for (const line of items) {
        if (!line || !Object.hasOwn(MENU, line.category) || !Number.isInteger(line.itemIndex)) continue;
        const item = MENU[line.category].items[line.itemIndex];
        if (!item || !Object.hasOwn(item.prices, line.size) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > maxQuantity) continue;
        if (item.options ? !item.options.includes(line.option) : line.option !== "") continue;
        const clean = { category: line.category, itemIndex: line.itemIndex, size: line.size, option: line.option, quantity: line.quantity };
        const key = orderKey(clean);
        const previous = order.get(key);
        clean.quantity = Math.min(maxQuantity, clean.quantity + (previous?.quantity || 0));
        order.set(key, clean);
      }
      if (saved?.version === 2 && validOrderProgress(saved.progress)) {
        const { phase, confirmedAt, lines } = saved.progress;
        customerName = normalizeCustomerName(saved.progress.customerName ?? customerName);
        // Completed orders from the previous flow also return to an empty menu.
        if (phase === "received") {
          receivedCustomerName = customerName;
          customerName = "";
          order.clear();
          orderJustReceived = true;
          saveOrder();
          return;
        }
        orderProgress = {
          phase, confirmedAt, customerName,
          lines: lines.map(({ name, detail, price, quantity }) => ({ name, detail, price, quantity }))
        };
      }
    } catch {
      // Orders still work when browser storage is unavailable or contains invalid data.
      orderStorageAvailable = false;
    }
  }

  function saveOrder() {
    try {
      if (order.size || orderProgress) sessionStorage.setItem(orderStorageKey, JSON.stringify({ version: 2, customerName: normalizeCustomerName(customerName), items: [...order.values()], progress: orderProgress }));
      else sessionStorage.removeItem(orderStorageKey);
      orderStorageAvailable = true;
    } catch {
      // Retain the current selection in memory if this browser blocks storage.
      orderStorageAvailable = false;
    }
  }

  function announceOrder(message) {
    const status = document.getElementById(orderDialog?.open ? "order-dialog-status" : "order-status");
    if (status) status.textContent = message;
  }

  function renderOrder() {
    let count = 0;
    let total = 0;
    const fragment = document.createDocumentFragment();
    const lines = orderProgress ? orderProgress.lines : draftOrderLines();
    for (const line of lines) {
      const { key, name: itemName, detail, price } = line;
      count += line.quantity;
      total += line.quantity * price;
      const row = element("li", "order-item");
      const heading = element("div", "order-item-heading");
      heading.append(element("h3", "", orderProgress ? `${line.quantity} × ${itemName}` : itemName), element("strong", "", currency.format(price * line.quantity)));
      row.append(heading, element("p", "order-item-detail", `${detail} · ${currency.format(price)} each`));
      if (orderProgress) {
        fragment.append(row);
        continue;
      }
      const controls = element("div", "order-item-controls");
      const quantity = element("div", "order-quantity");
      const name = `${itemName}, ${detail}`;
      function actionButton(action, text, label, className = "") {
        const button = element("button", className, text);
        button.type = "button";
        button.dataset.orderAction = action;
        button.dataset.orderKey = key;
        button.setAttribute("aria-label", `${label} ${name}`);
        return button;
      }
      const decrease = actionButton("decrease", "−", "Remove one");
      const increase = actionButton("increase", "+", "Add one");
      increase.disabled = line.quantity >= maxQuantity;
      if (increase.disabled) increase.title = `Maximum ${maxQuantity} per item`;
      const value = element("output", "", String(line.quantity));
      value.setAttribute("aria-label", `Quantity for ${name}`);
      quantity.append(decrease, value, increase);
      controls.append(quantity, actionButton("remove", "Remove", "Remove all", "order-remove"));
      row.append(controls);
      fragment.append(row);
    }
    orderItems?.replaceChildren(fragment);
    if (orderBar) orderBar.hidden = count === 0;
    document.body.classList.toggle("has-order", count > 0);
    const phaseLabel = orderProgress ? "Preparing · " : "";
    document.getElementById("order-count").textContent = `${phaseLabel}${count} ${count === 1 ? "item" : "items"}`;
    document.getElementById("order-bar-total").textContent = currency.format(total);
    document.getElementById("order-total").textContent = currency.format(total);
    document.getElementById("order-empty").hidden = count > 0;
    document.getElementById("counter-instructions").hidden = count === 0 || Boolean(orderProgress);
    document.getElementById("order-total-row").hidden = count === 0;
    document.getElementById("order-total-label").textContent = orderProgress ? "Total confirmed at the counter" : "Total to pay at the counter";
    document.getElementById("payment-confirm-total").textContent = currency.format(total);
    renderOrderStage(count);
  }

  function renderOrderStage(count) {
    const phase = orderProgress?.phase || "draft";
    const preparing = phase === "preparing";
    if (!preparing) stopWaitingCheer();
    const progressPanel = document.getElementById("order-progress");
    orderDialog.dataset.orderPhase = phase;
    progressPanel.hidden = !preparing;
    document.getElementById("waiting-visual").hidden = !preparing;
    document.getElementById("order-stage-label").textContent = "CONFIRMED AT THE COUNTER";
    document.getElementById("order-stage-title").textContent = "We're preparing your order.";
    const name = orderProgress?.customerName || "";
    document.getElementById("order-stage-message").textContent = `${name ? `${name}, please` : "Please"} wait for our staff to call your order. Confirm below once you've received everything.`;
    document.getElementById("customer-name-field").hidden = count === 0;
    const displayedName = preparing ? name : customerName;
    if (customerNameInput.value !== displayedName) customerNameInput.value = displayedName;
    customerNameInput.readOnly = preparing;
    document.getElementById("customer-name-help").textContent = preparing ? "Name confirmed with your order." : "Your first name or nickname.";
    document.getElementById("order-description").textContent = phase === "draft"
      ? "Your favorites, ready to show our staff."
      : "Keep this screen until you receive your order.";
    document.getElementById("received-order").hidden = !preparing || receiptConfirmationOpen;
    document.getElementById("receipt-confirmation").hidden = !preparing || !receiptConfirmationOpen;
    document.getElementById("staff-payment").hidden = count === 0 || phase !== "draft";
    document.getElementById("staff-confirm-payment").hidden = staffConfirmationOpen;
    document.getElementById("payment-confirmation").hidden = !staffConfirmationOpen;
    document.getElementById("order-storage-note").hidden = orderStorageAvailable || count === 0;
    const arrow = element("span", "", "→");
    arrow.setAttribute("aria-hidden", "true");
    document.getElementById("show-order").replaceChildren(document.createTextNode(orderProgress ? "View my order " : "Show my order "), arrow);
    const helper = document.getElementById("order-help");
    if (phase === "draft") helper.replaceChildren("Tap ", element("strong", "", "+ Add"), " to choose your favorites. Show your order and pay at the counter.");
    else helper.textContent = "Your order is being prepared. Tap View my order to see your confirmed items.";
    const pageStatus = document.getElementById("order-status");
    pageStatus.classList.toggle("sr-only", !orderJustReceived);
    pageStatus.classList.toggle("order-complete-message", orderJustReceived);
    if (orderJustReceived) pageStatus.textContent = `Thank you${receivedCustomerName ? `, ${receivedCustomerName}` : ""}! Enjoy every sip & bite. Your order has been cleared, ready for your next visit.`;
  }

  function focusOrderStage() {
    const heading = document.getElementById("order-stage-title");
    heading.focus({ preventScroll: true });
    document.getElementById("order-progress").scrollIntoView({ behavior: "instant", block: "start" });
  }

  function stopWaitingCheer() {
    clearTimeout(cheerTimer);
    cheerTimer = null;
    document.getElementById("waiting-visual").classList.remove("is-cheering");
  }

  document.getElementById("cheer-order").addEventListener("click", () => {
    if (orderProgress?.phase !== "preparing" || !orderDialog.open) return;
    stopWaitingCheer();
    const visual = document.getElementById("waiting-visual");
    // Restart this small, user-triggered dance even after a rapid second tap.
    void visual.offsetWidth;
    visual.classList.add("is-cheering");
    document.getElementById("waiting-cheer-message").textContent = cheerMessages[cheerIndex++ % cheerMessages.length];
    cheerTimer = setTimeout(stopWaitingCheer, 3000);
  });

  customerNameInput.addEventListener("input", () => {
    if (orderProgress) return;
    customerName = customerNameInput.value;
    staffConfirmationOpen = false;
    document.getElementById("staff-confirm-payment").hidden = false;
    document.getElementById("payment-confirmation").hidden = true;
    saveOrder();
  });
  customerNameInput.addEventListener("blur", () => {
    if (orderProgress) return;
    customerName = normalizeCustomerName(customerNameInput.value);
    customerNameInput.value = customerName;
    saveOrder();
  });

  document.getElementById("staff-confirm-payment").addEventListener("click", () => {
    if (!order.size || orderProgress) return;
    customerName = normalizeCustomerName(customerNameInput.value);
    staffConfirmationOpen = true;
    saveOrder();
    renderOrder();
    document.getElementById("cancel-payment").focus();
  });
  document.getElementById("cancel-payment").addEventListener("click", () => {
    staffConfirmationOpen = false;
    renderOrder();
    document.getElementById("staff-confirm-payment").focus();
  });
  document.getElementById("confirm-payment").addEventListener("click", () => {
    if (!staffConfirmationOpen || !order.size || orderProgress) return;
    orderProgress = {
      phase: "preparing", confirmedAt: Date.now(), customerName: normalizeCustomerName(customerName),
      lines: draftOrderLines().map(({ name, detail, price, quantity }) => ({ name, detail, price, quantity }))
    };
    staffConfirmationOpen = false;
    saveOrder();
    renderOrder();
    renderMenu();
    announceOrder("Payment confirmed at the counter. Your order is being prepared.");
    focusOrderStage();
  });
  document.getElementById("received-order").addEventListener("click", () => {
    if (orderProgress?.phase !== "preparing") return;
    receiptConfirmationOpen = true;
    renderOrder();
    document.getElementById("cancel-received").focus();
  });
  document.getElementById("cancel-received").addEventListener("click", () => {
    receiptConfirmationOpen = false;
    renderOrder();
    document.getElementById("received-order").focus();
  });
  document.getElementById("confirm-received").addEventListener("click", () => {
    if (!receiptConfirmationOpen || orderProgress?.phase !== "preparing") return;
    receivedCustomerName = orderProgress.customerName || "";
    customerName = "";
    orderProgress = null;
    order.clear();
    orderJustReceived = true;
    staffConfirmationOpen = false;
    receiptConfirmationOpen = false;
    cheerIndex = 0;
    document.getElementById("waiting-cheer-message").textContent = "Good things are brewing.";
    saveOrder();
    renderOrder();
    renderMenu();
    // Open the celebration after the shared close handler finishes its focus handoff.
    orderDialog.addEventListener("close", showThankYou, { once: true });
    orderDialog.close();
  });
  orderDialog.addEventListener("close", () => {
    stopWaitingCheer();
    staffConfirmationOpen = false;
    receiptConfirmationOpen = false;
    renderOrder();
  });

  function showThankYou() {
    const name = document.getElementById("thank-you-customer");
    name.textContent = receivedCustomerName ? `${receivedCustomerName}!` : "";
    name.hidden = !receivedCustomerName;
    document.getElementById("thank-you-punctuation").textContent = receivedCustomerName ? "," : "!";
    openThankYou(document.getElementById("order-status"));
  }

  menuContent?.addEventListener("click", (event) => {
    const button = event.target.closest("button.add-to-order");
    if (!button || button.disabled || orderProgress || !menuContent.contains(button)) return;
    const { category, size } = button.dataset;
    const itemIndex = Number(button.dataset.itemIndex);
    const item = MENU[category]?.items[itemIndex];
    if (!item || !Object.hasOwn(item.prices, size)) return;
    const option = button.closest(".menu-card").querySelector("select[name='flavor']")?.value || "";
    const line = { category, itemIndex, size, option, quantity: 1 };
    const key = orderKey(line);
    const existing = order.get(key);
    if (existing?.quantity >= maxQuantity) {
      announceOrder(`You can add up to ${maxQuantity} of ${item.name}, ${orderDetail(line)}.`);
      return;
    }
    if (existing) existing.quantity += 1;
    else order.set(key, line);
    orderJustReceived = false;
    receivedCustomerName = "";
    saveOrder();
    renderOrder();
    announceOrder(`Added ${item.name}, ${orderDetail(line)}. Your order has ${document.getElementById("order-count").textContent}.`);
  });

  orderItems?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-order-action]");
    if (!button || orderProgress || !orderItems.contains(button)) return;
    const { orderKey: key, orderAction: action } = button.dataset;
    const line = order.get(key);
    if (!line) return;
    const rowIndex = [...order.keys()].indexOf(key);
    const itemName = getOrderItem(line).name;
    if (action === "remove" || (action === "decrease" && line.quantity === 1)) order.delete(key);
    else if (action === "decrease") line.quantity -= 1;
    else if (action === "increase") line.quantity = Math.min(maxQuantity, line.quantity + 1);
    else return;
    staffConfirmationOpen = false;
    saveOrder();
    renderOrder();
    // Re-rendered quantity controls retain focus; removal moves to a surviving row.
    const buttons = [...orderItems.querySelectorAll("button[data-order-action]")];
    const sameAction = buttons.find((node) => node.dataset.orderKey === key && node.dataset.orderAction === action && !node.disabled);
    const nextRow = orderItems.children[Math.min(rowIndex, order.size - 1)];
    (sameAction || nextRow?.querySelector("button") || document.getElementById("continue-order"))?.focus({ preventScroll: true });
    announceOrder(order.size ? `${itemName} updated. Total ${document.getElementById("order-total").textContent}.` : "Your order is empty. Add a drink or a bite from the menu.");
  });

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
    closeButtons.forEach((button) => button.addEventListener("click", () => dialog.close()));
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
    return openModal;
  }

  bindModal(document.getElementById("menu-dialog"), [...document.querySelectorAll("[data-open-menu]")], [document.getElementById("close-menu")]);
  bindModal(orderDialog, [document.getElementById("show-order")], [document.getElementById("close-order"), document.getElementById("continue-order")]);
  const openThankYou = bindModal(thankYouDialog, [], [document.getElementById("close-thank-you"), document.getElementById("thank-you-back")]);
  thankYouDialog.addEventListener("close", () => {
    document.getElementById("thank-you-customer").textContent = "";
    document.getElementById("thank-you-customer").hidden = true;
    moveTo(document.getElementById("order-status"));
  });

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
    link.href = `https://www.instagram.com/${encodeURIComponent(handle)}/`;
  });

  restoreOrder();
  renderMenu();
  renderOrder();
})();

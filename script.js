
/*
  Sunrise Poultry Farm
  JavaScript for mobile navigation and WhatsApp enquiries.
*/

// 1. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after a navigation link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// 2. Automatic copyright year
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// 3. WhatsApp order form
const orderForm = document.getElementById("orderForm");
const formError = document.getElementById("formError");

// IMPORTANT:
// Replace this with your mum's real WhatsApp number.
// Use digits only: country code + number, without +, spaces or dashes.
// Example format for Zambia: 260XXXXXXXXX
const FARM_WHATSAPP_NUMBER = "260972457325";

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  if (
    FARM_WHATSAPP_NUMBER === "REPLACE_WITH_FARM_NUMBER" ||
    !/^\d{10,15}$/.test(FARM_WHATSAPP_NUMBER)
  ) {
    formError.textContent =
      "The farm's WhatsApp number has not been configured yet. Please update it in script.js.";
    return;
  }

  const customerName =
    document.getElementById("customerName").value.trim();

  const productType =
    document.getElementById("productType").value;

  const quantity =
    document.getElementById("quantity").value.trim();

  const orderMethod =
    document.getElementById("orderMethod").value;

  const customerMessage =
    document.getElementById("customerMessage").value.trim();

  // Build the message that the customer will review in WhatsApp.
  const message = [
    "Hello Sunrise Poultry Farm!",
    "",
    "I'd like to make an enquiry.",
    `Name: ${customerName}`,
    `Product: ${productType}`,
    `Quantity: ${quantity}`,
    `Collection/delivery: ${orderMethod}`,
    customerMessage ? `Additional details: ${customerMessage}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappURL =
    `https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// 4. Allow product enquiry links to preselect the relevant product.
document.querySelectorAll(".order-link").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedProduct = link.dataset.product;
    const productSelect = document.getElementById("productType");

    productSelect.value = selectedProduct;
  });
});
// ===== DARK MODE TOGGLE =====

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.querySelector(".theme-toggle-label");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

if (themeToggle) {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("sunrise-theme");
  } catch (error) {
    // Theme switching still works if storage is unavailable.
  }

  applyTheme(savedTheme === "dark");

  themeToggle.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-theme");

    applyTheme(isDark);

    try {
      localStorage.setItem(
        "sunrise-theme",
        isDark ? "dark" : "light"
      );
    } catch (error) {
      // The selected theme will still work for this visit.
    }
  });
}
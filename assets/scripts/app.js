const postCountEl = document.querySelector("#post-count");
const cards = document.querySelectorAll(".post-card");
const legacyCards = document.querySelectorAll(".legacy-card");
const legacyToggleEl = document.querySelector("#toggle-legacy");
const yearEl = document.querySelector("#year");
const themeToggleEl = document.querySelector("#theme-toggle");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggleEl) {
    const isDark = theme === "dark";
    themeToggleEl.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggleEl.setAttribute(
      "aria-label",
      isDark ? "Enable light mode" : "Enable dark mode"
    );
  }
}

function updatePostCount() {
  if (!postCountEl) {
    return;
  }

  const visiblePosts = document.querySelectorAll(".post-card:not(.is-hidden)").length;
  postCountEl.textContent = `${visiblePosts} posts`;
}

function setLegacyVisibility(showLegacy) {
  legacyCards.forEach((card) => {
    card.classList.toggle("is-hidden", !showLegacy);
  });

  updatePostCount();
}

if (legacyToggleEl) {
  const savedLegacyPreference = localStorage.getItem("showLegacyEntries");
  const shouldShowLegacy = savedLegacyPreference === "true";

  legacyToggleEl.checked = shouldShowLegacy;
  setLegacyVisibility(shouldShowLegacy);
  legacyToggleEl.addEventListener("change", (event) => {
    const showLegacy = event.currentTarget.checked;
    localStorage.setItem("showLegacyEntries", String(showLegacy));
    setLegacyVisibility(showLegacy);
  });
} else {
  updatePostCount();
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (themeToggleEl) {
  setTheme(getPreferredTheme());
  themeToggleEl.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

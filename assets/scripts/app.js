const postCountEl = document.querySelector("#post-count");
const cards = document.querySelectorAll(".post-card");
const legacyCards = document.querySelectorAll(".legacy-card");
const legacyToggleEl = document.querySelector("#toggle-legacy");
const yearEl = document.querySelector("#year");
const themeToggleEl = document.querySelector("#theme-toggle");
const lastUpdatedEl = document.querySelector("#last-updated");

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const remainder = day % 10;
  if (remainder === 1) {
    return "st";
  }
  if (remainder === 2) {
    return "nd";
  }
  if (remainder === 3) {
    return "rd";
  }
  return "th";
}

function formatEasternTimestamp(date) {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(" ", "");

  const weekday = dateParts.find((part) => part.type === "weekday")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const day = Number(dateParts.find((part) => part.type === "day")?.value);
  const year = dateParts.find((part) => part.type === "year")?.value;
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${weekday}, ${month} ${dayWithSuffix} ${year} (Eastern) ${time}`;
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "dark";
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
  const shouldShowLegacy = savedLegacyPreference === null
    ? true
    : savedLegacyPreference === "true";

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

if (lastUpdatedEl) {
  lastUpdatedEl.textContent = `Last updated: ${formatEasternTimestamp(new Date())}`;
}

setTheme(getPreferredTheme());

if (themeToggleEl) {
  themeToggleEl.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

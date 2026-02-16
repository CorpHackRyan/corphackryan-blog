const postCountEl = document.querySelector("#post-count");
const cards = document.querySelectorAll(".post-card");
const legacyCards = document.querySelectorAll(".legacy-card");
const legacyToggleEl = document.querySelector("#toggle-legacy");
const yearEl = document.querySelector("#year");
const themeToggleEl = document.querySelector("#theme-toggle");
const lastUpdatedEl = document.querySelector("#last-updated");
const randomPostBtn = document.querySelector("#random-post");
const postSearchEl = document.querySelector("#post-search");
const tagFiltersEl = document.querySelector("#tag-filters");
const noResultsEl = document.querySelector("#no-results");

let selectedTag = "all";
let showLegacyEntries = true;
let copyToastTimer;

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

  if (noResultsEl) {
    noResultsEl.classList.toggle("is-hidden", visiblePosts !== 0);
  }
}

function getCardTags(card) {
  const tags = card.dataset.tags || "";
  return tags
    .split(/\s+/)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function applyPostFilters() {
  const query = (postSearchEl?.value || "").trim().toLowerCase();

  cards.forEach((card) => {
    const tags = getCardTags(card);
    const title = card.querySelector("h3 a")?.textContent?.toLowerCase() || "";
    const bodyText = card.querySelector("p:last-of-type")?.textContent?.toLowerCase() || "";
    const isLegacy = card.classList.contains("legacy-card");

    const legacyPass = showLegacyEntries || !isLegacy;
    const tagPass = selectedTag === "all" || tags.includes(selectedTag);
    const searchPass = !query || title.includes(query) || bodyText.includes(query) || tags.some((tag) => tag.includes(query));
    const shouldShow = legacyPass && tagPass && searchPass;

    card.classList.toggle("is-hidden", !shouldShow);
  });

  updatePostCount();
}

function renderTagFilters() {
  if (!tagFiltersEl) {
    return;
  }

  const tagSet = new Set();
  cards.forEach((card) => {
    getCardTags(card).forEach((tag) => tagSet.add(tag));
  });

  const tags = ["all", ...Array.from(tagSet).sort()];
  tagFiltersEl.innerHTML = tags
    .map((tag) => {
      const label = tag === "all" ? "all tags" : tag;
      const activeClass = tag === selectedTag ? " is-active" : "";
      return `<button type="button" class="tag-filter-btn${activeClass}" data-tag="${tag}">${label}</button>`;
    })
    .join("");

  tagFiltersEl.querySelectorAll(".tag-filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTag = button.dataset.tag || "all";
      renderTagFilters();
      applyPostFilters();
    });
  });
}

function setCanonicalLink() {
  const canonicalHref = `${window.location.origin}${window.location.pathname}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');

  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute("href", canonicalHref);
}

function showCopyToast(message, isError = false) {
  let toastEl = document.querySelector("#copy-toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "copy-toast";
    toastEl.className = "copy-toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.classList.toggle("is-error", isError);
  toastEl.classList.add("is-visible");

  window.clearTimeout(copyToastTimer);
  copyToastTimer = window.setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 1500);
}

function setupCardTitleCopyButtons() {
  const clipboardIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 4h-1.18A3 3 0 0 0 12 2a3 3 0 0 0-2.82 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-4-1a1 1 0 0 1 1 1h-2a1 1 0 0 1 1-1zm4 15H8V6h2v2h4V6h2v12z"/>
    </svg>
  `;
  const checkIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17 4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z"/>
    </svg>
  `;

  cards.forEach((card) => {
    const heading = card.querySelector("h3");
    const link = heading?.querySelector("a");

    if (!heading || !link || card.querySelector(".card-copy-icon-btn")) {
      return;
    }

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "card-copy-icon-btn";
    copyButton.setAttribute("aria-label", `Copy link for ${link.textContent || "post"}`);
    copyButton.innerHTML = clipboardIcon;

    copyButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      try {
        const href = link.getAttribute("href") || "";
        const absoluteUrl = new URL(href, window.location.href).href;
        await navigator.clipboard.writeText(absoluteUrl);
        copyButton.classList.add("is-copied");
        copyButton.innerHTML = checkIcon;
        showCopyToast("Copied successfully.");
        setTimeout(() => {
          copyButton.classList.remove("is-copied");
          copyButton.innerHTML = clipboardIcon;
        }, 1100);
      } catch {
        copyButton.innerHTML = clipboardIcon;
        showCopyToast("Could not copy link.", true);
        setTimeout(() => {
          copyButton.innerHTML = clipboardIcon;
        }, 1100);
      }
    });

    card.appendChild(copyButton);
  });
}

function openRandomVisiblePost() {
  const visibleLinks = Array.from(
    document.querySelectorAll(".post-card:not(.is-hidden) h3 a")
  );

  if (visibleLinks.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * visibleLinks.length);
  window.location.href = visibleLinks[randomIndex].href;
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    const activeEl = document.activeElement;
    const isTypingContext = activeEl &&
      (activeEl.tagName === "INPUT" ||
        activeEl.tagName === "TEXTAREA" ||
        activeEl.isContentEditable);

    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingContext) {
      if (postSearchEl) {
        event.preventDefault();
        postSearchEl.focus();
        postSearchEl.select();
      }
      return;
    }

    if ((event.key === "r" || event.key === "R") && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingContext) {
      openRandomVisiblePost();
    }
  });
}

function initializeCardRevealAnimation() {
  cards.forEach((card, index) => {
    card.style.setProperty("--stagger-index", String(index));
  });

  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
}

function setupCopyLinkButton() {
  if (!window.location.pathname.includes("/posts/")) {
    return;
  }

  const articleContainer = document.querySelector(".article");
  if (!articleContainer || articleContainer.querySelector(".copy-link-btn")) {
    return;
  }

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "copy-link-btn";
  copyBtn.textContent = "Copy link";
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = "Link copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy link";
      }, 1400);
    } catch {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => {
        copyBtn.textContent = "Copy link";
      }, 1400);
    }
  });

  articleContainer.prepend(copyBtn);
}

if (legacyToggleEl) {
  const savedLegacyPreference = localStorage.getItem("showLegacyEntries");
  const shouldShowLegacy = savedLegacyPreference === null
    ? true
    : savedLegacyPreference === "true";

  legacyToggleEl.checked = shouldShowLegacy;
  showLegacyEntries = shouldShowLegacy;
  legacyToggleEl.addEventListener("change", (event) => {
    showLegacyEntries = event.currentTarget.checked;
    localStorage.setItem("showLegacyEntries", String(showLegacyEntries));
    applyPostFilters();
  });
}

if (postSearchEl) {
  postSearchEl.addEventListener("input", () => {
    applyPostFilters();
  });
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (lastUpdatedEl) {
  lastUpdatedEl.textContent = `Last updated: ${formatEasternTimestamp(new Date())}`;
}

setTheme(getPreferredTheme());
setCanonicalLink();
setupCardTitleCopyButtons();
renderTagFilters();
applyPostFilters();
initializeCardRevealAnimation();
setupCopyLinkButton();
setupKeyboardShortcuts();

if (themeToggleEl) {
  themeToggleEl.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

if (randomPostBtn) {
  randomPostBtn.addEventListener("click", () => {
    openRandomVisiblePost();
  });
}

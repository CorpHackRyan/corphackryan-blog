const postCountEl = document.querySelector("#post-count");
const cards = document.querySelectorAll(".post-card");
const legacyCards = document.querySelectorAll(".legacy-card");
const legacyToggleEl = document.querySelector("#toggle-legacy");
const yearEl = document.querySelector("#year");
const lastUpdatedEl = document.querySelector("#last-updated");
const randomPostBtn = document.querySelector("#random-post");
const postSearchEl = document.querySelector("#post-search");
const tagFiltersEl = document.querySelector("#tag-filters");
const noResultsEl = document.querySelector("#no-results");
const clearFiltersBtn = document.querySelector("#clear-filters");
const clearTagsBtn = document.querySelector("#clear-tags");
const distanceFormEl = document.querySelector("#distance-form");
const originAddressEl = document.querySelector("#origin-address");
const travelModeEl = document.querySelector("#travel-mode");
const directionsStatusEl = document.querySelector("#directions-status");
const localMapFrameEl = document.querySelector("#local-map-frame");
let themeToggleEl = null;
let themeModeTextEl = null;
let mockMenuButtonEl = null;
let mockMenuPanelEl = null;

const selectedTags = new Set();
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

function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes("/posts/legacy/")) {
    return "../../";
  }
  if (path.includes("/posts/")) {
    return "../";
  }
  return "";
}

function renderGlobalHeader() {
  const headerEl = document.querySelector(".site-header");
  if (!headerEl) {
    return;
  }

  const prefix = getPathPrefix();
  const isHomePage = prefix === "";
  const homeHref = isHomePage ? "#" : `${prefix}index.html`;
  const latestHref = isHomePage ? "#latest" : `${prefix}index.html#latest`;
  const localHref = isHomePage ? "#local-area" : `${prefix}index.html#local-area`;
  const aboutHref = isHomePage ? "#about" : `${prefix}index.html#about`;

  headerEl.innerHTML = `
    <div class="container nav-wrap">
      <a class="brand" href="${homeHref}" aria-label="CorpHackRyan home">
        <img
          class="brand-avatar"
          src="${prefix}assets/images/corphackryan_cartoon.png"
          alt="CorpHackRyan cartoon avatar"
          loading="lazy"
        />
        <span>CorpHackRyan</span>
      </a>
      <div class="header-actions">
        <nav class="main-nav" aria-label="Primary navigation">
          <a class="nav-item-link" href="${latestHref}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z"/></svg>
            <span>Latest</span>
          </a>
          <a class="nav-item-link" href="${prefix}posts/exercise-log.html">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.57 14.86 18 12.29V10a2 2 0 0 0-2-2h-2.29l-2.57-2.57a1.5 1.5 0 0 0-2.12 0L7.29 7H5a2 2 0 0 0-2 2v2.29l-2.57 2.57a1.5 1.5 0 0 0 0 2.12L3 18.71V21a2 2 0 0 0 2 2h2.29l2.57 2.57a1.5 1.5 0 0 0 2.12 0L13.71 23H16a2 2 0 0 0 2-2v-2.29l2.57-2.57a1.5 1.5 0 0 0 0-2.12ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/></svg>
            <span>Exercise</span>
          </a>
          <a class="nav-item-link" href="${prefix}posts/food-guide.html">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v9a2 2 0 0 1-2 2v9H3v-9a2 2 0 0 1-2-2V2h2v4h2V2h2Zm7 0h2v20h-2v-8h-2V2h2v10h2V2Zm8 0v20h-2v-8h-2V2h2v10h2V2h2Z"/></svg>
            <span>Food</span>
          </a>
          <a class="nav-item-link" href="${prefix}posts/entertainment.html">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h16V7H4Zm4 2 8 3-8 3V9Z"/></svg>
            <span>Entertainment</span>
          </a>
          <a class="nav-item-link" href="${prefix}posts/music.html">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11.55A4 4 0 1 0 14 18V8h6V3h-8Z"/></svg>
            <span>Music</span>
          </a>
          <a class="nav-item-link" href="${localHref}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9a4.98 4.98 0 0 0-3.2 1.15A4.98 4.98 0 0 0 12 2a5 5 0 0 0-1.8 9.66A4.99 4.99 0 0 0 7 21h4v1a1 1 0 1 0 2 0v-1h4a5 5 0 0 0-3.2-9.34A4.97 4.97 0 0 0 17 9z"/></svg>
            <span>Gomblin'</span>
          </a>
          <a class="nav-item-link" href="${aboutHref}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2Zm-1-8.2a1.2 1.2 0 1 1 1.2-1.2A1.2 1.2 0 0 1 12 8.8Z"/></svg>
            <span>About</span>
          </a>
        </nav>
        <div class="theme-switch-wrap">
          <button
            id="theme-toggle"
            class="theme-toggle-switch"
            type="button"
            role="switch"
            aria-checked="true"
            aria-label="Toggle dark mode"
          >
            <span class="theme-toggle-track">
              <span class="theme-toggle-thumb"></span>
            </span>
          </button>
          <span id="theme-mode-text" class="theme-mode-text">DARK</span>
        </div>
        <div class="mock-menu">
          <button
            id="mock-menu-button"
            class="mock-menu-button"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-controls="mock-menu-panel"
            aria-label="Open account menu"
          >
            <span class="mock-menu-avatar">CR</span>
            <span class="mock-menu-label">Account</span>
            <span class="mock-menu-caret">▾</span>
          </button>
          <div id="mock-menu-panel" class="mock-menu-panel" role="menu" aria-label="Mock account menu">
            <p class="mock-menu-caption">Mock menu</p>
            <button type="button" class="mock-menu-item" role="menuitem">Sign in</button>
            <button type="button" class="mock-menu-item" role="menuitem">Create account</button>
            <button type="button" class="mock-menu-item" role="menuitem">Profile</button>
            <button type="button" class="mock-menu-item" role="menuitem">Settings</button>
            <button type="button" class="mock-menu-item danger" role="menuitem">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  `;

  themeToggleEl = document.querySelector("#theme-toggle");
  themeModeTextEl = document.querySelector("#theme-mode-text");
  mockMenuButtonEl = document.querySelector("#mock-menu-button");
  mockMenuPanelEl = document.querySelector("#mock-menu-panel");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggleEl) {
    const isDark = theme === "dark";
    themeToggleEl.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggleEl.setAttribute("aria-checked", isDark ? "true" : "false");
    themeToggleEl.classList.toggle("is-on", isDark);
  }

  if (themeModeTextEl) {
    themeModeTextEl.textContent = theme === "dark" ? "DARK" : "LIGHT";
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
    const tagPass = selectedTags.size === 0 || tags.some((tag) => selectedTags.has(tag));
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

  const tags = Array.from(tagSet).sort();
  tagFiltersEl.innerHTML = tags
    .map((tag) => {
      const activeClass = selectedTags.has(tag) ? " is-active" : "";
      return `<button type="button" class="tag-filter-btn${activeClass}" data-tag="${tag}">${tag}</button>`;
    })
    .join("");

  tagFiltersEl.querySelectorAll(".tag-filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag || "";
      if (!tag) {
        return;
      }
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }
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

function setupDirectionsTool() {
  if (!distanceFormEl || !originAddressEl || !travelModeEl || !localMapFrameEl) {
    return;
  }

  distanceFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const origin = originAddressEl.value.trim();
    if (!origin) {
      if (directionsStatusEl) {
        directionsStatusEl.textContent = "Please enter your address first.";
      }
      originAddressEl.focus();
      return;
    }

    const destination = "Brockton, MA";
    const selectedMode = travelModeEl.value || "d";
    const directionsEmbedUrl = `https://maps.google.com/maps?f=d&saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&dirflg=${encodeURIComponent(selectedMode)}&output=embed`;

    if (directionsStatusEl) {
      directionsStatusEl.textContent = "Directions loaded in the map below.";
    }

    localMapFrameEl.src = directionsEmbedUrl;
    localMapFrameEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function renderFoodRatings() {
  const ratingBlocks = document.querySelectorAll(".food-rating[data-rating]");
  if (ratingBlocks.length === 0) {
    return;
  }

  ratingBlocks.forEach((block) => {
    const rawRating = Number.parseFloat(block.dataset.rating || "");
    const rating = Number.isFinite(rawRating)
      ? Math.max(0, Math.min(10, rawRating))
      : 0;
    const ratingScoreEl = block.querySelector(".food-rating-score");
    const starsEl = block.querySelector(".food-rating-stars");
    const label = block.dataset.ratingLabel || "Rating";

    if (ratingScoreEl) {
      ratingScoreEl.textContent = `${rating.toFixed(1)}/10`;
    }

    if (starsEl) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;
      starsEl.innerHTML = "";

      for (let index = 0; index < 10; index += 1) {
        const starEl = document.createElement("span");
        starEl.className = "food-star";
        starEl.textContent = "★";

        if (index < fullStars) {
          starEl.classList.add("filled");
        } else if (index === fullStars && hasHalfStar) {
          starEl.classList.add("half");
        }

        starsEl.appendChild(starEl);
      }
    }

    block.setAttribute("aria-label", `${label}: ${rating.toFixed(1)} out of 10`);
  });
}

function setupMockMenu() {
  if (!mockMenuButtonEl || !mockMenuPanelEl) {
    return;
  }

  const closeMenu = () => {
    mockMenuPanelEl.classList.remove("is-open");
    mockMenuButtonEl.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    mockMenuPanelEl.classList.add("is-open");
    mockMenuButtonEl.setAttribute("aria-expanded", "true");
  };

  mockMenuButtonEl.addEventListener("click", () => {
    const isOpen = mockMenuPanelEl.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mockMenuPanelEl.classList.contains("is-open")) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (target.closest(".mock-menu")) {
      return;
    }
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
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

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    selectedTags.clear();
    if (postSearchEl) {
      postSearchEl.value = "";
      postSearchEl.focus();
    }
    renderTagFilters();
    applyPostFilters();
  });
}

if (clearTagsBtn) {
  clearTagsBtn.addEventListener("click", () => {
    selectedTags.clear();
    renderTagFilters();
    applyPostFilters();
  });
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (lastUpdatedEl) {
  lastUpdatedEl.textContent = `Last updated: ${formatEasternTimestamp(new Date())}`;
}

renderGlobalHeader();
setTheme(getPreferredTheme());
setCanonicalLink();
setupCardTitleCopyButtons();
renderTagFilters();
applyPostFilters();
initializeCardRevealAnimation();
setupCopyLinkButton();
setupKeyboardShortcuts();
setupDirectionsTool();
renderFoodRatings();
setupMockMenu();

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

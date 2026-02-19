const publishButtonEl = document.querySelector("#exercise-publish-btn");
const snapshotModalEl = document.querySelector("#exercise-snapshot-modal");
const snapshotCloseEl = document.querySelector("#exercise-snapshot-close");
const snapshotContentEl = document.querySelector("#exercise-snapshot-content");
const captureTargetEl = document.querySelector(".exercise-log-table-wrap");

function openSnapshotModal() {
  if (!snapshotModalEl) {
    return;
  }
  snapshotModalEl.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
}

function closeSnapshotModal() {
  if (!snapshotModalEl) {
    return;
  }
  snapshotModalEl.classList.add("is-hidden");
  document.body.style.overflow = "";
}

function createCaptureClone() {
  if (!captureTargetEl) {
    return null;
  }

  const host = document.createElement("div");
  host.className = "snapshot-capture-host";

  const clone = captureTargetEl.cloneNode(true);
  if (!(clone instanceof HTMLElement)) {
    return null;
  }

  clone.classList.add("snapshot-capture");
  clone.style.width = `${captureTargetEl.offsetWidth}px`;
  host.appendChild(clone);
  document.body.appendChild(host);

  return { host, clone };
}

async function handlePublishSnapshot() {
  if (!captureTargetEl || !snapshotContentEl) {
    return;
  }

  snapshotContentEl.innerHTML = "<p class=\"meta\">Generating preview...</p>";
  openSnapshotModal();

  const hasHtmlToImage = !!(window.htmlToImage && typeof window.htmlToImage.toPng === "function");
  const hasHtml2Canvas = typeof window.html2canvas === "function";

  if (!hasHtmlToImage && !hasHtml2Canvas) {
    snapshotContentEl.innerHTML = "<p class=\"meta\">Snapshot library failed to load. Refresh and try again.</p>";
    return;
  }

  const captureContext = createCaptureClone();
  if (!captureContext) {
    snapshotContentEl.innerHTML = "<p class=\"meta\">Could not prepare snapshot.</p>";
    return;
  }

  try {
    if (hasHtmlToImage) {
      const dataUrl = await window.htmlToImage.toPng(captureContext.clone, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const image = new Image();
      image.src = dataUrl;
      image.alt = "Exercise table snapshot preview";
      snapshotContentEl.innerHTML = "";
      snapshotContentEl.appendChild(image);
      return;
    }

    throw new Error("html-to-image not available");
  } catch (primaryError) {
    try {
      if (!hasHtml2Canvas) {
        throw new Error("No capture library available");
      }

      const canvas = await window.html2canvas(captureContext.clone, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        foreignObjectRendering: true,
      });
      snapshotContentEl.innerHTML = "";
      snapshotContentEl.appendChild(canvas);
    } catch (fallbackError) {
      const p1 = primaryError instanceof Error ? primaryError.message : "Unknown error";
      const p2 = fallbackError instanceof Error ? fallbackError.message : "Unknown error";
      snapshotContentEl.innerHTML = `<p class="meta">Could not generate snapshot preview. Primary: ${p1}. Fallback: ${p2}</p>`;
    }
  } finally {
    captureContext.host.remove();
  }
}

if (publishButtonEl) {
  publishButtonEl.addEventListener("click", handlePublishSnapshot);
}

if (snapshotCloseEl) {
  snapshotCloseEl.addEventListener("click", closeSnapshotModal);
}

if (snapshotModalEl) {
  snapshotModalEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.closeSnapshot === "true") {
      closeSnapshotModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && snapshotModalEl && !snapshotModalEl.classList.contains("is-hidden")) {
    closeSnapshotModal();
  }
});

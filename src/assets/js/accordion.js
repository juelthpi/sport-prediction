const openAccordionItem = (header, forceOpen = null) => {
  const group = header.closest(".accordion-group");
  if (!group) return;
  const contentId = header.getAttribute("data-target");
  const content = group.querySelector(`#${contentId}`);
  if (!content) return;
  const isCurrentlyOpen = header.getAttribute("aria-expanded") === "true";
  const shouldOpen = forceOpen ?? !isCurrentlyOpen;
  const mode = group.getAttribute("data-mode") || "single";
  if (mode === "single" && shouldOpen) {
    group.querySelectorAll(".accordion-header").forEach((other) => {
      if (other !== header && other.getAttribute("aria-expanded") === "true") {
        openAccordionItem(other, false);
      }
    });
  }
  if (shouldOpen) {
    content.classList.remove("max-h-0");
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    requestAnimationFrame(() => {
      content.style.maxHeight = "0";
      content.classList.add("max-h-0");
    });
  }
  const arrow = header.querySelector(".default-arrow");
  if (arrow) {
    arrow.style.transform = shouldOpen ? "rotate(180deg)" : "rotate(0deg)";
  }
  header.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
};
const initAccordions = () => {
  document.querySelectorAll(".accordion-group").forEach((group) => {
    group.querySelectorAll(".accordion-header").forEach((header) => {
      header.removeEventListener("click", headerClickHandler);
      header.addEventListener("click", headerClickHandler);
    });
    const defaultHeader = group.querySelector(
      ".accordion-header[data-default]"
    );
    if (defaultHeader) {
      openAccordionItem(defaultHeader, true);
    }
    group.querySelectorAll(".accordion-content").forEach((content) => {
      content.addEventListener("transitionend", () => {
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
          content.style.maxHeight = "none";
        }
      });
    });
  });
};

const headerClickHandler = (e) => {
  const header = e.currentTarget;
  openAccordionItem(header);
};
document.addEventListener("DOMContentLoaded", initAccordions);
window.openAccordionItem = openAccordionItem;
window.initAccordions = initAccordions;

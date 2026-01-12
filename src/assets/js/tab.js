document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs-group").forEach((group) => {
    const buttons = group.querySelectorAll(".tab-button");
    const panels = group.querySelectorAll(".tab-panel");

    const activateTab = (targetId) => {
      // Tab buttons
      buttons.forEach((btn) => {
        const isActive = btn.getAttribute("data-tab-target") === targetId;
        btn.setAttribute("aria-selected", isActive);
        btn.classList.toggle("active-tab", isActive);
      });

      // Panels
      panels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.id !== targetId);
      });
      const activePanel = group.querySelector(`#${targetId}`);
      if (activePanel && typeof window.openAccordionItem === "function") {
        const accordionGroup = activePanel.querySelector(".accordion-group");
        if (accordionGroup) {
          const defaultHeader = accordionGroup.querySelector(
            ".accordion-header[data-default]"
          );
          if (defaultHeader) {
            window.openAccordionItem(defaultHeader, true);
          }
        }
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        activateTab(btn.getAttribute("data-tab-target"));
      });
    });

    // Initial tab
    let defaultBtn =
      group.querySelector(".tab-button[data-default]") || buttons[0];
    if (defaultBtn) {
      activateTab(defaultBtn.getAttribute("data-tab-target"));
    }
  });
});

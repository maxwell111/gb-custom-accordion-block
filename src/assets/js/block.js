import "../scss/style.scss";

const accordionBlock = {
  expandedBlock: null,
  resizeTimeout: undefined,
  init() {
    const accordionTitles = document.querySelectorAll(
      ".accordion-item .accordion-item-title"
    );

    accordionTitles.forEach((accordionTitle, index) => {
      const accordionItem = accordionTitle.parentNode;
      const content = accordionItem.querySelector(".accordion-item-content");
      const contentInner = content.querySelector(".accordion-item-inner");

      if (index === 0 && accordionItem.classList.contains("active")) {
        this.expandedBlock = accordionItem;
        content.style.height = `${contentInner.offsetHeight}px`;
      }

      accordionTitle.addEventListener("click", (e) => {
        e.preventDefault();
        const { expandedBlock } = this;

        if (expandedBlock) {
          expandedBlock.classList.remove("active");
          expandedBlock.querySelector(".accordion-item-content").style.height =
            null;
        }

        if (accordionItem === expandedBlock) {
          this.expandedBlock = null;
        } else {
          content.style.height = `${contentInner.offsetHeight}px`;
          accordionItem.classList.add("active");
          this.expandedBlock = accordionItem;
        }
      });
    });

    window.addEventListener("resize", () => {
      this.resizeContent();
    });
  },
  resizeContent() {
    const { expandedBlock } = this;

    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      if (expandedBlock) {
        const content = expandedBlock.querySelector(".accordion-item-content");
        const contentInner = expandedBlock.querySelector(
          ".accordion-item-inner"
        );

        content.style.height = `${contentInner.offsetHeight}px`;
      }
    }, 100);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  accordionBlock.init();
});

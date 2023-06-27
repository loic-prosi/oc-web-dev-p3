import { createModalWorkElement } from "./works.js";
import { createModalFormCategoryOption } from "./categories.js";

function createEditionBarElement() {
  const editionBarElement = document.createElement("div");
  editionBarElement.className = "edition-bar";

  const editionBarIconElement = document.createElement("i");
  editionBarIconElement.className =
    "edition-bar__icon fa-regular fa-pen-to-square";

  const editionBarTextElement = document.createElement("p");
  editionBarTextElement.className = "edition-bar__text";
  editionBarTextElement.innerText = "Mode édition";

  const editionBarButtonElement = document.createElement("button");
  editionBarButtonElement.className = "button button--edition-bar";
  editionBarButtonElement.innerText = "publier les changements";
  editionBarButtonElement.addEventListener("click", function () {
    window.localStorage.removeItem("architect.authToken");
    location.reload();
  });

  const headerElement = document.querySelector(".header");
  headerElement.classList.add("edition-bar-offset");
  headerElement.appendChild(editionBarElement);

  editionBarElement.appendChild(editionBarIconElement);
  editionBarElement.appendChild(editionBarTextElement);
  editionBarElement.appendChild(editionBarButtonElement);
}

function createEditionLink(
  buttonLinkClassName,
  linkContainerParentSelector,
  url,
  isFirstChild
) {
  const link = document.createElement("a");
  if (url) {
    link.href = url;
  }
  link.className = `button-link ${buttonLinkClassName}`;

  const linkIcon = document.createElement("i");
  linkIcon.className = "button-link__icon fa-regular fa-pen-to-square";

  const linkText = document.createElement("span");
  linkText.className = "button-link__text";
  linkText.innerText = "modifier";

  const linkContainerParent = document.querySelector(
    linkContainerParentSelector
  );

  if (isFirstChild) {
    linkContainerParent.prepend(link);
  } else {
    linkContainerParent.appendChild(link);
  }
  link.appendChild(linkIcon);
  link.appendChild(linkText);
}

function createEditionButtonsElements() {
  createEditionLink(
    "button-link--introduction-figure",
    ".section--introduction figure"
  );
  createEditionLink(
    "button-link--introduction-article",
    ".section--introduction article",
    null,
    true
  );
  createEditionLink(
    "button-link--portfolio",
    ".section__title-container--portfolio",
    "#modal-gallery"
  );
}

function createModalEvents() {
  const editionButton = document.querySelector(".button-link--portfolio");
  // Open the modal when clicking on the portfolio "Edit" button
  editionButton.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.showModal();
  });

  const modal = document.getElementById("modal");
  // Close the modal when pressing "Esc" button
  modal.addEventListener("cancel", function () {
    modal.close();
  });
  // Close the modal when clicking outside it
  modal.addEventListener("click", (event) => {
    // Get target element position information in the viewport
    const targetRect = event.target.getBoundingClientRect();
    // If one of the mouse cursor coordinates is outside the target, the modal is closed
    // The coordinates are calculated from the top left of the viewport
    const cursorOutsideTarget =
      targetRect.left > event.clientX ||
      targetRect.right < event.clientX ||
      targetRect.top > event.clientY ||
      targetRect.bottom < event.clientY;
    // The previous condition doesn't work with select elements so we need to add a specific one
    if (cursorOutsideTarget && event.target.tagName !== "SELECT") {
      modal.close();
    }
  });
  // Close the modal when clicking on the close icon
  const closeButtons = document.querySelectorAll(".button--modal-nav-close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", function () {
      modal.close();
    });
  });

  const inputPhoto = document.getElementById("photo");

  inputPhoto.addEventListener("change", function (event) {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const photoPreview = document.createElement("img");
      photoPreview.className = ".form__item--image-upload";
      photoPreview.style.height = "171px";
      photoPreview.src = URL.createObjectURL(event.target.files[0]);

      const inputPhotoContainer = document.querySelector(
        ".form__item--image-upload"
      );
      inputPhotoContainer.style.padding = 0;
      inputPhotoContainer.replaceChildren(photoPreview);
    }
  });
}

function removePorfolioFilters() {
  const portfolioFiltersParent =
    document.querySelector(".section__filters").parentElement;

  const portfolioFilters = document.querySelector(".section__filters");

  portfolioFiltersParent.removeChild(portfolioFilters);
}

function updatePageStyles() {
  const introductionArticle = document.querySelector(".section__article");
  introductionArticle.classList.add("section__article--edition");

  const portfolioTitle = document.querySelector(
    ".section__title-container--portfolio"
  );
  portfolioTitle.classList.add("section__title-container--portfolio-edition");
}

export function setEditionState(works, categories) {
  // Original categories contains all the categories except the "all" one
  const originalCategories = categories.slice(1);
  createEditionBarElement();
  createEditionButtonsElements();
  createModalEvents();
  works.forEach((work) => {
    createModalWorkElement(work);
  });
  originalCategories.forEach((category) => {
    createModalFormCategoryOption(category);
  });
  removePorfolioFilters();
  updatePageStyles();
}

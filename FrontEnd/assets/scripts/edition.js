import { createWork, createGalleryWork, createModalWork } from "./works.js";
import { removeFilters, createSelectCategoryOption } from "./categories.js";
import { checkInput } from "./form.js";

const createEditionBar = () => {
  const editionBar = document.createElement("div");
  editionBar.className = "edition-bar";

  const editionBarIcon = document.createElement("i");
  editionBarIcon.className = "edition-bar__icon fa-regular fa-pen-to-square";

  const editionBarText = document.createElement("p");
  editionBarText.className = "edition-bar__text";
  editionBarText.innerText = "Mode édition";

  const editionBarButton = document.createElement("button");
  editionBarButton.className = "button button--edition-bar";
  editionBarButton.innerText = "publier les changements";
  editionBarButton.addEventListener("click", () => {
    window.localStorage.removeItem("architect.authToken");
    location.reload();
  });

  const header = document.querySelector(".header");
  header.classList.add("edition-bar-offset");
  header.appendChild(editionBar);

  editionBar.appendChild(editionBarIcon);
  editionBar.appendChild(editionBarText);
  editionBar.appendChild(editionBarButton);
};

const createEditionLink = (
  buttonLinkClassName,
  linkContainerParentSelector,
  url,
  isFirstChild
) => {
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
};

const createEditionButtons = () => {
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
};

const createModalEvents = () => {
  const editionButton = document.querySelector(".button-link--portfolio");
  // Open the modal when clicking on the portfolio "Edit" button
  editionButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.showModal();
  });

  const modal = document.getElementById("modal");
  // Close the modal when pressing "Esc" button
  modal.addEventListener("cancel", () => {
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
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });

  const setModalSubmitButtonState = () => {
    const submitButton = document.getElementById("modal-form-submit");

    const titleInput = document.getElementById("modal-form-title");
    const imageInput = document.getElementById("modal-form-image");

    const imageError = checkInput(imageInput);
    const inputError = checkInput(titleInput);

    if (imageError || inputError) {
      submitButton.disabled = true;
    } else if (!imageError && !inputError) {
      submitButton.disabled = false;
    }
  };

  const imageInput = document.getElementById("modal-form-image");
  const titleInput = document.getElementById("modal-form-title");
  titleInput.addEventListener("input", () => {
    setModalSubmitButtonState();
  });
  imageInput.addEventListener("input", (event) => {
    setModalSubmitButtonState();
    const imageError = checkInput(event.target);
    const imageErrorMessage = document.getElementById("image-error");

    if (imageError && imageError === "type") {
      imageErrorMessage.innerText = "L'image n'est pas au format PNG ou JPG";
    } else if (imageError === "size") {
      imageErrorMessage.innerText = "L'image est supérieure à 4mo";
    } else {
      // Hide form item
      const inputImageContainer = document.querySelector(
        ".form__item--image-upload"
      );
      inputImageContainer.style.display = "none";

      // Create new form item with image preview
      const newInputImageContainer = document.createElement("div");
      newInputImageContainer.className = "form__item form__item--image-upload";
      newInputImageContainer.style.padding = 0;

      const imagePreview = document.createElement("img");
      imagePreview.className = "form__image--image-upload";
      imagePreview.style.height = "176px";
      imagePreview.src = URL.createObjectURL(event.target.files[0]);

      const modalForm = document.querySelector(".form--modal");

      modalForm.prepend(newInputImageContainer);
      newInputImageContainer.appendChild(imagePreview);
    }
  });

  const modalForm = document.querySelector(".form--modal");
  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "image",
      event.target.querySelector("[name='image']").files[0]
    );
    formData.append(
      "title",
      event.target.querySelector("[name='title']").value
    );
    formData.append(
      "category",
      event.target.querySelector("[name='category']").value
    );

    const authToken = window.localStorage.getItem("architect.authToken");

    if (authToken) {
      const response = await createWork(formData, authToken);

      if (response) {
        let work = {
          category: { id: response.categoryId },
          id: response.id,
          imageUrl: response.imageUrl,
          title: response.title,
          userId: response.userId
        };
        createGalleryWork(work);
        createModalWork(work);
        location.replace("#" + "modal-gallery");
      }
    }
  });
};

const updatePageStyles = () => {
  const introductionArticle = document.querySelector(".section__article");
  introductionArticle.classList.add("section__article--edition");

  const portfolioTitle = document.querySelector(
    ".section__title-container--portfolio"
  );
  portfolioTitle.classList.add("section__title-container--portfolio-edition");
};

export const setEditionState = (works, categories) => {
  // Original categories contains all the categories except the "all" one
  const originalCategories = categories.slice(1);
  createEditionBar();
  createEditionButtons();
  createModalEvents();
  works.forEach((work) => {
    createModalWork(work);
  });
  originalCategories.forEach((category) => {
    createSelectCategoryOption(category);
  });
  removeFilters();
  updatePageStyles();
};

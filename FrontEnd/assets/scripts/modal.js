import { createWork } from "./api.js";
import { createGalleryWork, createModalGalleryWork } from "./works.js";
import { checkInput } from "./form.js";

export const createOpenModalEvent = () => {
  const editionButton = document.querySelector(".button-link--portfolio");
  // Open the modal when clicking on the portfolio "Edit" button
  editionButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.showModal();
  });
};

export const createCloseModalEvents = () => {
  const modal = document.getElementById("modal");
  // Close the modal when clicking on the close icon
  const closeButtons = document.querySelectorAll(".button--modal-nav-close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
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
};

export const createModalFormEvents = () => {
  const modalForm = document.querySelector(".form--modal");

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
        createModalGalleryWork(work);
        location.replace("#" + "modal-gallery");
      }
    }
  });
};

export const createModalFormSelect = (categories) => {
  // Original categories contains all the categories except the "all" one
  const originalCategories = categories.slice(1);
  originalCategories.forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category.id;
    categoryOption.innerText = category.name;

    const select = document.getElementById("modal-form-category");
    select.appendChild(categoryOption);
  });
};

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

import { deleteWork } from "./api.js";

export const createGallery = (works) => {
  const gallery = document.querySelector(".section__gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    createGalleryWork(work);
  });
};

export const createGalleryWork = (work) => {
  const galleryWork = document.createElement("figure");
  galleryWork.className = "work";
  galleryWork.setAttribute("data-id", work.id);
  galleryWork.setAttribute("data-category", work.category.id);

  const workImage = document.createElement("img");
  workImage.className = "work__image";
  workImage.src = work.imageUrl;
  workImage.alt = work.title;

  const workTitle = document.createElement("figcaption");
  workTitle.className = "work__title";
  workTitle.innerText = work.title;

  const gallery = document.querySelector(".section__gallery");
  gallery.appendChild(galleryWork);

  galleryWork.appendChild(workImage);
  galleryWork.appendChild(workTitle);
};

const deleteGalleryWork = (workId) => {
  const gallery = document.querySelector(".section__gallery");
  const galleryWork = document.querySelector(`[data-id="${workId}"]`);
  gallery.removeChild(galleryWork);
};

export const createModalGallery = (works) => {
  works.forEach((work) => {
    createModalGalleryWork(work);
  });
};

export const createModalGalleryWork = (work) => {
  const modalWork = document.createElement("a");
  modalWork.className = "work work--modal";
  modalWork.setAttribute("data-id-modal", work.id);

  const modalWorkImageContainer = document.createElement("div");
  modalWorkImageContainer.className = "work__image-container";

  const modalWorkImage = document.createElement("img");
  modalWorkImage.className = "work__image work__image--modal";
  modalWorkImage.src = work.imageUrl;
  modalWorkImage.alt = work.title;

  const modalWorkDeleteButton = document.createElement("button");
  modalWorkDeleteButton.className =
    "button button--modal-work button--modal-work-delete";
  const modalWorkDeleteIcon = document.createElement("i");
  modalWorkDeleteIcon.className = "fa-solid fa-trash-can";

  modalWorkDeleteButton.addEventListener("click", async () => {
    const authToken = window.localStorage.getItem("architect.authToken");
    if (authToken) {
      const response = await deleteWork(work.id, authToken);

      if (response && response.status && response.status === 204) {
        deleteGalleryWork(work.id);
        deleteModalGalleryWork(work.id);
      }
    }
  });

  const modalWorkTitle = document.createElement("figcaption");
  modalWorkTitle.className = "work__title work__title--modal";
  modalWorkTitle.innerText = "éditer";

  const modalGallery = document.querySelector(".modal__gallery");
  modalGallery.appendChild(modalWork);
  modalWork.appendChild(modalWorkImageContainer);
  modalWorkImageContainer.appendChild(modalWorkImage);
  modalWorkImageContainer.appendChild(modalWorkDeleteButton);
  modalWorkDeleteButton.appendChild(modalWorkDeleteIcon);
  modalWork.appendChild(modalWorkTitle);
};

const deleteModalGalleryWork = (workId) => {
  const modalWork = document.querySelector(`[data-id-modal="${workId}"]`);
  const modalGallery = document.querySelector(".modal__gallery");
  modalGallery.removeChild(modalWork);
};

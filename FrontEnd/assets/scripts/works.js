export async function getAllWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

export function createWorkElement(work) {
  const workElement = document.createElement("figure");
  workElement.className = "portfolio__gallery__work";
  workElement.setAttribute("data-category", work.category.id);

  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = work.title;

  const galleryElement = document.querySelector(".portfolio__gallery");
  galleryElement.appendChild(workElement);

  workElement.appendChild(imgElement);
  workElement.appendChild(figcaptionElement);
}

export function createModalWorkElement(work) {
  const modalWorkElement = document.createElement("a");
  modalWorkElement.className = "modal__content__portfolio-gallery__work";

  const modalWorkImgContainer = document.createElement("div");
  modalWorkImgContainer.className =
    "modal__content__portfolio-gallery__work__image-container";

  const imgElement = document.createElement("img");
  imgElement.className = "modal__content__portfolio-gallery__work__image";
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.className =
    "modal__content__portfolio-gallery__work__delete-button";
  const deleteIconElement = document.createElement("i");
  deleteIconElement.className = "fa-solid fa-trash-can";

  const modalFigcaptionElement = document.createElement("figcaption");
  modalFigcaptionElement.className =
    "modal__content__portfolio-gallery__work__text";
  modalFigcaptionElement.innerText = "éditer";

  const galleryElement = document.querySelector(
    ".modal__content__portfolio-gallery"
  );
  galleryElement.appendChild(modalWorkElement);
  modalWorkElement.appendChild(modalWorkImgContainer);
  modalWorkImgContainer.appendChild(imgElement);
  modalWorkImgContainer.appendChild(deleteButtonElement);
  deleteButtonElement.appendChild(deleteIconElement);
  modalWorkElement.appendChild(modalFigcaptionElement);
}

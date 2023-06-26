export async function getAllWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

export function createWorkElement(work) {
  const workElement = document.createElement("figure");
  workElement.className = "work";
  workElement.setAttribute("data-category", work.category.id);

  const imgElement = document.createElement("img");
  imgElement.className = "work__image";
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.className = "work__title";
  figcaptionElement.innerText = work.title;

  const galleryElement = document.querySelector(".section__gallery");
  galleryElement.appendChild(workElement);

  workElement.appendChild(imgElement);
  workElement.appendChild(figcaptionElement);
}

export function createModalWorkElement(work) {
  const modalWorkElement = document.createElement("a");
  modalWorkElement.className = "work--modal";

  const modalWorkImgContainer = document.createElement("div");
  modalWorkImgContainer.className = "work__image-container";

  const imgElement = document.createElement("img");
  imgElement.className = "work__image--modal";
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.className =
    "button button--modal-work button--modal-work-delete";
  const deleteIconElement = document.createElement("i");
  deleteIconElement.className = "fa-solid fa-trash-can";

  const modalFigcaptionElement = document.createElement("figcaption");
  modalFigcaptionElement.className = "work__title--modal";
  modalFigcaptionElement.innerText = "éditer";

  const galleryElement = document.querySelector(".modal__gallery");
  galleryElement.appendChild(modalWorkElement);
  modalWorkElement.appendChild(modalWorkImgContainer);
  modalWorkImgContainer.appendChild(imgElement);
  modalWorkImgContainer.appendChild(deleteButtonElement);
  deleteButtonElement.appendChild(deleteIconElement);
  modalWorkElement.appendChild(modalFigcaptionElement);
}

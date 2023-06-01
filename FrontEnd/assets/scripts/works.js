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

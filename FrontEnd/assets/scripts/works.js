export async function getAllWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

export function createWorkElement(work) {
  const workElement = document.createElement("figure");

  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = work.title;

  const galleryElement = document.querySelector(".gallery");
  galleryElement.appendChild(workElement);

  workElement.appendChild(imgElement);
  workElement.appendChild(figcaptionElement);
}

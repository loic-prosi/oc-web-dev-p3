export function createCategoryElement(category) {
  const categoryElement = document.createElement("button");
  categoryElement.className = "portfolio__filters__button";
  categoryElement.innerText = category.name;
  categoryElement.setAttribute("data-category", category.id);

  const filtersElement = document.querySelector(".portfolio__filters");
  filtersElement.appendChild(categoryElement);
}

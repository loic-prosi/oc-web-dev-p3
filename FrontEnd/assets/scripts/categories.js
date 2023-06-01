import { createWorkElement } from "./works.js";

export function getWorksCategories(works) {
  const categories = works.map((work) => work.category);

  let uniqueCategories = categories.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      categories.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
  // New category "0" for displaying all works ("All" button)
  uniqueCategories.unshift({ id: "0", name: "Tous" });

  return uniqueCategories;
}

export function createCategoryButtonElement(category, works) {
  const categoryElement = document.createElement("button");
  categoryElement.className = "portfolio__filters__button";
  categoryElement.innerText = category.name;
  categoryElement.addEventListener("click", async function () {
    let worksFiltered = works.filter((work) => {
      return work.category.id === parseInt(category.id);
    });
    // If clicked filter is "all" use the initial works array
    if (category.id === "0") {
      worksFiltered = works;
    }
    // Refresh gallery with filtered works
    const galleryElement = document.querySelector(".portfolio__gallery");
    galleryElement.innerHTML = "";
    worksFiltered.forEach((work) => {
      createWorkElement(work);
    });
  });

  const filtersElement = document.querySelector(".portfolio__filters");
  filtersElement.appendChild(categoryElement);
}

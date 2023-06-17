import { createWorkElement } from "./works.js";

export function getWorksCategories(works) {
  const uniqueCategoriesIds = new Set();
  works.forEach((work) => uniqueCategoriesIds.add(work.category.id));

  // Array with initial category "0" for displaying all works ("All" button)
  let uniqueCategories = [{ id: 0, name: "Tous" }];
  uniqueCategoriesIds.forEach((id) => {
    const work = works.find((work) => work.category.id === id);
    uniqueCategories.push(work.category);
  });

  return uniqueCategories;
}

export function createCategoryButtonElement(category, works) {
  const categoryElement = document.createElement("button");
  categoryElement.className = "portfolio__filters__button";
  categoryElement.innerText = category.name;
  categoryElement.addEventListener("click", async function () {
    let worksFiltered = works.filter((work) => {
      return work.category.id === category.id;
    });
    // If clicked filter is "all" use the initial works array
    if (category.id === 0) {
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

export function createModalFormCategoryOption(category) {
  const categoryOption = document.createElement("option");
  categoryOption.value = category.id;
  categoryOption.innerText = category.name;

  const select = document.getElementById("category");
  select.appendChild(categoryOption);
}

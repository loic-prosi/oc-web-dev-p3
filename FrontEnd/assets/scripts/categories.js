import { createGallery } from "./works.js";

export const getWorksCategories = (works) => {
  const uniqueCategoriesIds = new Set();
  works.forEach((work) => uniqueCategoriesIds.add(work.category.id));

  // Array with initial category "0" for displaying all works ("All" button)
  let uniqueCategories = [{ id: 0, name: "Tous" }];
  uniqueCategoriesIds.forEach((id) => {
    const work = works.find((work) => work.category.id === id);
    uniqueCategories.push(work.category);
  });

  return uniqueCategories;
};

export const createFilters = (categories, works) => {
  categories.forEach((category) => {
    createFilterButton(category, works);
  });
};

export const removeFilters = () => {
  const portfolio = document.querySelector(".section--portfolio");
  const filters = document.querySelector(".section__filters");
  portfolio.removeChild(filters);
};

export const createFilterButton = (category, works) => {
  const filterButton = document.createElement("button");
  filterButton.className = "button button--filter";
  filterButton.innerText = category.name;
  filterButton.addEventListener("click", async () => {
    let worksFiltered = works.filter((work) => {
      return work.category.id === category.id;
    });
    // If clicked filter is "all" use the initial works array
    if (category.id === 0) {
      worksFiltered = works;
    }
    // Refresh gallery with filtered works
    createGallery(worksFiltered);
  });

  const filters = document.querySelector(".section__filters");
  filters.appendChild(filterButton);
};

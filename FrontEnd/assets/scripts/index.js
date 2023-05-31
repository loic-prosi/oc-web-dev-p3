import { getAllWorks, createWorkElement } from "./works.js";
import { createCategoryElement } from "./categories.js";

async function renderElements() {
  const works = await getAllWorks();

  works.forEach((work) => {
    createWorkElement(work);
  });

  const categories = works.map((work) => work.category);
  const uniqueCategories = categories.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      categories.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  uniqueCategories.forEach((category) => {
    createCategoryElement(category, works);
  });

  const filterButtonCategory0 = document.querySelector("[data-category='0']");
  filterButtonCategory0.addEventListener("click", async function (event) {
    const categoryId = event.target.dataset.category;
    const worksFiltered = works.filter((work) => {
      return work.category.id !== parseInt(categoryId);
    });
    const galleryElement = document.querySelector(".portfolio__gallery");
    galleryElement.innerHTML = "";
    worksFiltered.forEach((work) => {
      createWorkElement(work);
    });
  });

  const filterButtonCategory1 = document.querySelector("[data-category='1']");
  filterButtonCategory1.addEventListener("click", async function (event) {
    const categoryId = event.target.dataset.category;
    const worksFiltered = works.filter((work) => {
      return work.category.id === parseInt(categoryId);
    });
    const galleryElement = document.querySelector(".portfolio__gallery");
    galleryElement.innerHTML = "";
    worksFiltered.forEach((work) => {
      createWorkElement(work);
    });
  });

  const filterButtonCategory2 = document.querySelector("[data-category='2']");
  filterButtonCategory2.addEventListener("click", async function (event) {
    const categoryId = event.target.dataset.category;
    const worksFiltered = works.filter((work) => {
      return work.category.id === parseInt(categoryId);
    });
    const galleryElement = document.querySelector(".portfolio__gallery");
    galleryElement.innerHTML = "";
    worksFiltered.forEach((work) => {
      createWorkElement(work);
    });
  });

  const filterButtonCategory3 = document.querySelector("[data-category='3']");
  filterButtonCategory3.addEventListener("click", async function (event) {
    const categoryId = event.target.dataset.category;
    const worksFiltered = works.filter((work) => {
      return work.category.id === parseInt(categoryId);
    });
    const galleryElement = document.querySelector(".portfolio__gallery");
    galleryElement.innerHTML = "";
    worksFiltered.forEach((work) => {
      createWorkElement(work);
    });
  });
}

renderElements();

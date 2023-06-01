import { getAllWorks, createWorkElement } from "./works.js";
import {
  getWorksCategories,
  createCategoryButtonElement
} from "./categories.js";

async function renderElements() {
  const works = await getAllWorks();

  works.forEach((work) => {
    createWorkElement(work);
  });

  const categories = getWorksCategories(works);

  categories.forEach((category) => {
    createCategoryButtonElement(category, works);
  });
}

renderElements();

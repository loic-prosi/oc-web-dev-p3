import { getAllWorks, createWorkElement } from "./works.js";
import {
  getWorksCategories,
  createCategoryButtonElement
} from "./categories.js";
import { setEditionState } from "./edition.js";

const renderElements = async () => {
  const works = await getAllWorks();

  works.forEach((work) => {
    createWorkElement(work);
  });

  const categories = getWorksCategories(works);

  categories.forEach((category) => {
    createCategoryButtonElement(category, works);
  });

  const authToken = window.localStorage.getItem("architect.authToken");
  if (authToken) {
    setEditionState(works, categories);
  }
};

renderElements();

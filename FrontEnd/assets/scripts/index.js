import { getAllWorks, createGallery } from "./works.js";
import { getWorksCategories, createFilters } from "./categories.js";
import { setEditionState } from "./edition.js";

const render = async () => {
  const works = await getAllWorks();
  createGallery(works);

  const categories = getWorksCategories(works);
  createFilters(categories, works);

  const authToken = window.localStorage.getItem("architect.authToken");
  if (authToken) {
    setEditionState(works, categories);
  }
};

render();

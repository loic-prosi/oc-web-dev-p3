import { getAllWorks, createGallery } from "./works.js";
import { getWorksCategories, createFilters } from "./categories.js";
import { setEditionState } from "./edition.js";
import { setLoginFormEvent } from "./login.js";

const setScripts = async () => {
  const landingPage = window.location.pathname === "/index.html";
  const loginPage = window.location.pathname === "/assets/pages/login.html";
  if (landingPage) {
    await setLandingPageScripts();
  }
  if (loginPage) {
    await setLoginPageScripts();
  }
};

const setLandingPageScripts = async () => {
  const works = await getAllWorks();
  createGallery(works);

  const categories = getWorksCategories(works);
  createFilters(categories, works);

  const authToken = window.localStorage.getItem("architect.authToken");
  if (authToken) {
    setEditionState(works, categories);
  }
};

const setLoginPageScripts = async () => {
  setLoginFormEvent();
};

setScripts();

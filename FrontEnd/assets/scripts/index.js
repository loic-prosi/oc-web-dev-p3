import { getAllWorks } from "./api.js";
import { createGallery, createModalGallery } from "./works.js";
import {
  getWorksCategories,
  createFilters,
  removeFilters
} from "./categories.js";
import { setLoginFormEvent } from "./login.js";
import { createEditionBar, createEditionButtons } from "./edition.js";
import {
  createOpenModalEvent,
  createCloseModalEvents,
  createModalFormEvents,
  createModalFormSelect
} from "./modal.js";

const setScripts = async () => {
  const locationPath = window.location.pathname;
  const landingPage = locationPath === "/" || locationPath === "/index.html";
  const loginPage = locationPath === "/assets/pages/login.html";

  if (landingPage) {
    await setLandingPageScripts();
  }
  if (loginPage) {
    await setLoginPageScripts();
  }
};

const setLandingPageScripts = async () => {
  const works = await getAllWorks();
  if (works) {
    createGallery(works);

    const categories = getWorksCategories(works);
    createFilters(categories, works);

    const authToken = window.localStorage.getItem("architect.authToken");
    if (authToken) {
      setAdminState(works, categories);
    }
  }
};

const setLoginPageScripts = async () => {
  setLoginFormEvent();
};

const setAdminState = async (works, categories) => {
  createEditionBar();
  createEditionButtons();

  removeFilters();

  createModalGallery(works);
  createModalFormSelect(categories);
  createOpenModalEvent();
  createCloseModalEvents();
  createModalFormEvents();
};

setScripts();

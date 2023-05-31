import { getAllWorks, createWorkElement } from "./works.js";

async function renderElements() {
  const works = await getAllWorks();

  works.forEach((work) => {
    createWorkElement(work);
  });
}

renderElements();

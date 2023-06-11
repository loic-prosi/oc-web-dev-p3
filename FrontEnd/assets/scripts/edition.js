function createEditionBarElement() {
  let editionBarElement = document.createElement("div");
  editionBarElement.className = "edition-bar";

  let editionBarIconElement = document.createElement("img");
  editionBarIconElement.className = "edition-bar__icon";
  editionBarIconElement.src = "./assets/icons/edit-white.svg";

  let editionBarTextElement = document.createElement("p");
  editionBarTextElement.className = "edition-bar__text";
  editionBarTextElement.innerText = "Mode édition";

  let editionBarButtonElement = document.createElement("button");
  editionBarButtonElement.className = "edition-bar__button";
  editionBarButtonElement.innerText = "publier les changements";
  editionBarButtonElement.addEventListener("click", function () {
    location.reload();
  });

  let headerElement = document.querySelector("header");
  headerElement.className = "edition-bar-offset";
  headerElement.appendChild(editionBarElement);

  editionBarElement.appendChild(editionBarIconElement);
  editionBarElement.appendChild(editionBarTextElement);
  editionBarElement.appendChild(editionBarButtonElement);
}

function createEditionButtonElement(
  buttonContainerClassName,
  buttonContainerParentSelector,
  isFirstChild
) {
  let buttonContainer = document.createElement("div");
  buttonContainer.className = buttonContainerClassName;

  let button = document.createElement("button");
  button.className = "edition-button";

  let buttonImg = document.createElement("img");
  buttonImg.className = "edition-button__icon";
  buttonImg.src = "./assets/icons/edit-black.svg";

  let buttonText = document.createElement("span");
  buttonText.className = "edition-button__text";
  buttonText.innerText = "modifier";

  let buttonContainerParent = document.querySelector(
    buttonContainerParentSelector
  );

  if (isFirstChild) {
    buttonContainerParent.prepend(buttonContainer);
  } else {
    buttonContainerParent.appendChild(buttonContainer);
  }
  buttonContainer.appendChild(button);
  button.appendChild(buttonImg);
  button.appendChild(buttonText);
}

function createEditionButtonsElements() {
  createEditionButtonElement(
    "edition-button-container--introduction__figure",
    ".introduction figure"
  );
  createEditionButtonElement(
    "edition-button-container--introduction__article",
    ".introduction article",
    true
  );
  createEditionButtonElement(
    "edition-button-container--portfolio",
    ".portfolio__title"
  );
}

function removePorfolioFilters() {
  let portfolioFiltersParent = document.querySelector(
    ".portfolio__filters"
  ).parentElement;

  let portfolioFilters = document.querySelector(".portfolio__filters");

  portfolioFiltersParent.removeChild(portfolioFilters);
}

function updateIntroductionArticleStyles() {
  let introductionArticle = document.querySelector(".introduction__article");
  introductionArticle.className = "introduction__article--edition";
}

function updatePorfolioTitleStyles() {
  let portfolioTitle = document.querySelector(".portfolio__title");
  portfolioTitle.className = "portfolio__title--edition";
}

export function setEditionState() {
  createEditionBarElement();
  createEditionButtonsElements();
  updateIntroductionArticleStyles();
  removePorfolioFilters();
  updatePorfolioTitleStyles();
}

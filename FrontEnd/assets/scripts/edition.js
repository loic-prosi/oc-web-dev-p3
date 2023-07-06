export const createEditionBar = () => {
  const editionBar = document.createElement("div");
  editionBar.className = "edition-bar";

  const editionBarIcon = document.createElement("i");
  editionBarIcon.className = "edition-bar__icon fa-regular fa-pen-to-square";

  const editionBarText = document.createElement("p");
  editionBarText.className = "edition-bar__text";
  editionBarText.innerText = "Mode édition";

  const editionBarButton = document.createElement("button");
  editionBarButton.className = "button button--edition-bar";
  editionBarButton.innerText = "publier les changements";
  editionBarButton.addEventListener("click", () => {
    window.localStorage.removeItem("architect.authToken");
    location.reload();
  });

  const header = document.querySelector(".header");
  header.classList.add("edition-bar-offset");
  header.appendChild(editionBar);

  editionBar.appendChild(editionBarIcon);
  editionBar.appendChild(editionBarText);
  editionBar.appendChild(editionBarButton);
};

export const createEditionButton = (
  buttonLinkClassName,
  linkContainerParentSelector,
  url,
  isFirstChild
) => {
  const link = document.createElement("a");
  if (url) {
    link.href = url;
  }
  link.className = `button-link ${buttonLinkClassName}`;

  const linkIcon = document.createElement("i");
  linkIcon.className = "button-link__icon fa-regular fa-pen-to-square";

  const linkText = document.createElement("span");
  linkText.className = "button-link__text";
  linkText.innerText = "modifier";

  const linkContainerParent = document.querySelector(
    linkContainerParentSelector
  );

  if (isFirstChild) {
    linkContainerParent.prepend(link);
  } else {
    linkContainerParent.appendChild(link);
  }
  link.appendChild(linkIcon);
  link.appendChild(linkText);
};

export const createEditionButtons = () => {
  // Update page styles before creating edition buttons
  const introductionArticle = document.querySelector(".section__introduction");
  const portfolioTitle = document.querySelector(
    ".section__title-container--portfolio"
  );
  introductionArticle.classList.add("section__introduction--edition");
  portfolioTitle.classList.add("section__title-container--portfolio-edition");

  createEditionButton(
    "button-link--introduction-figure",
    ".section--introduction figure"
  );
  createEditionButton(
    "button-link--introduction-article",
    ".section__introduction",
    null,
    true
  );
  createEditionButton(
    "button-link--portfolio",
    ".section__title-container--portfolio",
    "#modal-gallery"
  );
};

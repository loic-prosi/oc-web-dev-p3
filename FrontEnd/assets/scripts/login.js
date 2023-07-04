import { getLoginData } from "./users.js";

const render = async () => {
  const form = document.querySelector(".form--login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginCredentials = {
      email: event.target.querySelector("[name='email']").value,
      password: event.target.querySelector("[name='password']").value
    };
    const loginData = await getLoginData(loginCredentials);

    if (loginData) {
      if (loginData.token) {
        window.localStorage.setItem("architect.authToken", loginData.token);
        location.replace("../../index.html");
      }

      const emailInput = document.querySelector("input[name='email']");
      emailInput.style.outline = "";

      const passwordInput = document.querySelector("input[name='password']");
      passwordInput.style.outline = "";

      const emailErrorMessage = document.querySelector("#email-error");
      const passWordErrorMessage = document.querySelector("#password-error");

      if (loginData.message) {
        emailInput.style.outline = "2px solid red";
        emailInput.focus();

        emailErrorMessage.innerText = "E-mail incorrect";
      } else {
        emailErrorMessage.innerText = "";
      }

      if (loginData.error) {
        passwordInput.style.outline = "2px solid red";
        passwordInput.value = "";
        passwordInput.focus();

        passWordErrorMessage.innerText = "Mot de passe incorrect";
      } else {
        passWordErrorMessage.innerText = "";
      }
    }
  });
};

render();

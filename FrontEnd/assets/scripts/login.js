import { getLoginData } from "./api.js";

export const setLoginFormEvent = async () => {
  const form = document.querySelector(".form--login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginCredentials = {
      email: event.target.querySelector("[name='email']").value,
      password: event.target.querySelector("[name='password']").value
    };

    const { token, error } = await getLoginData(loginCredentials);

    if (token) {
      window.localStorage.setItem("architect.authToken", token);
      location.replace("../../index.html");
    }
    if (error) {
      setLoginFormErrors(error);
    }
  });
};

const setLoginFormErrors = (error) => {
  const emailInput = document.querySelector("input[name='email']");
  emailInput.style.outline = "";
  const passwordInput = document.querySelector("input[name='password']");
  passwordInput.style.outline = "";

  const emailErrorMessage = document.getElementById("email-error");
  emailErrorMessage.innerText = "";
  const passWordErrorMessage = document.getElementById("password-error");
  passWordErrorMessage.innerText = "";

  if (error === "email") {
    emailInput.style.outline = "2px solid red";
    emailInput.focus();

    emailErrorMessage.innerText = "E-mail incorrect";
  }
  if (error === "password") {
    passwordInput.style.outline = "2px solid red";
    passwordInput.value = "";
    passwordInput.focus();

    passWordErrorMessage.innerText = "Mot de passe incorrect";
  }
};

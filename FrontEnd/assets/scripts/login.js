const render = async () => {
  const form = document.querySelector(".form--login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginData = {
      email: event.target.querySelector("[name='email']").value,
      password: event.target.querySelector("[name='password']").value
    };
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    }).then((res) => res.json());

    if (response) {
      if (response.token) {
        window.localStorage.setItem("architect.authToken", response.token);
        location.replace("../../index.html");
      }

      const emailInput = document.querySelector("input[name='email']");
      emailInput.style.outline = "";

      const passwordInput = document.querySelector("input[name='password']");
      passwordInput.style.outline = "";

      const emailErrorMessage = document.querySelector("#email-error");
      const passWordErrorMessage = document.querySelector("#password-error");

      if (response.message) {
        emailInput.style.outline = "2px solid red";
        emailInput.focus();

        emailErrorMessage.innerText = "E-mail incorrect";
      } else {
        emailErrorMessage.innerText = "";
      }

      if (response.error) {
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

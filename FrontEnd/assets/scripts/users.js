export const getLoginData = async (loginCredentials) => {
  const loginData = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginCredentials)
  }).then((res) => res.json());

  return loginData;
};

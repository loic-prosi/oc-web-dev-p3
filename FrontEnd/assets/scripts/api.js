export const getLoginData = async (loginCredentials) => {
  const loginData = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginCredentials)
  }).then((res) => res.json());

  return loginData;
};

export const getAllWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};

export const createWork = async (workData, authToken) => {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body: workData
  }).then((res) => res.json());
  return response;
};

export const deleteWork = async (workId, authToken) => {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    }
  });
  return response;
};

export const getLoginData = async (loginCredentials) => {
  const apiResponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginCredentials)
  });
  if (apiResponse && apiResponse.status) {
    if (apiResponse.status === 200) {
      const { token } = await apiResponse.json();
      return { token };
    } else if (apiResponse.status === 401) {
      return { error: "password" };
    } else if (apiResponse.status === 404) {
      return { error: "email" };
    } else {
      console.error("api error");
      return {};
    }
  } else {
    console.error("api response is undefined");
    return {};
  }
};

export const getAllWorks = async () => {
  const apiResponse = await fetch("http://localhost:5678/api/works");
  if (apiResponse && apiResponse.status) {
    if (apiResponse.status === 200) {
      const works = await apiResponse.json();
      return works;
    } else {
      console.error("api error");
    }
  } else {
    console.error("api response is undefined");
  }
};

export const createWork = async (workData, authToken) => {
  const apiResponse = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body: workData
  });
  if (apiResponse && apiResponse.status) {
    if (apiResponse.status === 201) {
      const response = await apiResponse.json();
      const work = {
        category: { id: response.categoryId },
        id: response.id,
        imageUrl: response.imageUrl,
        title: response.title,
        userId: response.userId
      };
      return work;
    } else if (apiResponse.status === 401) {
      console.error("unauthorized");
    } else {
      console.error("api error");
    }
  } else {
    console.error("api response is undefined");
  }
};

export const deleteWork = async (workId, authToken) => {
  const apiResponse = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    }
  });
  if (apiResponse && apiResponse.status) {
    if (apiResponse.status === 204) {
      return true;
    } else if (apiResponse.status === 401) {
      console.error("unauthorized");
    } else {
      console.error("api error");
    }
  } else {
    console.error("api response is undefined");
  }
};

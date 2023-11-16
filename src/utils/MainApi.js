export const BASE_URL = "https://api.ildarpracticum-dip23.nomoredomainsrocks.ru";

export const handleResponse = async (response) => {
  if (!response.ok) {
    const res = await response.json();
    return Promise.reject(res);
  }
  return response.json();
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(handleResponse);
};

export const authorized = async (password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    const data = await handleResponse(response);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      return data;
    }
  } catch (error) {
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
  }
};

export const modifyUserProfile = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });

    return handleResponse(response);
  } catch (error) {
  }
};

export const getUserInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
  }
};

export const getSaveMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
  }
};

export const addSavedMovies = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });

    return handleResponse(response);
  } catch (error) {
  }
};

export const deleteSavedMovies = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
  }
};
export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies"; 

export const getMovies = async () => {
  try {
    const response = await fetch(MOVIES_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
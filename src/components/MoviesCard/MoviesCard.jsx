import { useEffect, useState } from "react";
import { addSavedMovies, deleteSavedMovies } from "../../utils/MainApi";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({
  src,
  name,
  duration,
  link,
  id,
  item,
  savedMovies,
  setSavedMovies,
  setSelectSavedMovies,
  selectSavedMovies,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState("");
  const location = useLocation();

  useEffect(() => {
    const savedMovie = savedMovies.find((item) => item.movieId === id);
    if (savedMovie) {
      setIsSaved(true);
      setSavedMovieId(savedMovie._id);
    } else {
      setIsSaved(false);
      setSavedMovieId("");
    }
  }, [savedMovies, id]);

  const handleSaveDeleteMovies = () => {
    if (isSaved) {
      deleteSavedMovies(savedMovieId)
        .then(() => {
          setSavedMovies(savedMovies.filter((item) => item.movieId !== id));
          if (location.pathname === "/saved-movies") {
            setSelectSavedMovies(selectSavedMovies.filter((item) => item.movieId !== id));
          }
        })
        .catch((err) => console.log(err));
    } else {
      addSavedMovies(item)
        .then((res) => {
          setIsSaved(true);
          setSavedMovieId(res._id);
          setSavedMovies([...savedMovies, res]);
        })
        .catch((err) => console.log(err));
    }
  };

  const converterTime = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours}ч ${minutes}м`;
  };

  return (
    <li>
      <article className="movie">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="movie__link-container"
          href={link}
        >
          <img className="movie__img" alt={name} src={src}></img>
          <div className="movie__info">
            <h2 className="movie__name">{name}</h2>
            <p className="movie__duration">{converterTime(duration)}</p>
          </div>
        </a>
        <button
          type="button"
          onClick={handleSaveDeleteMovies}
          className={`movie__button-save ${
            !isSaved
              ? "movie__button-save_disactive"
              : location.pathname === "/saved-movies"
              ? "movie__button-save_delete"
              : "movie__button-save_active"
          }`}
        ></button>
      </article>
    </li>
  );
}

export default MoviesCard;
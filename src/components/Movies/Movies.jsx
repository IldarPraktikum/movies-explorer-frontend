import "./Movies.css";
import React, { useEffect, useState, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  StepBigScreen,
  StepLessScreen,
  InitMobileScreen,
  InitBigScreen,
  InitMediumScreen,
  BigScreen,
  MediumScreen,
} from "../../utils/constants";

function Movies({
  setChecked,
  checked,
  updateMovies,
  allMovies,
  filterMovies,
  savedMovies,
  setSavedMovies,
  setUpdateMovies,
  isDisabledCheckbox,
  setIsDisabledCheckbox,
  isPreloader,
  getAllMovies,
  disabledSearchButton,
  disabledInput,
}) {
  const [displayedMoviesCount, setDisplayedMoviesCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const determiningNumberFilms = useCallback(() => {
    let numberDisplayed;
    if (innerWidth > BigScreen) {
      numberDisplayed = InitBigScreen;
    } else if (innerWidth > MediumScreen) {
      numberDisplayed = InitMediumScreen;
    } else {
      numberDisplayed = InitMobileScreen;
    }

    setDisplayedMoviesCount(numberDisplayed);
  }, [innerWidth]);

  const handleClickButtonMore = () => {
    const incrementValue =
      innerWidth > BigScreen
        ? StepBigScreen
        : StepLessScreen;

        setDisplayedMoviesCount((prevNumber) => prevNumber + incrementValue);
  };

  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
    determiningNumberFilms();
  }, [determiningNumberFilms]);

  useEffect(() => {
    determiningNumberFilms();
  }, [updateMovies, determiningNumberFilms]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (localStorage.getItem("updateMovies")) {
      let checked = JSON.parse(localStorage.getItem("checked"));
      let updateMovies = JSON.parse(localStorage.getItem("updateMovies"));

      setUpdateMovies(updateMovies);
      setChecked(checked);
    } else {
      setIsDisabledCheckbox(true);
    }
  }, []);

  const handleSubmitSearch = useCallback(
    (value, checked) => {
      if (!localStorage.getItem("updateMovies") || allMovies.length === 0) {
        getAllMovies(value, checked);
      } else {
        filterMovies(value, checked, allMovies);
      }
      localStorage.setItem("valueSearch", JSON.stringify(value));
      localStorage.setItem("checked", checked);
    },
    [allMovies, filterMovies, getAllMovies]
  );

  return (
    <main className="movies">
      <SearchForm
        setIsDisabledCheckbox={setIsDisabledCheckbox}
        isDisabledCheckbox={isDisabledCheckbox}
        updateMovies={updateMovies}
        setChecked={setChecked}
        checked={checked}
        handleSubmitSearch={handleSubmitSearch}
        disabledInput={disabledInput}
        disabledSearchButton={disabledSearchButton}
      />
      {isPreloader ? (
        <Preloader />
      ) : (
        updateMovies && (
          <MoviesCardList>
            {updateMovies.slice(0, displayedMoviesCount).map((item) => (
              <MoviesCard
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                key={item.id}
                id={item.id}
                item={item}
                link={item.trailerLink}
                src={`https://api.nomoreparties.co${item.image.url}`}
                name={item.nameRU}
                duration={item.duration}
              />
            ))}
          </MoviesCardList>
        )
      )}
      <div className="error-message-container">
        <p className="error-message-container__text">
          {isError &&
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."}
          {updateMovies.length === 0 && "Ничего не найдено."}
        </p>
      </div>
      {updateMovies.length > displayedMoviesCount && (
        <div className="movies__button-container">
          <button
            onClick={handleClickButtonMore}
            type="button"
            className="movies__button"
          >
            Ещё
          </button>
        </div>
      )}
    </main>
  );
}

export default Movies;


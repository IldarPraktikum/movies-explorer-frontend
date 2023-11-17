import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  setChecked,
  checked,
  filterMovies,
  savedMovies,
  setSavedMovies,
  selectSavedMovies,
  setSelectSavedMovies,
  setIsDisabledCheckbox,
  isDisabledCheckbox,
  disabledSearchButton,
  disabledInput,
}) {
  const [presentSavedMovies, setPresentSavedMovies] = useState(true);

  useEffect(() => {
    setSelectSavedMovies([]);
    setChecked(false);
    setPresentSavedMovies(true);
  }, []);

  function handleSubmitSearch(value, checked) {
    filterMovies(value, checked, savedMovies);
    setPresentSavedMovies(false);
  }

  const renderMovies = presentSavedMovies
    ? savedMovies
    : selectSavedMovies;

  return (
    <main className="saved-movies">
      <SearchForm
        setIsDisabledCheckbox={setIsDisabledCheckbox}
        setChecked={setChecked}
        checked={checked}
        handleSubmitSearch={handleSubmitSearch}
        isDisabledCheckbox={isDisabledCheckbox}
        disabledInput={disabledInput}
        disabledSearchButton={disabledSearchButton}
      />
      {renderMovies.length > 0 ? (
        <MoviesCardList>
          {renderMovies.map((item) => (
            <MoviesCard
              key={item._id}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              id={item.movieId}
              item={item}
              link={item.trailerLink}
              src={item.image}
              name={item.nameRU}
              duration={item.duration}
              selectSavedMovies={selectSavedMovies}
              setSelectSavedMovies={setSelectSavedMovies}
            />
          ))}
        </MoviesCardList>
      ) : (
        <div className="find-container">
          <p className="find-container__text">
            Ничего не найдено. Попробуйте еще раз.
          </p>
        </div>
      )}
    </main>
  );
}

export default SavedMovies;



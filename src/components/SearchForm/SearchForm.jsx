import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  handleSubmitSearch,
  checked,
  setChecked,
  isDisabledCheckbox,
  setIsDisabledCheckbox,
  disabledInput,
  disabledSearchButton
}) {
  const { values, setValues, handleChange } = useFormValidation({});
  const location = useLocation();
  const [errorNoValue, setErrorNoValue] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("valueSearch")
    ) {
      const valueLocalStorage = JSON.parse(localStorage.getItem("valueSearch"));
      setValues(valueLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!values.searchMovies || !localStorage.getItem("updateMovies") ) {
      setIsDisabledCheckbox(true);
    } else {
      setIsDisabledCheckbox(false);
      setErrorNoValue(false);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (values.searchMovies) {
      handleSubmitSearch(values, checked);
      setErrorNoValue(false);
    } else {
      setErrorNoValue(true);
    }
  }

  function handleClick(checked) {
    if (values.searchMovies) {
      handleSubmitSearch(values, checked);
    } else {
      setIsDisabledCheckbox(true);
    }
  }

  return (
    <section className="search">
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__form-container">
          <input
            value={values.searchMovies || ""}
            name="searchMovies"
            onChange={handleChange}
            placeholder="Фильм"
            className="search__input"
            disabled={disabledInput ? true : false}
          />
          <button
            type="submit"
            disabled={disabledSearchButton ? true : false}
            className="search__button"
          >Найти</button>
          {errorNoValue && (
            <span className="search__error">Введите название фильма.</span>
          )}
        </div>

        <FilterCheckbox
          isDisabledCheckbox={isDisabledCheckbox}
          handleClick={handleClick}
          checked={checked}
          setChecked={setChecked}
        />
      </form>
    </section>
  );
}

export default SearchForm;

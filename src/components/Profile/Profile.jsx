import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { EmailRegex, NameRegex } from "../../utils/constants";

function Profile({
  setLoggedIn,
  setUpdateMovies,
  setChecked,
  handleModifyUserProfile,
  setButtonSave,
  buttonSave,
  setDisabledButtonSubmitProfile,
  disabledButtonSubmitProfile,
  disabledInput,
}) {
  const { value } = useContext(CurrentUserContext);
  const [currentUser] = value;
  const {
    values,
    error,
    isValid,
    setValues,
    handleChange,
    resetInput,
  } = useFormValidation();

  const navigate = useNavigate();

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  useEffect(() => {
    const isFormChanged =
      currentUser.name !== values.name || currentUser.email !== values.email;
    setDisabledButtonSubmitProfile(!isFormChanged);
  }, [currentUser, values, setDisabledButtonSubmitProfile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleModifyUserProfile(values);
  };

  const handleLogout = () => {
    resetInput();
    localStorage.removeItem("jwt");
    localStorage.removeItem("updateMovies");
    localStorage.removeItem("checked");
    localStorage.removeItem("valueSearch");
    setChecked(false);
    setUpdateMovies(false);
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form
          name="modifyUserProfile"
          onSubmit={handleSubmit}
          className="profile__form"
        >
          <label className="profile__element">
            Имя
            <input
              placeholder="Имя"
              name="name"
              onChange={handleChange}
              disabled={disabledInput || !buttonSave}
              required
              pattern={NameRegex}
              minLength={2}
              className="profile__input"
              type="text"
              value={values.name || ""}
            />
            <span className="profile__span-error">{error.name}</span>
          </label>
          <label className="profile__element">
            E-mail
            <input
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
              disabled={disabledInput || !buttonSave}
              required
              className="profile__input"
              pattern={EmailRegex}
              type="email"
              value={values.email || ""}
            />
            <span className="profile__span-error">{error.email}</span>
          </label>
          {buttonSave && (
            <button
              disabled={!isValid || disabledButtonSubmitProfile}
              type="submit"
              className="profile__button-save"
            >
              Сохранить
            </button>
          )}
        </form>
        {!buttonSave && (
          <div className="profile__button-container">
            <button
              type="button"
              onClick={() => setButtonSave(true)}
              className="profile__edit-button"
            >
              Редактировать
            </button>
            <button
              onClick={handleLogout}
              type="button"
              className="profile__button-exit"
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
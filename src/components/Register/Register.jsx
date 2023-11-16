import "./Register.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/header_logo.svg";
import { useFormValidation } from "../../hooks/useFormValidation";
import { EmailRegex, NameRegex } from "../../utils/constants";

function Register({
  handleRegistration,
  disabledButtonSubmitRegAuth,
  disabledInput,
}) {
  const { values, error, isValid, handleChange } = useFormValidation();

  const inputProps = {
    disabled: disabledInput,
    className: "register__form-input",
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleRegistration(values.name, values.email, values.password);
  }

  return (
    <main>
      <section className="register">
        <div className="register__container">
          <NavLink to="/" className="register__logo-link">
            <img src={logo} alt="зеленый круг логотип сайта" />
          </NavLink>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form onSubmit={handleSubmit} className="register__form-container">
            <label className="register__form-item">
              Имя
              <input
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                required
                minLength={2}
                pattern={NameRegex}
                type="text"
                {...inputProps}
              />
              <span className="register__form-span">{error.name}</span>
            </label>
            <label className="register__form-item">
              E-mail
              <input
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                required
                type="email"
                pattern={EmailRegex}
                {...inputProps}
              />
              <span className="register__form-span">{error.email}</span>
            </label>
            <label className="register__form-item">
              Пароль
              <input
                name="password"
                value={values.password || ""}
                minLength={2}
                onChange={handleChange}
                required
                type="password"
                {...inputProps}
              />
              <span className="register__form-span">{error.password}</span>
            </label>
            <button
              type="submit"
              disabled={!isValid || disabledButtonSubmitRegAuth}
              className="register__form-button"
            >
              Зарегистрироваться
            </button>
          </form>
          <p className="register__text">
            Уже зарегистрированы?
            <Link to="/signin" className="register__link">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
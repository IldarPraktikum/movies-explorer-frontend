import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/header_logo.svg';
import { EmailRegex } from '../../utils/constants';
import { useFormValidation } from '../../hooks/useFormValidation';
import './Login.css';

function Login({ authorizedMoove, disabledButtonSubmitRegAuth, disabledInput }) {
  const { values, error, isValid, handleChange } = useFormValidation({});

  const handleSubmit = (e) => {
    e.preventDefault();
    authorizedMoove(values.password, values.email);
  };

  const renderFormField = (fieldName, label) => (
    <label key={fieldName} className="login__form-element">
      {label}
      <input
        name={fieldName}
        value={values[fieldName] || ''}
        onChange={handleChange}
        required
        type={fieldName === 'email' ? 'email' : 'password'}
        pattern={fieldName === 'email' ? EmailRegex : undefined}
        className="login__form-input"
        disabled={disabledInput}
      />
      <span className="login__form-span">{error[fieldName]}</span>
    </label>
  );

  return (
    <main>
      <section className="login">
        <div className="login__container">
          <NavLink to="/" className="login__link-logo">
            <img src={logo} alt="логотип круг" />
          </NavLink>
          <h1 className="login__title">Рады видеть!</h1>
          <form onSubmit={handleSubmit} className="login__form-container">
            {renderFormField('email', 'E-mail')}
            {renderFormField('password', 'Пароль')}
            <button
              disabled={!isValid || disabledButtonSubmitRegAuth}
              type="submit"
              className="login__form-button"
            >
              Войти
            </button>
          </form>
          <p className="login__text">
            Ещё не зарегистрированы?{' '}
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;


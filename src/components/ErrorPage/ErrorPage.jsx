import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="errorpage-page">
      <h1 className="errorpage-page__title">404</h1>
      <p className="errorpage-page__subtitle">Страница не найдена</p>
      <Link to="/" className="errorpage-page__link">
      Назад
      </Link>
    </div>
  );
}

export default ErrorPage;
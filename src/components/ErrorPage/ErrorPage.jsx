import { useNavigate } from "react-router-dom"
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="errorpage-page">
      <h1 className="errorpage-page__title">404</h1>
      <p className="errorpage-page__subtitle">Страница не найдена</p>
      <button type="button" onClick={() => navigate(-1)} className="errorpage-page__button" >Назад</button>
    </div>
  );
}

export default ErrorPage;



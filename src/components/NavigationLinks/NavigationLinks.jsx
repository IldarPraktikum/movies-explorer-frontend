import { NavLink } from "react-router-dom";
import "./Navigation.css";

const NavigationLinks = ({ closeBurgerMenu }) => (
  <section className="burger-menu">
    <div className="burger-menu__container">
      <button type="button" onClick={closeBurgerMenu} className="burger-menu__close-button"></button>
      <nav className="burger-menu__menu">
        {["Главная", "Фильмы", "Сохраненные фильмы"].map((text, index) => (
          <NavLink key={index} onClick={closeBurgerMenu} to={index === 0 ? "/" : index === 1 ? "/movies" : "/saved-movies"} className="burger-menu__link" activeClassName="burger-menu__link_active">
            {text}
          </NavLink>
        ))}
      </nav>
      <NavLink onClick={closeBurgerMenu} to="/profile" className="burger-menu__link-account">Аккаунт</NavLink>
    </div>
  </section>
);

export default NavigationLinks;



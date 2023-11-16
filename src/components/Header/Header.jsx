import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css';

export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const processClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const processLinkClick = () => {
    setIsMenuOpen(false);
  };

  const resizeBurgerClose = () => {
    if (document.documentElement.clientWidth > 767) {
      setIsMenuOpen(false);
      window.removeEventListener('resize', resizeBurgerClose);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener('resize', resizeBurgerClose);
      return () => window.removeEventListener('resize', resizeBurgerClose);
    }
  }, [isMenuOpen]);

  const renderGuestLinks = () => (
    <nav>
      <ul className='header__links-container'>
        <li>
          <Link to={'/signup'} className="header__signup" onClick={processLinkClick}>
            Регистрация
          </Link>
        </li>
        <li>
          <Link to={'/signin'} className="header__signin" onClick={processLinkClick}>
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderUserLinks = () => (
    <>
      <nav className={`header__nav ${isMenuOpen ? 'header__nav_open' : ''}`}>
        <ul className='header__links-container header__links-container_another'>
          <li className='header__link-container'>
            <Link
              to={'/'}
              className={`header__link ${pathname === '/' ? 'header__link_active' : ''} ${pathname === '/' ? 'header__link_black' : ''} ${pathname === '/movies' ? 'header__link_black' : ''} ${pathname === '/saved-movies' ? 'header__link_black' : ''}`}
              onClick={processLinkClick}
            >Главная</Link>
          </li>
          <li className='header__link-container'>
            <Link
              to={'/movies'}
              className={`header__link ${pathname === '/movies' ? 'header__link_active header__link_black' : ''} ${pathname === '/saved-movies' ? 'header__link_black' : ''}`}
              onClick={processLinkClick}
            >Фильмы</Link>
          </li>
          <li className='header__link-container'>
            <Link
              to={'/saved-movies'}
              className={`header__link ${pathname === '/saved-movies' ? 'header__link_active header__link_black' : ''} ${pathname === '/movies' ? 'header__link_black' : ''}`}
              onClick={processLinkClick}
            >Сохранённые фильмы</Link>
          </li>
          <li className='header__link-container'>
            <Link
              to={'/profile'}
              className={`header__link header__link_type_acc  ${pathname === '/profile' ? 'header__link_type_acc-white' : ''} ${pathname === '/movies' ? 'header__link_type_acc-white' : ''} ${pathname === '/saved-movies' ? 'header__link_type_acc-white' : ''}`}
              onClick={processLinkClick}
            >Аккаунт <div className='header__acc-icon'></div></Link>
          </li>
        </ul>
        <button type='button' className='header__burger-close' onClick={processClick}></button>
      </nav>
      <button type='button' className={`header__burger ${pathname === '/' ? 'header__burger_white' : ''}`} onClick={processClick}></button>
    </>
  );

  return (
    <header className={`header page__header ${name !== 'home' ? 'page__header_another' : ''}`}>
      <div>
        <Link to={'/'} className="header__link-home"></Link>
      </div>
      {name === 'home' && !loggedIn ? renderGuestLinks() : renderUserLinks()}
    </header>
  );
}
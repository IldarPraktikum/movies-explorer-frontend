import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const { pathname } = useLocation();
  const isSavedMoviesPage = pathname === '/saved-movies';

  return (
    <footer className={`footer page__footer ${isSavedMoviesPage && 'page__footer_type_saved-movies'}`}>
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__subtitle">© 2023</p>
        <nav className="footer__menu">
          <Link to={'https://practicum.yandex.ru/'} target='_blank' className="footer__link" rel="noopener noreferrer">Яндекс.Практикум</Link>
          <Link to={'https://github.com'} target='_blank' className="footer__link" rel="noopener noreferrer">Github</Link>
        </nav>
      </div>
    </footer>
  );
}
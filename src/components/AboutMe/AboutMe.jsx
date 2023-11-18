import React from 'react';
import './AboutMe.css';
import photo from '../../images/pic__COLOR_pic.jpg';
import Rolling from '../Rolling/Rolling';

const AboutMe = () => {
  return (
    <section className="aboutme page__aboutme">
      <Rolling>
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__container">
          <div className="aboutme__info-container">
            <h3 className="aboutme__my-name">Виталий</h3>
            <p className="aboutme__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutme__about-myself">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
              и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл
              с&nbsp;постоянной работы.
            </p>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="aboutme__link">
              Github
            </a>
          </div>
          <img src={photo} alt="аватар Виталия" className="aboutme__avatar" />
        </div>
      </Rolling>
    </section>
  );
};

export default AboutMe;
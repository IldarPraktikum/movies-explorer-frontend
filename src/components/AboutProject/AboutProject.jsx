import React from 'react';
import Rolling from '../Rolling/Rolling';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="aboutProject" className="project page__about">
      <Rolling>
        <h2 className="project__title">О проекте</h2>
        <div className="project__container">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__overview">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
          <p className="project__overview">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="project__study-course">
          <p className="project__studies project__studies_stage_backend">1 неделя</p>
          <p className="project__studies">4 недели</p>
          <span className="project__text">Back-end</span>
          <span className="project__text">Front-end</span>
        </div>
      </Rolling>
    </section>
  );
};

export default AboutProject;
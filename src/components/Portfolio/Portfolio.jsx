import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';
import Rolling from '../Rolling/Rolling';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <Rolling>
        <h3 className='portfolio__title'>Портфолио</h3>
        <nav className='portfolio__nav'>
          <ul className='portfolio__lists'>
            <li className='portfolio__list'>
              <Link to={'https://github.com'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Статичный сайт</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://github.com'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Адаптивный сайт</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://github.com'} target='_blank' className='portfolio__link portfolio__link_type_last'>
                <p className='portfolio__subtitle'>Одностраничное приложение</p>
                <button type='button' className='portfolio__button'></button>
              </Link>
            </li>
          </ul>
        </nav>
      </Rolling>
    </section>
  );
}

export default Portfolio;
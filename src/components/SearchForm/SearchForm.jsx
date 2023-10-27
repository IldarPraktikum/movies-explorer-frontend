import { useEffect } from 'react'
import { useContext } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'
import ErrorContext from '../../contexts/ErrorContext'
import { useLocation } from 'react-router-dom'


export default function SearchForm({ isCheck, changeShort, searchedMovie, searchMovies, setIsError, initialEntry, savedMovie }) {
  const { pathname } = useLocation()
  const isError = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [searchedMovie, reset, setIsError, pathname, savedMovie])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  return (
    <section className='search page__search'>
      <div className='search__container'>
        <form noValidate className='search__form' name={'SearchForm'} onSubmit={onSubmit}>
          <input
            type="text"
            name='search'
            placeholder='Фильм'
            className='search__input'
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
            required
          />
          <button type='submit' className='search_submit'>Найти</button>
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>{'Введите ключевое слово'}</span>
        <FilterCheckbox isCheck={isCheck} changeShort={changeShort} initialEntry={initialEntry} />
      </div>
    </section>
  )
}

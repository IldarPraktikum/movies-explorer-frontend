import './Form.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Form({ name, children, isValid, onSubmit, setSuccess, setIsEdit, isEdit }) {

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [setSuccess, setIsEdit, pathname])

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className='login__error-request'>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid}
          >{'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className='login__error-request login__error-request_type_reg'>{'При регистрации произошла ошибка.'}</span>
            <button type="submit" className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}>{'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
          <>
            <span className='profile__error-request'>{'При обновлении профиля произошла ошибка.'}</span>
            <button type="button" className='profile__submit'
            onClick={() => {
              setIsEdit(true)
              setSuccess(false)
            }}>{'Редактировать'}</button>
          </> :
          <>
            <span className='profile__error-request'>{'При обновлении профиля произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
              disabled={!isValid}
            >{'Сохранить'}</button>
          </>
      }
    </form>
  )
}
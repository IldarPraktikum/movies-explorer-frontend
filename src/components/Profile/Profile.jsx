import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Profile.css'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import { useEffect } from 'react'

export default function Profile({ name, setLoggedIn, isSuccess, setSuccess, setIsEdit, isEdit }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    reset({username: 'Виталий', email: 'pochta@yandex.ru'})
  }, [reset])

  function onEdit(evt) {
    evt.preventDefault()
  }

  function outLogin() {
    setLoggedIn(false)
  }
  return (
    <section className="profile page__profile">
      <h2 className='profile__title'>{`Привет, Виталий!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onEdit}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      >
        <Input
          selectname={name}
          name='username'
          type='text'
          title='Имя'
          minLength='3'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
          isEdit={isEdit}
        />
        <Input
          selectname={name}
          name='email'
          type='email'
          title='E-mail'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
          isEdit={isEdit}
        />
      </Form>
      <Link to={'/'} onClick={outLogin} className='profile__link'>Выйти из аккаунта</Link>
    </section>
  )
}
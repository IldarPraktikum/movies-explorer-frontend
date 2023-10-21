import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useState, useCallback } from 'react';

function App() {
const [loggedIn, setLoggedIn] = useState(false)
const [isSuccess, setIsSuccess] = useState(false)
const [isEdit, setIsEdit] = useState(false)

const setSuccess = useCallback(() => {
  setIsSuccess(false)
}, [])

  return (
    <div className="page__container">
      <Routes>

        <Route path='/signin' element={
          <Main name='signin' setLoggedIn={setLoggedIn}/>
        } />

        <Route path='/signup' element={
          <Main name='signup' setLoggedIn={setLoggedIn}/>
        } />

        <Route path='/' element={
          <>
            <Header name='home' loggedIn={loggedIn}/>
            <Main name='home' />
            <Footer />
          </>
        } />

        <Route path='/movies' element={
          <>
            <Header />
            <Main name='movies' />
            <Footer />
          </>
        } />

        <Route path='/saved-movies' element={
          <>
            <Header />
            <Main name='savedmovies' />
            <Footer />
          </>
        } />

        <Route path='/profile' element={
          <>
            <Header />
            <Main name='profile' setLoggedIn={setLoggedIn} isSuccess={isSuccess} setSuccess={setSuccess} setIsEdit={setIsEdit} isEdit={isEdit}/>
          </>
        } />

        <Route path='*' element={
          <>
            <Main name='error' />
          </>
        } />

      </Routes>
    </div>
  );
}

export default App;
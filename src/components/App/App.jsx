import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import "./App.css";
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import PopupInfo from '../PopupInfo/PopupInfo';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  authorized,
  verifyToken,
  modifyUserProfile,
  getSaveMovies,
  getUserInfo,
  register,
} from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getMovies } from '../../utils/MoviesApi';

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  const [allMovies, setAllMovies] = useState([]);
  const [savMovies, setSavMovies] = useState([]);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [selectSavedMovies, setSelectSavedMovies] = useState([]);

  const [checked, setChecked] = useState(false);
  const [isDisabledCheckbox, setIsDisabledCheckbox] = useState(false);

  const [disabledButtonSubmitProfile, setDisabledButtonSubmitProfile] = useState(false);
  const [disabledSearchButton, setDisabledSearchButton] = useState(false);
  const [disabledButtonSubmitRegAuth, setDisabledButtonSubmitSearchRegAuth] = useState(false);

  const [disabledInput, setDisabledInput] = useState(false);

  const [isActiveHeader, setIsActiveHeader] = useState(false);
  const [isActiveFooter, setIsActiveFooter] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [buttonSave, setButtonSave] = useState(false);

  const [popupInfo, setPopupInfo] = useState({});
  const [isPreloader, setIsPreloader] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSaveMovies()
        .then((savedMovies) => {
          setSavMovies(savedMovies);
        })
        .catch((err) => {
          setSavMovies([]);
        });
    }
  }, [loggedIn]);

  const closePopup = () => {
    setPopupInfo({ ...popupInfo, ok: false, error: false });
  };

  useEffect(() => {
    if (
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies'
    ) {
      setIsActiveHeader(true);
      setIsActiveFooter(true);
    } else if (location.pathname === '/profile') {
      setIsActiveHeader(true);
      setIsActiveFooter(false);
    } else {
      setIsActiveHeader(false);
      setIsActiveFooter(false);
    }
  }, [location, isActiveHeader]);

  const handleRegistration = async (name, email, password) => {
    setDisabledButtonSubmitSearchRegAuth(true);
    setDisabledInput(true);
    try {
      await register(name, email, password);
      setPopupInfo({
        ...popupInfo,
        ok: true,
        title: 'Вы успешно зарегистрировались.',
      });
      await authorizedMoove(password, email);
      navigate('/movies');
    } catch (res) {
      setPopupInfo({ ...popupInfo, error: true, title: res.message });
    } finally {
      setDisabledButtonSubmitSearchRegAuth(false);
      setDisabledInput(false);
    }
  };

  const authorizedMoove = async (password, email) => {
    setDisabledButtonSubmitSearchRegAuth(true);
    setDisabledInput(true);
    try {
      const data = await authorized(password, email);
      if (data.token) {
        handleLogin();
        navigate('/movies', { replace: true });
      }
      const userInfo = await getUserInfo();
      setCurrentUser(userInfo);
    } catch (res) {
      setPopupInfo({ ...popupInfo, error: true, title: res.message });
    } finally {
      setDisabledButtonSubmitSearchRegAuth(false);
      setDisabledInput(false);
    }
  };

  const handleModifyUserProfile = async (values) => {
    setDisabledInput(true);
    setDisabledButtonSubmitProfile(true);
    try {
      const res = await modifyUserProfile(values);
      setCurrentUser(res);
      setButtonSave(false);
      setPopupInfo({ ...popupInfo, ok: true, title: 'Данные отредактированы' });
    } catch (res) {
      setPopupInfo({ ...popupInfo, error: true, title: res.message });
    } finally {
      setDisabledInput(false);
    }
  };

  const handleTokenCheck = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      try {
        const res = await verifyToken(jwt);
        setCurrentUser(res);
        setLoggedIn(true);
        navigate(path, { replace: true });
      } catch (err) {
        console.log(`${err.status} ${err.text}`);
      }
    }
  };

  const filterMovies = (value, checked, movies) => {
    let filtered = movies.filter((item) => {
      let sort =
        item.nameRU.toLowerCase().includes(value.searchMovies.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(value.searchMovies.toLowerCase());
      return checked ? sort && item.duration <= 40 : sort;
    });
    if (location.pathname === '/movies') {
      localStorage.setItem('updateMovies', JSON.stringify(filtered));
      setUpdateMovies(filtered);
    } else if (location.pathname === '/saved-movies') {
      setSelectSavedMovies(filtered);
    }
  };

  const getAllMovies = async (value, checked) => {
    setIsPreloader(true);
    setDisabledSearchButton(true);
    setDisabledInput(true);
    setIsDisabledCheckbox(true);
    try {
      const movies = await getMovies();
      setAllMovies(movies);
      setIsDisabledCheckbox(false);
      filterMovies(value, checked, movies);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPreloader(false);
      setDisabledSearchButton(false);
      setDisabledInput(false);
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          value: [currentUser, setCurrentUser],
          value2: [popupInfo, setPopupInfo],
        }}
      >
        {isActiveHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={
            <>
              <Header name="home" loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          } />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  handleRegistration={handleRegistration}
                  disabledButtonSubmitRegAuth={disabledButtonSubmitRegAuth}
                  disabledInput={disabledInput}
                />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  authorizedMoove={authorizedMoove}
                  disabledButtonSubmitRegAuth={disabledButtonSubmitRegAuth}
                  disabledInput={disabledInput}
                />
              )
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isError={isError}
                getAllMovies={getAllMovies}
                isPreloader={isPreloader}
                setAllMovies={setAllMovies}
                isDisabledCheckbox={isDisabledCheckbox}
                setIsDisabledCheckbox={setIsDisabledCheckbox}
                checked={checked}
                setChecked={setChecked}
                savedMovies={savMovies}
                setSavedMovies={setSavMovies}
                loggedIn={loggedIn}
                updateMovies={updateMovies}
                setUpdateMovies={setUpdateMovies}
                allMovies={allMovies}
                filterMovies={filterMovies}
                disabledInput={disabledInput}
                disabledSearchButton={disabledSearchButton}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                setChecked={setChecked}
                checked={checked}
                setSelectSavedMovies={setSelectSavedMovies}
                selectSavedMovies={selectSavedMovies}
                savedMovies={savMovies}
                setSavedMovies={setSavMovies}
                loggedIn={loggedIn}
                updateMovies={updateMovies}
                filterMovies={filterMovies}
                setIsDisabledCheckbox={setIsDisabledCheckbox}
                isDisabledCheckbox={isDisabledCheckbox}
                disabledInput={disabledInput}
                disabledSearchButton={disabledSearchButton}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                handleModifyUserProfile={handleModifyUserProfile}
                buttonSave={buttonSave}
                setButtonSave={setButtonSave}
                setChecked={setChecked}
                setUpdateMovies={setUpdateMovies}
                setLoggedIn={setLoggedIn}
                disabledButtonSubmitProfile={disabledButtonSubmitProfile}
                setDisabledButtonSubmitProfile={setDisabledButtonSubmitProfile}
                disabledInput={disabledInput}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {isActiveFooter && <Footer />}
        <PopupInfo closePopup={closePopup} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;



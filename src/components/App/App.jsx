import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import ErrorPage from '../ErrorPage/ErrorPage';
import PopupInfo from '../PopupInfo/PopupInfo';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  authorized,
  verifyToken,
  modifyUserProfile,
  getSaveMovies,
  getUserInfo,
  register,
} from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  const [allMovies, setAllMovies] = useState([]);
  const [savMovies, setSavMovies] = useState([]);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [selectSavedMovies, setSelectSavedMovies] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    checkbox: false,
    buttonProfile: false,
    buttonSearch: false,
    buttonRegAuth: false,
    input: false,
  });
  const [isActiveHeader, setIsActiveHeader] = useState(false);
  const [isActiveFooter, setIsActiveFooter] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [buttonSave, setButtonSave] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [isPreloader, setIsPreloader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const closePopup = () => setPopupInfo({ ...popupInfo, ok: false, error: false });

  useEffect(() => {
    const checkLocation = () => {
      const movieRoutes = ['/movies', '/saved-movies'];
      setIsActiveHeader(movieRoutes.includes(location.pathname));
      setIsActiveFooter(movieRoutes.includes(location.pathname) || location.pathname === '/profile');
    };
    checkLocation();
  }, [location]);

  const handleLogin = () => setLoggedIn(true);

  useEffect(() => {
    const handleTokenCheck = async () => {
      const jwt = localStorage.getItem('jwt');
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

    handleTokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    const fetchSaveMovies = async () => {
      if (loggedIn) {
        try {
          const savedMovies = await getSaveMovies();
          setSavMovies(savedMovies);
        } catch (error) {
          setSavMovies([]);
        }
      }
    };

    fetchSaveMovies();
  }, [loggedIn]);

  const handleRegistration = async (name, email, password) => {
    try {
      setIsDisabled({ ...isDisabled, buttonRegAuth: true, input: true });

      await register(name, email, password);
      setPopupInfo({ ...popupInfo, ok: true, title: 'Вы успешно зарегистрировались.' });

      await authorizedMoove(password, email);
      navigate('/movies');
    } catch (res) {
      setPopupInfo({ ...popupInfo, error: true, title: res.message });
    } finally {
      setIsDisabled({ ...isDisabled, buttonRegAuth: false, input: false });
    }
  };

  const authorizedMoove = async (password, email) => {
    try {
      setIsDisabled({ ...isDisabled, buttonRegAuth: true, input: true });

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
      setIsDisabled({ ...isDisabled, buttonRegAuth: false, input: false });
    }
  };

  const handleModifyUserProfile = async (values) => {
    try {
      setIsDisabled({ ...isDisabled, input: true, buttonProfile: true });

      const res = await modifyUserProfile(values);
      setCurrentUser(res);
      setButtonSave(false);
      setPopupInfo({ ...popupInfo, ok: true, title: 'Данные отредактированы' });
    } catch (res) {
      setPopupInfo({ ...popupInfo, error: true, title: res.message });
    } finally {
      setIsDisabled({ ...isDisabled, input: false, buttonProfile: false });
    }
  };

  const filterMovies = (value, checked, movies) => {
    const filtered = movies.filter((item) => {
      const sort =
        item.nameRU.toLowerCase().includes(value.searchMovies.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(value.searchMovies.toLowerCase());
      return checked ? sort && item.duration <= 40 : sort;
    });

    if (['/movies', '/saved-movies'].includes(location.pathname)) {
      localStorage.setItem('updateMovies', JSON.stringify(filtered));
      setUpdateMovies(filtered);
    } else if (location.pathname === '/saved-movies') {
      setSelectSavedMovies(filtered);
    }
  };

  const getAllMovies = async (value, checked) => {
    try {
      setIsPreloader(true);
      setIsDisabled({ ...isDisabled, buttonSearch: true, input: true, checkbox: true });

      const movies = await getMovies();
      setAllMovies(movies);
      setIsDisabled({ ...isDisabled, checkbox: false });
      filterMovies(value, checked, movies);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPreloader(false);
      setIsDisabled({ ...isDisabled, buttonSearch: false, input: false });
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ value: [currentUser, setCurrentUser], value2: [popupInfo, setPopupInfo] }}>
        {isActiveHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header name="home" loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                handleRegistration={handleRegistration}
                  disabledButtonSubmitRegAuth={isDisabled.buttonRegAuth}
                  disabledInput={isDisabled.input}
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
                  disabledButtonSubmitRegAuth={isDisabled.buttonRegAuth}
                  disabledInput={isDisabled.input}
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
                isDisabledCheckbox={isDisabled.checkbox}
                setIsDisabledCheckbox={(value) => setIsDisabled({ ...isDisabled, checkbox: value })}
                checked={checked}
                setChecked={setChecked}
                savedMovies={savMovies}
                setSavedMovies={setSavMovies}
                loggedIn={loggedIn}
                updateMovies={updateMovies}
                setUpdateMovies={setUpdateMovies}
                allMovies={allMovies}
                filterMovies={filterMovies}
                disabledInput={isDisabled.input}
                disabledSearchButton={isDisabled.buttonSearch}
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
                setIsDisabledCheckbox={(value) => setIsDisabled({ ...isDisabled, checkbox: value })}
                isDisabledCheckbox={isDisabled.checkbox}
                disabledInput={isDisabled.input}
                disabledSearchButton={isDisabled.buttonSearch}
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
                disabledButtonSubmitProfile={isDisabled.buttonProfile}
                setDisabledButtonSubmitProfile={(value) => setIsDisabled({ ...isDisabled, buttonProfile: value })}
                disabledInput={isDisabled.input}
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
const EmailRegex = "[A-Za-z0-9_]+@[A-Za-z0-9]+\\.[a-z]{2,4}"
const NameRegex = "^[а-яА-ЯёЁa-zA-Z\\s\\-]+"
const BigScreen = 1100                /*  монитор */
const MediumScreen = 660              /*  планшет, моб. */
const InitBigScreen = 16              /*   Количество фильмов на мониторе */
const InitMediumScreen = 8            /*  Количество фильмов на планшете */
const InitMobileScreen = 5            /*  Количество фильмов на мобильном устройстве */
const StepBigScreen = 3               /*  Количество дополнительно загружаемых фильмов для десктопа */
const StepLessScreen = 2              /*  Количество дополнительно загружаемых фильмов для планшета и мобильного устройства */
const durationLessFilm = 40           /* Длительность короткометражного фильма (минуты) */
export {
  EmailRegex,
  NameRegex,
  BigScreen,
  MediumScreen,
  InitMobileScreen,
  InitBigScreen,
  InitMediumScreen,
  StepBigScreen,
  StepLessScreen,
  durationLessFilm,
}
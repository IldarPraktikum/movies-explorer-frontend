import React, { useContext, useEffect } from "react";
import "./PopupInfo.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import successImage from "../../images/wellRegistr.svg";
import errorImage from "../../images/dontRegistr.svg";

function PopupInfo({ closePopup }) {
  const { value2 } = useContext(CurrentUserContext);
  const [popupInfo] = value2;

  const popupClassName = `popup ${popupInfo.error || popupInfo.ok ? "popup_opened" : ""}`;

  useEffect(() => {
    if (popupInfo.ok || popupInfo.error) {
      const timeoutId = setTimeout(() => {
        closePopup();
      }, 2000);

      return () => clearTimeout(timeoutId); // Очистка таймера при размонтировании компонента
    }
  }, [popupInfo, closePopup]);

  return (
    <>
      <div onMouseDown={closePopup} className={popupClassName}>
        <div className="popup__container">
          <button
            onClick={closePopup}
            type="button"
            aria-label="Закрыть окно сообщения"
            className="popup__close-icon"
          />
          {popupInfo.ok && (
            <>
              <img alt="Успех" className="popup__image" src={successImage} />
              <h2 className="popup__title">{popupInfo.title}</h2>
            </>
          )}
          {popupInfo.error && (
            <>
              <img alt="Ошибка" className="popup__image" src={errorImage} />
              <h2 className="popup__title">{`${popupInfo.title} При входе произошла ошибка.`}</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PopupInfo;



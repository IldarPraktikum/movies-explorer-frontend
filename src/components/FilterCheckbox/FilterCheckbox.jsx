import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox({ setChecked, checked, handleClick, isCheckboxDisabled }) {
  const updateCheckboxStatus = () => {
    setChecked((prevChecked) => {
      handleClick(!prevChecked);
      return !prevChecked;
    });
  };

  return (
    <div className="filter-checkbox">
      <label>
        <input
          onChange={updateCheckboxStatus}
          checked={checked}
          disabled={isCheckboxDisabled}
          className="filter-checkbox__input"
          type="checkbox"
        />
        <span className="filter-checkbox__switch" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

FilterCheckbox.propTypes = {
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isCheckboxDisabled: PropTypes.bool,
};

export default FilterCheckbox;
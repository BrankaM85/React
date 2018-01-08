import React, {PropTypes} from 'react';

const ButtonCities = ({ city, removeItem }) => (
  <button className='button-in-input'>{city.name}
    <span onClick={() => removeItem(city.name)}>x</span>
  </button>
);

ButtonCities.propTypes = {
  city: PropTypes.object,
  onClick: PropTypes.func
};

export default ButtonCities;

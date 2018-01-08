import React, {PropTypes} from 'react';
import WeatherItem from './WeatherItem';

export function WeatherDetails (props) {
  const {cityList} = props;
  return (
    <div>
      {cityList.map(city => (
        <WeatherItem key={city.name} city={city} />
      ))}
    </div>
  )
}

WeatherDetails.propTypes = {
  cityList: PropTypes.array

};

export default WeatherDetails;

import React, {PropTypes} from 'react';

let date = new Date(),
    locale = "en-us",
    day = date.getDate(),
    month = date.toLocaleString(locale, { month: "long" }),
    dateItem = month+" "+day+"th";

const WeatherItem = ({ city }) => (

  <div className="content">
      <div className="details">
        <section>
          <p className="name"> {city.name} </p>
          <p>{dateItem}</p>
        </section>
        <section className="temp">
          <p><span className="temperature">{city.temp}</span><sup><span><sup>o</sup></span>C</sup></p>
          <p id="desc"> {city.description} </p>
        </section>
        <section>
          <p>Humidity: {city.humidity}%</p>
          <p>Wind: {city.wind}km/h</p>
        </section>

      </div>
  </div>
);

WeatherItem.propTypes = {
  city: PropTypes.object
};


export default WeatherItem;

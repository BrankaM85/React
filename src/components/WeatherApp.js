import React, {PropTypes} from 'react';
import GetWeather from '../ajax/GetWeather';
import WeatherDetails from './WeatherDetails';
import ButtonCities from './ButtonCities';
import styles from '../css/style.scss'

let cityArray = []; // Transform this.state.cities string into an arr
let submitted = false;
export default class WeatherApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: '',
      responseCities: []

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  handleInputChange(e) {
    this.setState({ cities: e.target.value });
  }

  removeItem(cityName) {
    const index = this.state.responseCities.findIndex(x => x.name === cityName);
    console.log(index);
    if (index !== -1) {
      const newResponseCities = this.state.responseCities.filter((element) =>  element.name !== cityName);
      this.setState({ responseCities: newResponseCities });
    }
  }


  handleFormSubmit(e) {
    e.preventDefault();
    submitted = true; 
    
    let str = ',';
    str=str.trim();
    let query = this.state.cities;
    let currentCity = 0;

    if (this.state.cities !== undefined) {
      if (query.includes(str)) {
        cityArray = this.state.cities.split(','); // Get an array of city names
      } else {
        cityArray[currentCity] = query;
        currentCity++; //counter to icrease index for cities in cityArray
      }
      if (cityArray.length >= 1) {
        currentCity++;

        setTimeout((function() {

          for (currentCity in cityArray) {

            GetWeather.getWeatherByCity(cityArray[currentCity])
              .then((response) => {
                this.setState({
                  responseCities: [...this.state.responseCities, {
                    name: response.name,
                    description: response.weather[0].description,
                    temp: Math.round(response.main.temp - 273.15),
                    humidity: Math.round(response.main.humidity),
                    wind: Math.round(response.wind.speed),
                  }]
                });

              })
              .catch((err) => {
                console.log('There was an error', err)
              });
          }

        }).bind(this), 100);
      }
    }
  }

onKeyDown(e){
  submitted=false;
}
  
getClass(){
    if(submitted)
      return "blur";
    else
      return "";
}

  render() {
    // Filter array for duplicated items by name, to prevent key warning in console and duplicated objects in array.
    const responseCitiesForFilter = this.state.responseCities;
    const newArrayOfUniqueValues = responseCitiesForFilter.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos;
    });
    let inputClass = this.getClass();

      return (
        <div>
          <div className="header">
            <h1>Openweather React Application</h1>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  type="text" className={inputClass}
                  placeholder="Enter city name.."
                  id="button-input" 
                  onKeyDown={this.onKeyDown}
                  onChange={this.handleInputChange}
                />
                <div className="button-in-input-div">
                  {newArrayOfUniqueValues.map(city => (
                    <ButtonCities key={city.name} city={city} removeItem={this.removeItem}/>
                  ))
                  }
                </div>

              </form>
          </div>
          <WeatherDetails cityList={newArrayOfUniqueValues}/>
        </div>
    );
  }
} //end render

const citiesShape = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  temp: PropTypes.number,
  humidity: PropTypes.number,
  wind: PropTypes.number
});

WeatherApp.propTypes = {
  cityList: PropTypes.arrayOf(citiesShape)
};

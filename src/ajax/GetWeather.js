const key = 'f22220bf980abc6924fcfb368ccbc18b',
     axios = require('axios')


const OpenWeatherRequest = {
  getWeatherByCity (locationInfo) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather/?q=${locationInfo}&APPID=${key}`)
    .then(function (response) {
    	//console.log(response.data);
    	return response.data;
 	 })
    .catch( (err) => {
      console.log('There was an error', err)
    })
  }
}



module.exports = OpenWeatherRequest


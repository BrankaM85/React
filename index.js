import React from 'react';
import ReactDOM from 'react-dom';

import WeatherApp from './src/components/WeatherApp';

import './src/css/style.scss';

const app = document.getElementById('app');

ReactDOM.render(<WeatherApp/>, app);
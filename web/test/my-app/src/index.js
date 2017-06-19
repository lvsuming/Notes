import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProvinceCityDistrict from './demo-provinceCityDistrict';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ProvinceCityDistrict />, document.getElementById('provinceCityDistrict'));
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

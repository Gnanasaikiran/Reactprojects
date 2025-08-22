import React, { Component } from 'react';
import './css/Page1.css';
import axios from 'axios';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: null,
      loading: false,
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  getWeather = () => {
    this.setState({ loading: true, error: null });
    const apiKey = '8d5086d767d7719e90739b374318e37b'; // Replace with your OpenWeatherMap API key
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}&units=metric`)
      .then((res) => {
        this.setState({ weather: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: 'Could not fetch weather data. Please check the city name and your API key.', loading: false });
        console.error("Error fetching weather data:", err);
      });
  };

  render() {
    const { weather, loading, error } = this.state;

    return (
      <div>
        <h1>Weather App</h1>
        <input type="text" placeholder="Enter City" onChange={this.handleChange} />
        <button onClick={this.getWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather && !error && (
          <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ filter, setFilter }) => {
  const [countries, setCountries] = useState([]);
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );
  const showCountry = (name) => {
    return () => {
      setFilter(name);
    };
  };

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        <CountryDetail country={countriesToShow[0]} />
        <WeatherReport country={countriesToShow[0]} />
      </div>
    );
  } else {
    return <CountriesList countries={countriesToShow} />;
  }
};

const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name}>
          {country.name}
          <button onClick={showCountry(country.name)}>Show</button>
        </p>
      ))}
    </div>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        width="128px"
        height="auto"
        alt={`Flag of ${country.name}`}
      />
    </div>
  );
};

const WeatherReport = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log(response.data.current);
        setWeather(response.data.current);
      });
  }, [country.capital]);

  return (
    <div>
      <h2>Weather in {country.name}</h2>
      <p>
        <strong>temperature: {weather.temperature}</strong> Celsius
      </p>
      <img
        src={weather.weather_icons}
        alt={`${weather.weather_descriptions[0]} weather icon`}
      />
      <p>
        <strong>wind:</strong>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Countries;

import React, { useState, useEffect } from "react";
import axios from "axios";
import thunderstorm from "../assets/thunderstorm.jpg";
import clear from "../assets/clear.jpg";
import clouds from "../assets/clouds.jpg";
import fog from "../assets/fog.jpg";
import rain from "../assets/rain.jpg";
import snowing from "../assets/snowing.jpg";
import { IoThunderstormSharp } from "react-icons/io5";
import { RiFoggyLine } from "react-icons/ri";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "4fd3b64c5f53ea593f57b9ba4d2eae59";
const CORS_Helper = "https://cors-anywhere.herokuapp.com/";
const Wetter = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [style, setStyle] = useState({});
  const [icon, setIcon] = useState();

  const changeStyle = (weather) => {
    switch (weather) {
      case "Clear":
        setStyle({ backgroundImage: `url(${clear})` });
        break;
      case "Thunderstorm":
        setStyle({ backgroundImage: `url(${thunderstorm})` });
        break;
      case "Drizzle":
        setStyle({ backgroundImage: `url(${rain})` });
        break;
      case "Rain":
        setStyle({ backgroundImage: `url(${rain})` });
        break;
      case "Snow":
        setStyle({ backgroundImage: `url(${snowing})` });
        break;
      case "Clouds":
        setStyle({ backgroundImage: `url(${clouds})` });
        break;
      default:
        setStyle({ backgroundImage: `url(${fog})` });
    }
  };

  const changeIcon = (weather) => {
    switch (weather) {
      case "Clear":
        setIcon(<i className="fas fa-sun fa-3x"></i>);
        break;
      case "Thunderstorm":
        setIcon(<IoThunderstormSharp size={50} />);
        break;
      case "Drizzle":
        setIcon(<i className="fas fa-cloud-rain fa-3x"></i>);
        break;
      case "Rain":
        setIcon(<i className="fas fa-cloud-showers-heavy fa-3x"></i>);
        break;
      case "Snow":
        setIcon(<i className="far fa-snowflake fa-3x"></i>);
        break;
      case "Clouds":
        setIcon(<i className="fas fa-cloud fa-3x"></i>);
        break;
      default:
        setIcon(<RiFoggyLine size={50} />);
    }
  };

  const apiCall = () => {
    axios
      .get(CORS_Helper + WEATHER_URL, {
        params: {
          q: query,
          appid: API_KEY,
          units: "metric",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setWeather(res.data);
        changeStyle(res.data.weather[0].main);
        changeIcon(res.data.weather[0].main);
      });
  };

  const onChangeV = (e) => {
    setQuery(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      apiCall();
    }
  };

  return (
    <div>
      <div className="container">
        <div className=" row justify-content-center">
          <div className="col-3-auto">
            <input
              className="form-control"
              type="text"
              placeholder="City"
              value={query}
              onChange={(e) => {
                onChangeV(e);
              }}
              onKeyPress={(e) => {
                onEnter(e);
              }}
            />
          </div>
        </div>
      </div>
      {weather.weather && (
        <div className="  row justify-content-center">
          <div
            style={style}
            className=" text-light wetter-card mt-4 col-3-auto  text-center border"
          >
            <h3 className="mt-5">
              {weather.name}, {weather.sys.country}
            </h3>{" "}
            <div className="mt-5">
              <h5 className="d-inline">{Math.round(weather.main.temp)}</h5>
              <sup className="d-inline">&deg;C</sup>
            </div>
            <div className="mt-5 info">{icon}</div>
            <h4 className="mt-3">{weather.weather[0].description}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wetter;

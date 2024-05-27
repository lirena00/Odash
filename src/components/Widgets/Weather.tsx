import { useSettings } from "@/contexts/SettingsContext";
import React, { useState, useEffect, use } from "react";
import { LocationIcon } from "@/components/Icons/LocationIcon";
import { WindIcon } from "@/components/Icons/WindIcon";
import { HumidityIcon } from "@/components/Icons/Humidity";

export const WeatherDimensions = {
  x: 0,
  y: 0,
  w: 5,
  h: 7,
  minW: 4,
  minH: 7,
  maxW: 7,
  maxH: 9,
};

const Weather = () => {
  const { settings } = useSettings();
  const theme = settings.theme;

  const [weather, setWeather] = useState(null);
  const format = settings.temperatureFormat;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=auto:ip`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return (
      <div
        className={`widget w-full h-full space-y-2 rounded-md p-2 ${
          theme === "dark"
            ? "dark"
            : theme === "light"
            ? "light"
            : "bg-accent text-solid-text"
        } `}
      >
        Loading...
      </div>
    );
  }

  const {
    location: { name },
    current: {
      temp_c,
      temp_f,
      condition: { text, icon },
      wind_kph,
      wind_dir,
      humidity,
      feelslike_c,
      feelslike_f,
    },
  } = weather;

  return (
    <div
      className={`widget w-full h-full space-y-2 rounded-md p-2 ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="flex gap-1 justify-between">
        <div className="items-start ">
          <p className="text-3xl">
            {format === "Fahrenheit" ? `${temp_f}°F` : `${temp_c}°C`}
          </p>
          <div className="flex gap-1">
            <p className="font-semibold">{text}</p>
            <p className="font-thin">
              | Feels like:{" "}
              {format === "Fahrenheit"
                ? `${feelslike_f}°F`
                : `${feelslike_c}°C`}
            </p>
          </div>
          <div className="space-y-1 text-lg font-thin">
            <p className="flex items-center gap-1">
              <LocationIcon />
              {name}
            </p>
            <p className="flex items-center gap-1">
              <HumidityIcon /> Humidity: {humidity}%
            </p>
            <p className="flex items-center gap-1">
              <WindIcon /> Wind: {wind_kph} kph {wind_dir}
            </p>
          </div>
        </div>
        <img src={icon} alt={text} className="h-20 w-20" />
      </div>
    </div>
  );
};

export default Weather;

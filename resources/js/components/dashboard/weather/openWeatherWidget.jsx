/**
 *
 *  @file : openWeatherWidget.jsx
 *
 * @purpose : to display current weather forecast to the user
 *
 *
 */

"use strict";

import ReactWeather, { useOpenWeather } from "react-open-weather";
import React from "react";
import ReactDOM from "react-dom";

/**
 *
 *  @function : getLocation
 *
 *  @purpose : to get the location of the user
 *
 *  @returns : <OBJECT> containing longitude and latitude
 *
 */

const GetLocation = (props) => {
    const [lat, setLat] = React.useState(0);
    const [lon, setLon] = React.useState(0);

    const showPosition = (pos) => {
        // set the lat and long to the state
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    // now lets return the lat and long in a object
    return {
        lat: lat,
        long: lon,
    };
};

/**
 *
 *  @component : WeatherWidget
 *
 *
 *  @purpose : to display the weather forecast to the user
 *
 */

export const WeatherWidget = (props) => {
    let cords = GetLocation();

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: "25a0714567bc410b5e954fab2f8d1009",
        lat: cords.lat,
        lon: cords.long,
        lang: "en",
        unit: "metric", // values are (metric, standard, imperial)
    });

    // might add a feature inorder to display the city name
    // by making a function that will reverse geo code the city.

    return (
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            locationLabel={""}
            lang="en"
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast={true}
        />
    );
};

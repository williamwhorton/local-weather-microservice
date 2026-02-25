# Local Weather Microservice

## About

This microservice provides weather information for a given location. It utilizes OpenWeatherMap API to fetch weather data and returns the current temperature, humidity, and weather description. By default, it returns the weather based on the request IP address. If given a location, it returns the weather for that location.

## Routes

- "GET /" – _Returns the current weather for the request IP address._
- "GET /:location" – _Returns the weather for the specified location._

## Environment Variables

- `OPENWEATHERMAP_API_KEY` – _OpenWeatherMap API key for accessing weather data._

## Notes

- This document is a work in progress and will be updated as the project progresses




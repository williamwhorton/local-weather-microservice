# Local Weather Microservice

## About

This microservice provides weather information. It utilizes the OpenWeatherMap API to fetch weather data, returning the current temperature, humidity, and weather description. Weather information can be retrieved by IP address or by specifying a country and zip code.

## Routes

- "GET /" – _Returns the home page._
- "GET /weather/" – _Returns the current weather for a default IP address._
- "POST /weather/" – _Returns the current weather for the IP address provided in the request body._
- "GET /weather/:country/:zip" – _Returns the current weather for the specified country and zip code._
- "GET /users/" – _Returns a listing of users (placeholder)._

## Environment Variables

- `PORT` – _The port number on which the server will run (default: 3000)._
- `NODE_ENV` – _The environment in which the application is running (e.g., development, production)._
- `OPENWEATHERMAP_API_KEY` – _OpenWeatherMap API key for accessing weather data._
- `OPENWEATHERMAP_API_BASE_URL` – _Base URL for the OpenWeatherMap One Call API._
- `OPENWEATHERMAP_GEO_API_BASE_URL` – _Base URL for the OpenWeatherMap Geocoding API._

## Notes

- This document is a work in progress and will be updated as the project progresses
- 



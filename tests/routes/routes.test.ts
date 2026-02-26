import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import * as geolocator from '../../utils/geolocator.js';
import * as getWeatherService from '../../services/getWeather.js';

jest.mock('../../utils/geolocator.js');
jest.mock('../../services/getWeather.js');

describe('Routes', () => {
  describe('GET /', () => {
    it('should redirect to /weather', async () => {
      const [ response ] = await Promise.all( [ request( app ).get( '/' ) ] );
      // @ts-ignore
      expect(response.status).toBe(302);
    });
  });

  describe('GET /weather', () => {
    it('should return weather data for the client\'s visible IP', async () => {
      const mockLatLng = { lat: 40.7128, lon: -74.0060 };
      const mockWeatherData = {
        current: {
          temp: 72,
          humidity: 45,
          pressure: 1013,
          weather: [{ description: 'clear sky' }]
        }
      };
      const expectedFormattedData = {
        temperature: 72,
        humidity: 45,
        pressure: 1013,
        description: 'clear sky'
      };


      (geolocator.findByIP as jest.Mock).mockResolvedValue(mockLatLng);
      (getWeatherService.default as jest.Mock).mockResolvedValue({ data: mockWeatherData });

      // @ts-ignore
      const response = await request(app).get('/weather').set("X-Forwarded-For", "100.16.87.171");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedFormattedData);
      expect(geolocator.findByIP).toHaveBeenCalledWith("100.16.87.171");
      expect(getWeatherService.default).toHaveBeenCalledWith({ lat: mockLatLng.lat, lon: mockLatLng.lon });
    });
  });

  describe('POST /weather', () => {
    it('should return weather data for a provided IP', async () => {
      const mockLatLng = { lat: 34.0522, lon: -118.2437 };
      const mockWeatherData = {
        current: {
          temp: 65,
          humidity: 30,
          pressure: 1015,
          weather: [{ description: 'sunny' }]
        }
      };
      const expectedFormattedData = {
        temperature: 65,
        humidity: 30,
        pressure: 1015,
        description: 'sunny'
      };

      (geolocator.findByIP as jest.Mock).mockResolvedValue(mockLatLng);
      (getWeatherService.default as jest.Mock).mockResolvedValue({ data: mockWeatherData });

      const response = await request(app)
        .post('/weather')
          // @ts-ignore
        .send({ ip: '8.8.8.8' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedFormattedData);
      expect(geolocator.findByIP).toHaveBeenCalledWith('8.8.8.8');
    });
  });

  describe('GET /weather/:country/:zip', () => {
    it('should return weather data for a country and zip', async () => {
      const mockLatLng = { lat: 51.5074, lon: -0.1278 };
      const mockWeatherData = {
        current: {
          temp: 50,
          humidity: 80,
          pressure: 1005,
          weather: [{ description: 'rain' }]
        }
      };
      const expectedFormattedData = {
        temperature: 50,
        humidity: 80,
        pressure: 1005,
        description: 'rain'
      };

      (geolocator.findByZip as jest.Mock).mockResolvedValue(mockLatLng);
      (getWeatherService.default as jest.Mock).mockResolvedValue({ data: mockWeatherData });
      const [ response ] = await Promise.all( [ request( app ).get( '/weather/uk/SW1A' ) ] );
      // @ts-ignore
      expect(response.status).toBe(200);
      // @ts-ignore
      expect(response.body).toEqual(expectedFormattedData);
      expect(geolocator.findByZip).toHaveBeenCalledWith({ country: 'uk', zip: 'SW1A' });
    });
  });

  describe('Error handling', () => {
    it('should return 500 when geolocator fails', async () => {
      (geolocator.findByIP as jest.Mock).mockRejectedValue(new Error('Geolocator failed'));

      // @ts-ignore
      const response = await request(app).get('/weather').set("X-Forwarded-For", "1.2.3.4");

      expect(response.status).toBe(500);
    });

    it('should return 500 when weather service fails', async () => {
      (geolocator.findByIP as jest.Mock).mockResolvedValue({ lat: 0, lon: 0 });
      (getWeatherService.default as jest.Mock).mockRejectedValue(new Error('Weather service failed'));

      // @ts-ignore
      const response = await request(app).get('/weather').set("X-Forwarded-For", "1.2.3.4");

      expect(response.status).toBe(500);
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const [ response ] = await Promise.all( [ request( app ).get( '/unknown-route' ) ] );
      // @ts-ignore
      expect(response.status).toBe(404);
    });
  });
});

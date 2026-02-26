import { jest } from '@jest/globals';
import axios from 'axios';
import getWeather from '../../services/getWeather.js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getWeather service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.OPENWEATHERMAP_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    process.env.OPENWEATHERMAP_API_KEY = 'test_key';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should call axios.get with correct URL and headers', async () => {
    const mockResponse = { data: { weather: 'sunny' } };
    mockedAxios.get.mockResolvedValue(mockResponse);
    const latLng = { lat: 40.7128, lon: -74.0060 };

    const result = await getWeather(latLng);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.006&units=imperial&exclude=minutely,hourly,daily,alerts&appid=test_key',
      { headers: { 'Accept': 'application/json' } }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw error if axios.get fails', async () => {
    const error = new Error('Network Error');
    mockedAxios.get.mockRejectedValue(error);
    const latLng = { lat: 0, lon: 0 };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(getWeather(latLng)).rejects.toThrow('Network Error');
    expect(consoleSpy).toHaveBeenCalledWith(error);
    consoleSpy.mockRestore();
  });
});

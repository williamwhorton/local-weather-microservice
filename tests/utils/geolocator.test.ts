import { jest } from '@jest/globals';
import axios from 'axios';
import { findByZip, findByIP } from '../../utils/geolocator.js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('geolocator util', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.OPENWEATHERMAP_GEO_API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/';
    process.env.OPENWEATHERMAP_API_KEY = 'test_key';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('findByZip', () => {
    it('should call axios.get with correct URL', async () => {
      mockedAxios.get.mockResolvedValue({ data: { name: 'New York' } });
      const zip = '10001';
      const country = 'US';
      
      await findByZip({ zip, country });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://api.openweathermap.org/geo/1.0/zip?zip=10001,US&appid=test_key'
      );
    });
  });

  describe('findByIP', () => {
    it('should call axios.get with correct URL and return data', async () => {
      const mockData = { lat: 40.7128, lon: -74.0060 };
      mockedAxios.get.mockResolvedValue({ data: mockData });
      const ip = '1.1.1.1';

      const result = await findByIP(ip);

      expect(mockedAxios.get).toHaveBeenCalledWith(`http://ip-api.com/json/${ip}`);
      expect(result).toEqual(mockData);
    });
  });
});

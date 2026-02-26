import formatResponse from '../../utils/formatResponse';

describe('formatResponse', () => {
  it('should format weather data correctly', () => {
    const mockData = {
      current: {
        temp: 72.5,
        humidity: 45,
        pressure: 1013,
        weather: [
          {
            description: 'clear sky'
          }
        ]
      }
    };

    const result = formatResponse(mockData);

    expect(result).toEqual({
      temperature: 72.5,
      humidity: 45,
      pressure: 1013,
      description: 'clear sky'
    });
  });

  it('should throw an error if data structure is unexpected', () => {
    const invalidData = {};
    expect(() => formatResponse(invalidData)).toThrow();
  });
});

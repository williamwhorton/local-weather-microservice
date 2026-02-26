const formatResponse = ( data: any ) => {
  return {
    //'data': data,
    'temperature': data.current.temp,
    'humidity': data.current.humidity,
    'pressure': data.current.pressure,
    'description': data.current.weather[0].description,
  }
};

export default formatResponse;
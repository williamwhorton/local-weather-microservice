import axios from 'axios';

export default async (latLng: { lat: any; lon: any; }) => {
  const targetURL = process.env.OPENWEATHERMAP_API_BASE_URL + `lat=${latLng.lat}&lon=${latLng.lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const headers = {
    'Accept': 'application/json',
  }
  try {
    return await axios.get( targetURL, { headers } );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
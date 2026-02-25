import axios from 'axios';

export default async (latLng: { lat: any; lon: any; }) => {
  console.log(process.env.OPENWEATHERMAP_API_KEY);
  const targetURL = process.env.OPENWEATHERMAP_API_BASE_URL + `lat=${latLng.lat}&lon=${latLng.lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const headers = {
    'Accept': 'application/json',
  }
  return axios.get(targetURL, { headers });
}
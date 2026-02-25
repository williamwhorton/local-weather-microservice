import axios from 'axios';

const findByZip = ({ zip, country }: { zip: string; country: string }) => {
  const targetURL = process.env.GEOLOCATOR_URL + `zip?zip=${zip},${country}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  return axios.get(targetURL);
};

const findByIP = async ( ip: string ) => {
  return await axios.get( `http://ip-api.com/json/${ip}` ).then( ( res ) => {
    return res.data;
  } );
}

export { findByZip, findByIP };
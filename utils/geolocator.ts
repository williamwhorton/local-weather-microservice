import axios from 'axios';

const findByZip = async ({ zip, country }: { zip: string; country: string }) => {
  const targetURL = process.env.OPENWEATHERMAP_GEO_API_BASE_URL + `zip?zip=${zip},${country}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  return await axios.get(targetURL).then( ( res ) => {
    return res.data;
  });
};

const findByIP = async ( ip: string ) => {
  return await axios.get( `http://ip-api.com/json/${ip}` ).then( ( res ) => {
    return res.data;
  } );
}

export { findByZip, findByIP };
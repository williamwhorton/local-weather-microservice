import express from 'express';
import { findByIP } from "../utils/geolocator.js";
import getWeather from "../services/getWeather.js";

const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', async (req, res) => {
  const latLng = await findByIP("100.16.87.171")
  const response = await getWeather({lat: latLng.lat, lon: latLng.lon})
  res.send(response.data);
});

export default router;

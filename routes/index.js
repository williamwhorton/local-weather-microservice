import express from 'express';
import { findByIP } from "../utils/geolocator.js";
import getWeather from "../services/getWeather.js";

const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', (req, res) => {
  const response = findByIP("100.16.87.171").then(data => {
    return getWeather({lat: data.lat, lon: data.lon})
  });
  console.log(response);
  res.json(response);
});

export default router;

import {findByIP, findByZip} from "../utils/geolocator.js";
import getWeather from "../services/getWeather.js";
import express from "express";
import formatResponse from "../utils/formatResponse.js";

const router = express.Router();

router.get('/', async (req: any, res: { send: (arg0: any) => void; }) => {
  const latLng = await findByIP("100.16.87.171")
  const response = await getWeather({lat: latLng.lat, lon: latLng.lon})
  res.send(formatResponse(response.data));
});

router.post('/', async (req: { body: { ip: string; }; }, res: { send: (arg0: any) => void; }) => {
  const latLng = await findByIP(req.body.ip)
  const response = await getWeather({lat: latLng.lat, lon: latLng.lon})
  res.send(formatResponse(response.data));
});

router.get('/:country/:zip', async (req: { params: { country: any; zip: any; }; }, res: { send: (arg0: any) => void; }) => {
  const latLng = await findByZip({country: req.params.country, zip: req.params.zip})
  const response = await getWeather({lat: latLng.lat, lon: latLng.lon})
  res.send(formatResponse(response.data));
});

export default router;


const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_MAPS_API_KEY = 'AIzaSyCd1SaDDXQRYj9ZEzwwf_QLMbdP_63MtZM';

router.get('/search', async (req, res) => {
  const { input } = req.query;
  
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAPS_API_KEY}`
    );
    res.json(response.data.predictions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar endereços', error });
  }
});

router.get('/details', async (req, res) => {
    const { placeId } = req.query;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      res.json(response.data.result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar detalhes do local', error });
    }
  });
  

module.exports = router;

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public'));

app.get('/api/overfishing-images', async (req, res) => {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=overfishing&per_page=5&client_id=${process.env.UNSPLASH_KEY}`);
  const data = await response.json();
  res.json(data);
});

app.get('/api/pollution-images', async (req, res) => {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=marine+pollution&per_page=5&client_id=${process.env.UNSPLASH_KEY}`);
  const data = await response.json();
  res.json(data);
});

app.listen(5500, () => console.log("Server running at http://localhost:5500"));

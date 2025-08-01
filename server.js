const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
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


app.get('/api/species-sightings', async (req, res) => {
  const { from, to } = req.query;

  try {
    const startYear = parseInt(from);
    const endYear = parseInt(to);
    const countsByYear = {};

    for (let year = startYear; year <= endYear; year++) {
      const response = await fetch(`https://api.obis.org/v3/occurrence?startdate=${1999}-01-01&enddate=${2025}-12-31&size=0`);
      const data = await response.json();

      countsByYear[year] = data.total || 0;
    }

    res.json(countsByYear);
  } catch (error) {
    console.error("❌ OBIS API error:", error);
    res.status(500).json({ error: "Failed to fetch OBIS data" });
  }
});

app.listen(5500, () => console.log("🌊 Server running at http://localhost:5500"));

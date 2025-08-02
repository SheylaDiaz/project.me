const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get('/api/overfishing-images', async (req, res) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=overfishing&per_page=5&client_id=${UNSPLASH_ACCESS_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching overfishing images:', error);
    res.status(500).json({ error: 'Failed to fetch overfishing images' });
  }
});

app.get('/api/pollution-images', async (req, res) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=marine+pollution&per_page=5&client_id=${UNSPLASH_ACCESS_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pollution images:', error);
    res.status(500).json({ error: 'Failed to fetch pollution images' });
  }
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

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "7py-p15q80GaspUWksKqXQ-eJWqvb7OB_mFo-b9Ol4U";

app.listen(5500, () => console.log("🌊 Server running at http://localhost:5500"))

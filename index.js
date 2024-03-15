require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


app.use(cors());

app.get('/api/locations', (req, res) => {
    // Load your locations data from a database or file
    const locations = require('./addresses.json');
    res.json(locations);
});

app.get('/api/maps-api-key', (req, res) => {
    res.json({ key: process.env.MAPS_API_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

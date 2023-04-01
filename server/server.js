const express = require('express');
const fetch = require('node-fetch').default;
require('dotenv').config();

const app = express();

app.get('/api/summoner/:name', async (req, res) => {
    let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=${process.env.API_KEY}`

    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    });

    const data = await response.json();

    res.json(data);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
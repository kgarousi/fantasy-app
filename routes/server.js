const express = require("express");
const axios = require("axios")
const app = express();
const path = require("path");
require("dotenv").config()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const SPORTS_RADAR_KEY = process.env.SPORTS_RADAR_KEY
const PORT = process.env.PORT


app.listen(PORT, () =>{
    console.log("App Listening on Port 3000")
})

app.get('/', (req, res) => {
    // Calculate the path to 'index.html' located in 'views' directory at the root
    const filePath = path.resolve(__dirname, '..', 'views', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        }
    });
});


app.get('api/players', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);

        const players = response.data
        console.log(players)
        const receivers = players
        .filter(player => player.Position === "WR") // Filter to get only WRs
        .map(player => ({
            firstName: player.FirstName,
            lastName: player.LastName
        })); 

        res.json(receivers)

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});
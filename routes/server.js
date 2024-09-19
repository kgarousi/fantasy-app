const express = require("express");
const axios = require("axios")
const app = express();
const cors = require("cors")
require("dotenv").config()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const SPORTS_RADAR_KEY = process.env.SPORTS_RADAR_KEY
const PORT = process.env.PORT


app.listen(PORT, () =>{
    console.log("App Listening on Port 5000")
})

app.get('/api/players/receivers', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);
        const players = response.data

        const receivers = players
        .filter(player => player.FantasyPosition === "WR" && player.Status != "Inactive") // Filter to get only WRs
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

app.get('/api/players/runningbacks', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);
        const players = response.data

        const runningBacks = players
        .filter(player => player.FantasyPosition === "RB" && player.Status != "Inactive") // Filter to get only RBs
        .map(player => ({
            firstName: player.FirstName,
            lastName: player.LastName,
            team: player.Team
        })); 

        res.json(runningBacks)

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/players/quarterbacks', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);

        const players = response.data

        const quarterBacks = players
        .filter(player => player.FantasyPosition === "QB" && player.Status != "Inactive") // Filter to get only RBs
        .map(player => ({
            firstName: player.FirstName,
            lastName: player.LastName,
            team: player.Team
        })); 

        res.json(quarterBacks)

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
})

app.get('/api/players/tightends', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);

        const players = response.data

        const tightEnds = players
        .filter(player => player.FantasyPosition === "TE" && player.Status != "Inactive") // Filter to get only RBs
        .map(player => ({
            firstName: player.FirstName,
            lastName: player.LastName,
            team: player.Team
        })); 

        res.json(tightEnds)

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
})

app.get('/api/players', async (req, res) => {
    try {
        // Construct the URL with the API key
        const url = `https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=${SPORTS_RADAR_KEY}`;

        // Make the GET request using axios
        const response = await axios.get(url);

        const players = response.data

        const allPlayers = players
        .filter(player => (player.FantasyPosition === "WR" || player.FantasyPosition === "QB" || player.FantasyPosition === "TE") && player.Status != "Inactive") // Filter to get only WRs
        .map(player => ({
            firstName: player.FirstName,
            lastName: player.LastName,
            team : player.Team,
            position: player.FantasyPosition
        })); 

        res.json(allPlayers)

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});
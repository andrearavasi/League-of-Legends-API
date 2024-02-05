import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();
var port = 3000;

var url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
var apikey = 'RGAPI-ab8173f0-43c2-4c60-a60c-689105e83f9b';
var summonerName = '';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/submit', (req, res) => {
    res.send("<h1>Your summoner name is:<br> submit ok <br>" + req.body.summonerName);
    let data = getUser(req.body.summonerName);
    getEntries(data.id);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

async function getUser(summonerName) {
    try {
        const response = await axios.get(url + summonerName + '?api_key=' + apikey);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data.summonerLevel); //Expected: 534
            console.dir(response.data);
            return response.data;
        }
        else console.log(response.status);
    } catch (error) {
        console.error('Request error');
        return error;
    }
}

async function getEntries(encryptedId) {
    try {
        const response = await axios.get(url + encryptedId + '?api_key=' + apikey);
        if (response.status === 200) {
            console.dir(response.data);
            return response.data;
        }
        else console.log(response.status);
    } catch (error) {
        console.error('Request error');
        return error;
    }
}
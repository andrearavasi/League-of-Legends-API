import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();
var port = 3000;

var url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
var apikey = 'RGAPI-7470ec64-8a81-4245-8b58-3f2b06d27c90';
var summonerName = '';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/submit', (req, res) => {
    res.send("<h1>Your summoner name is:<br> submit ok <br>" + req.body.summonerName);
    getUser(req.body.summonerName);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function getUser(summonerName) {
    let data = {
        'summonerName': summonerName
    }
    let headers = {
        'summonerName': summonerName
    }

    try {
        const response = await axios.get(
            url, {
            data,
            headers: {}
        }
        );
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data.summonerLevel);
        }
        else console.log(response.status);
    } catch (error) {
        console.error('Request error');
        return error;
    }
}
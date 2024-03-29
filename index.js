import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();
var port = 3000;

var url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
var apikey = 'RGAPI-42322a82-4843-481f-a400-60718182035e';
var summonerName = '';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/submit', (req, res) => {
    // console.log(req.body.summonerName);
    res.send("<h1>Your summoner name is:<br> submit ok <br>" + req.body.summonerName);
    getUser(req.body.summonerName);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function getUser(summonerName) {
    var config = {
        params: { "name": summonerName, "X-Riot-Token": apikey },
    };


    try {
        const response = await axios.get(url, {
            params:
            {
                name: summonerName, api_key: apikey,
            }
        }
        );
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data.summonerLevel);
        }
        else
            console.log(response.status);
    } catch (error) {
        console.error('Errore nella richiesta');
        // console.error(error);
    }
}
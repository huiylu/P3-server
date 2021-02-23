const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring')

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret

var headers = {
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')), //Basic <base64 encoded client_id:client_secret>
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const data = {
  grant_type: 'client_credentials',
  client_id: client_id,
  client_secret: client_secret
}

//get route to display the searched songs
router.get('/', (req, res) => {
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data),headers)
    .then(response => {
      var token = response.data.access_token;
      console.log(response.data)
      
        headers ={headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
        axios.get(`https://api.spotify.com/v1/search?q=${req.body.search}&type=track&market=US&limit=10&offset=5` ,headers)
        .then (response => {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', (response.data));
          res.json({
            name: response.data.tracks.items[0].album.name,
            uri: response.data.tracks.items[0].album.uri
          })
        }).catch(err => {
          if (err) {
            console.error(`WE HAVE AN ERROR IN THE AXIOS Get`+ err);
          }
        })
        
    }).catch(err => {
      if (err) {
        console.error(`WE HAVE AN ERROR IN THE AXIOS CALL`+ err);
      }
    })
});


module.exports = router;
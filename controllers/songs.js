const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');
const axios = require('axios');

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret

// your application requests authorization
var authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) //Basic <base64 encoded client_id:client_secret>
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };


//get route to display the searched songs
router.get('/', (req, res) => {
    axios(authOptions)
    .then(res => {
      var token = res.access_token;
      console.log(res.data)
      var options = {
                    //TODO use the form and string interpolation to get the artist and track (q, type, artist?)
        
        url: `https://api.spotify.com/v1/search?q=${req.body.data}&type=track%2Cartist&market=US&limit=10&offset=5`,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest:  [(data, headers) => {
          return data;
        }]
        };
        axios.get(options)
        .then (res => {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', (res.body));
        })
    }).catch(err => {
      if (err) {
        console.error(`WE HAVE AN ERROR IN THE AXIOS CALL\n${err}`)
      }
    })


    // request.post(authOptions, function(error, response, body) {
    //     if (!error && res.statusCode === 200) {

    //         // use the access token to access the Spotify Web API
            // var token = body.access_token;
    //         var options = {
    //             //TODO use the form and string interpolation to get the artist and track (q, type, artist?)
    //         url: `https://api.spotify.com/v1/search?q=${req.body.data}&type=track%2Cartist&market=US&limit=10&offset=5`,
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         json: true
    //         };
    //         request.get(options, function(error, res, body) {
    //         console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', body);
    //         res.json(body);
    //         });
    //     }
    // })
});


module.exports = router;
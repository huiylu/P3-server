const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring')

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var token

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
<<<<<<< HEAD
  console.log(querystring.stringify(data));
  console.log(headers);
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data),headers)
    .then(response => {
      var token = response.data.access_token;
      let returnSearch = Object.values(req.query)
      console.log('🔥', returnSearch)
      
        headers ={headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
        axios.get(`https://api.spotify.com/v1/search?q=${returnSearch}&type=track&market=US&limit=10&offset=5` ,headers)
        .then (response => {

          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', (response.query));
        
          //must have .album.name or .album.uri

          res.json({
            song: response.data.tracks.items
          })
        }).catch(err => {
          if (err) {
            console.error(`WE HAVE AN ERROR IN THE AXIOS Get `+ err);
          }
        })
        
    }).catch(err => {
      if (err) {
        console.error(`WE HAVE AN ERROR IN THE AXIOS CALL `+ err);
      }
      
    })
});
=======
  console.log(req.query);
  if (!token) {
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), headers)
      .then(response => {
        token = response.data.access_token;
        let returnSearch = Object.values(req.query)[0]
        console.log('🔥', returnSearch)

        headers = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }})} else {
          axios.get(`https://api.spotify.com/v1/search?q=${returnSearch}&type=track&market=US&limit=10&offset=5`, headers)
            .then(response => {
  
              console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', (response.query));
  
              //must have .album.name or .album.uri
  
              res.json({
                song: response.data.tracks.items
              })
            }).catch(err => {
              if (err) {
                console.error(`WE HAVE AN ERROR IN THE AXIOS Get` + err);
              }
            })}
  
          }).catch(err => {
          if (err) {
            console.error(`WE HAVE AN ERROR IN THE AXIOS CALL` + err);
            console.log('ERROR MESSAGE CONSOLE LOG', err.message)
          }
        })

>>>>>>> c5d77b94ad3fd090d65935244b0f3f923a5f3cf1


module.exports = router;
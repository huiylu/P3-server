const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring')
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var token;
var returnSearch;
var headers;

const data = {
  grant_type: 'client_credentials',
  client_id: client_id,
  client_secret: client_secret
}
//get route to display the searched songs
router.get('/', (req, res) => {
  let queryValues = Object.values(req.query)
  console.log('⏱', token)
  console.log(queryValues[1])
  if (queryValues[1] === 'Arthur') {
    headers = {
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')), //Basic <base64 encoded client_id:client_secret>
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), headers)
    .then(response => {
      token = response.data.access_token;
      returnSearch = queryValues[0]
      console.log('🔥', returnSearch)
      console.log(token)
      headers = {headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
      })
      console.log('https://accounts.spotify.com/api/token', querystring.stringify(data), headers)
      console.log(headers)
      axios.get(`https://api.spotify.com/v1/search?q=${returnSearch}&type=track&market=US&limit=10&offset=5`, headers)
      .then(response => {
        console.log('🌎', token)
        res.json({
          song: response.data.tracks.items,
          spotifyToken: token
        })
      }).catch(err => {
        if (err) {
          console.error(`🧤WE HAVE AN ERROR IN THE AXIOS Get`, err);
        }
    }).catch(err => {
      if (err) {
        console.error(`🐶WE HAVE AN ERROR IN THE AXIOS CALL`, err);
      }
  })
    } else {
      console.log('🌎', token)
      returnSearch = queryValues[0]
      headers ={headers: {
        'Authorization': 'Bearer ' + queryValues[1],
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
        axios.get(`https://api.spotify.com/v1/search?q=${returnSearch}&type=track&market=US&limit=10&offset=5` , headers)
        .then (response => {
          // console.log('🦀', (response.query));
          //must have .album.name or .album.uri
          res.json({
            song: response.data.tracks.items,
            spotifyToken: token
          })
        }).catch(err => {
          if (err) {
            console.error(`WE HAVE AN ERROR IN THE SECOND AXIOS Get`+ err);
          }
        }).catch(err => {
      if (err) {
        console.error(`WE HAVE AN ERROR IN THE AXIOS CALL`+ err);
      }
    })
  }
});
module.exports = router;
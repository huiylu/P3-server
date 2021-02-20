const express = require('express');
const db = require('../models');
const router = express.Router();

//get route displays the playlists
router.get('/playlist', (req, res) => {
    res.json({ message: 'PLAYLIST POST'});
});

//post route allows you to create a new playlist
router.post('/playlist', (req, res) => {

});


//get route that displays the individual playlist
router.get('/playlist/:id', (req, res) => {

});

//put route that allows you to  update the individual playlists
router.put('/playlist:id', (req, res) => {

});

//get route that lets you edit the playlist (name etc)
router.get('/playlist/:id', (req, res) => {

});

//delete rout lets you delete a playlist
router.delete('/playlist/:id', (req, res) => {

})


module.exports = router;
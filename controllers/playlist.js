const express = require('express');
const db = require('../models');
const router = express.Router();

//get route displays the playlists
router.get('/', (req, res) => {
    res.json({ message: 'PLAYLIST GET'});
});

//post route allows you to create a new playlist
router.post('/', (req, res) => {
    res.json({ message: 'PLAYLIST POST'});
});


//get route that displays the individual playlist
router.get('/:id', (req, res) => {
    res.json({ message: 'PLAYLIST ID POST'});
    //find the user by id : findById()
    
});

//put route that allows you to  update the individual playlists
router.put('/:id', (req, res) => {
    res.json({ message: 'PLAYLIST ID UPDATE'});
});

//get route that lets you edit the playlist (name etc)
router.get('/:id', (req, res) => {
    res.json({ message: 'PLAYLIST ID EDIT'});
});

//delete rout lets you delete a playlist
router.delete('/:id', (req, res) => {
    res.json({ message: 'PLAYLIST ID DELETE'});
})


module.exports = router;
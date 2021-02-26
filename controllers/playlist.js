const express = require('express');
const db = require('../models');
const router = express.Router();
const Playlist = require('../models/playlist');
const { findById } = require('../models/playlist');

//get route displays the playlists
router.get('/', (req, res) => {
    // res.json({ message: 'PLAYLIST GET'});
    Playlist.find({}, (err, playlists) => {
        if(err) {
            console.error(`Index route is not working for playlists\n${err}`);
            res.status(500).json({error: `ERROR in the playlists' INDEX ROUTE`})
        }
        res.json({playlists})
    })
});

//post route allows you to create a new playlist
router.post('/', (req, res) => {
    // res.json({ message: 'PLAYLIST POST'});

    Playlist.create(req.body) 
    .then(playlist => {
        console.log(playlist)
        res.json(playlist)
    }).catch(err => {
        console.log(err)

    })
});


//get route that displays the individual playlist
router.get('/:id', (req, res) => {
    // res.json({ message: 'PLAYLIST ID POST'});
    //find the user by id : findById()
    Playlist.findById(req.params.id, (err, playlist) => {
        if(err) {
            console.error(`Error in the GET ID for playlists\n${err}`);
            res.status(500).json({error: `Error in the Detail ROUTE for playlists`});
        }
        res.json({playlist});
    })
});

//put route that allows you to  update the individual playlists
router.put('/:id', (req, res) => {
    // res.json({ message: 'PLAYLIST ID UPDATE'});
    Playlist.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, playlist) => {
            if(err) {
                console.error(`Error in the UPDATE ROUTE for PLAYLISTS\n${err}`);
                return res.status(500).json({error: `Error in the UPDATE ROUTE for PLAYLISTS`})
            }
            res.json({playlist})
        }
    )
});

//delete rout lets you delete a playlist
router.delete('/:id', (req, res) => {
    console.log(req.params.id, '👻')
    Playlist.findByIdAndDelete(req.params.id, (err, playlist) => {
        if(err) {
            console.error(`ERROR in the playlist DELETE ROUTE\n${err}`);
            res.status(500).json({error: `ERROR in the playlists DELETE ROUTE`});
        }
        console.log(playlist, '$$$$$$')
        console.log(req.params._id, '%%%%%%%')
        console.log(req.body.id)
        console.log(req.body.i)
        console.log(req.body)
        console.log(req.params)
        console.log(req.params.title)
        console.log(req.params.id)
        // res.json({deletedPlaylist: playlist})
    })
})


module.exports = router;
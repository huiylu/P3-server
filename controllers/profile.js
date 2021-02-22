const express = require('express');
const db = require('../models');
const router = express.Router();
const User = require('../models/user');
const {findById} = require('../models/user');

//get route that show the persons profile
router.get('/:_id', (req, res) => {
    // res.json({ message: 'PROFILE POST'});
    //find the user by id : findById()
    User.findById(req.params.id, (err, user) => {
        if(err) {
            console.error(`Error in the GET ID for playlists\n${err}`);
            res.status(500).json({error: `Error in the Detail ROUTE for playlists`});
        }
        res.json({user});
    })
    
});

//put route that lets you update personal details
router.put('/:id', (req, res) => {

});


//delete route in case you want to delete your profile
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if(err) {
            console.error(`ERROR in the playlist DELETE ROUTE\n${err}`);
            res.status(500).json({error: `ERROR in the playlists DELETE ROUTE`});
        }
        res.json({deletedUser: user})
    })
});

module.exports = router;
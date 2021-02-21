const express = require('express');
const db = require('../models');
const router = express.Router();

//get route that show the persons profile
router.get('/:id', (req, res) => {
    res.json({ message: 'PROFILE POST'});
    //find the user by id : findById()

    
});

//put route that lets you update personal details
router.put('/:id', (req, res) => {

});


//delete route in case you want to delete your profile
router.delete('/:id', (req, res) => {

});

module.exports = router;
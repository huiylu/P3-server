const express = require('express');
const db = require('../models');
const router = express.Router();

//get route that show the persons profile
router.get('/profile/:id', (req, res) => {
    res.json({ message: 'PROFILE POST'});
});

//put route that lets you update personal details
router.put('/profile/:id', (req, res) => {

});


//delete route in case you want to delete your profile
router.delete('profile/:id', (req, res) => {

});

module.exports = router;
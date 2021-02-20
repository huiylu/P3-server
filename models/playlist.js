const mongoose = require('mongoose');

const options = {
    timestamps: true
}

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    songs: {
        type: [songSchema]
    },

}, options)

module.exports=mongoose.model('Playlist', playlistSchema);


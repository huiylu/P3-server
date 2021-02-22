require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Spotify Api Home"});
});


// Controllers
app.use('/api', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'))
app.use('/playlist', require('./controllers/playlist'))
app.use('/songs', require('./controllers/songs'))


app.listen(process.env.PORT || 3001, () => 
  console.log(`🎧 You're listening to the smooth sounds of Port ${process.env.PORT || 3001}`)
);
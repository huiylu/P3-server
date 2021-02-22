require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const jwt = require('jsonwebtoken');

// Construct the Strategy
const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const findUser = (jwt_payload, done) => {
  db.User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(done)
}

const strategy = new Strategy(options, findUser);

// Register the strategy so passport uses it when we call `passport.authenticate()` in our routes

// initialize passport
passport.use(strategy);
passport.initialize();

const createUserToken = (req, user) => {
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if(!user ||!validPassword){
      const err = new Error('Invalid')
      err.statusCode=422;
      throw err
  } else {
      const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          {expiresIn: '2m'}
      )
      return token;
  }
}

module.exports = {
  createUserToken
}
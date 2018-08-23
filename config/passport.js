const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const Shelter = mongoose.model('Shelter');
const secretOrKey = require('./jwtsecret').keyOrSecret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
    try {
      const shelter = await Shelter.findById(jwt_payload.id);

      return shelter ? done(null, shelter) : done(null, false)

    } catch (e) {
      console.log(`Error --> ${e}`)
    }
  }))
}
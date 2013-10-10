var FitbitStrategy = require('passport-fitbit').Strategy

var FITBIT_CONSUMER_KEY = "enter consumer key"
var FITBIT_CONSUMER_SECRET = "enter consumer secret"

module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(obj,done){
    done(null,obj);
  });

  passport.use( new FitbitStrategy({
    consumerKey: FITBIT_CONSUMER_KEY,
    consumerSecret: FITBIT_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/fitbit/callback"
  },
  function(token, tokenSecret, profile, done){
    process.nextTick(function() {
      return done(null,profile);
    });
  }
  ));
};

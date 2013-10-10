var FitbitStrategy = require('passport-fitbit').Strategy

var FITBIT_CONSUMER_KEY = "41761c360ad347159e6e6a18969eb328"
var FITBIT_CONSUMER_SECRET = "99a6f19cb2df44428ec27c9451f5392a"

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

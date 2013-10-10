
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport-config')(passport)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {user: req.user});
})

app.get('/account', ensureLoggedIn('/'), function(req, res){
  res.render('account', {user: req.user});
})

app.get('/login', function(req, res){
  res.render('login', {user: req.user});
});

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});



app.get('/auth/fitbit',
        passport.authenticate('fitbit')
);

app.get('/auth/fitbit/callback',
        passport.authenticate('fitbit', {failureRedirect:'/login'}),
        function(req,res){
          res.redirect('/');
        });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

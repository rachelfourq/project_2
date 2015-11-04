var express = require('express');
var bodyParser = require('body-parser')
var db = require('./models')
var passport = require('passport');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var strategies = require('./config/strategies');
var LocalStrategy = require('passport-local').Strategy;
//update with layout.ejs page 
var app = express(); 

app.set('view engine', 'ejs'); 

app.get('/test', function(req, res){
	res.render('test.ejs');
})

app.use(ejsLayouts); 
app.use(express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req,res,next){
 // req.session.user = 6;
 if(req.session.user){
   db.user.findById(req.session.user).then(function(user){
   req.currentUser = user
   next();
 });
 }else{
   req.currentUser = false;
   next();
 }
});

app.use(passport.initialize());
app.use(passport.session());

//uses serializers for Provider-server comm
passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

//use the auth for either local or facebook 
passport.use(strategies.localStrategy);
passport.use(strategies.facebookStrategy);

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use('/', require('./controllers/main'));

app.use('/wineList', require('./controllers/wineList'))

app.use('/favorites', require('./controllers/favorites'))


app.listen(process.env.PORT || 3000)




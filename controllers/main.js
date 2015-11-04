var express = require('express');
var db = require('./../models')
var request = require('request');
var passport = require('passport');
var router = express.Router();

//splashpage
router.get('/', function(req, res) {
	res.render('index');
});

//login
router.get('/logIn', function(req, res) {
		res.render('logIn', {alerts:req.flash()});
	})

router.post('/logIn',function(req,res){
  passport.authenticate('local', function(err, user, info) {
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in.');
        res.redirect('/profile');
      });
    } else {
      req.flash('danger', 'Error');
      res.redirect('/logIn');
    }
  })(req, res);
});

//sign up
router.get('/signUp', function(req, res) {
		res.render('signUp', {alerts:req.flash()});
	})

router.post('/signUp', function(req, res){
	console.log(req.body);
    if (req.body.password != req.body.password2) {
      req.flash('danger', 'Passwords do not match');
      res.redirect('/signup');
    } else {
      db.user.findOrCreate({
        where: {
        	email: req.body.email,
        	password: req.body.password,
        	name: req.body.name
        },
      }).spread(function(user, created) {
        if (created) {
          req.login(user, function(err) {
            if (err) throw err;
            req.flash('success', 'You are signed up and logged in.')
            res.redirect('/profile');
          });
        } else {
          req.flash('danger', 'A user with that e-mail address already exists.');
          res.redirect('/signUp');
        }
      }).catch(function(err) {
        req.flash('danger','Error');
        res.redirect('/profile');
      });
    }
  });

//logout button
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});


router.get('/logIn/:provider', function(req, res) {
  passport.authenticate(
    req.params.provider,
    {scope: ['public_profile', 'email']}
  )(req, res);
});

//facebook OAuth
router.get('/callback/:provider', function(req, res) {
  passport.authenticate(req.params.provider, function(err, user, info) {
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in with ' + req.params.provider);
        res.redirect('/profile');
      });
    } else {
      req.flash('danger', 'Error');
      res.redirect('/logIn');
    }
  })(req, res);
});

//logout btn
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

router.get('/profile', function(req, res) {
  // console.log("working" + req.user.id)
	if(req.user) {
  db.favorite.findAll( {
    where: {
      userId: req.user.id
    }
  }).then(function(data){
    res.render("profile", {data: data})
    // res.send(data)
  })

	}else {
	res.send("You're not logged in");
}
})



module.exports = router;
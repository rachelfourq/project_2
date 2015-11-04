var express = require('express');
var db = require('./../models')
var request = require('request');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
	db.favorite.findAll().then(function(data){
		res.render('favorites', {data : data})
	})
});

router.post('/', function(req, res) {
	var addedFave = req.body;
	// res.send(req.body)
	db.favorite.findOrCreate({
		where:{wineId: addedFave.wineId},
		defaults: {
			title: addedFave.wineName,
			price: addedFave.price,
			image: addedFave.image,
			userId: addedFave.currentUser
		}
}).spread(function(data, created){
		res.redirect('/profile')
	})
})

module.exports = router;
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
	db.favorite.findOrCreate({
		where:{
		wineId: addedFave.wineId,
	}}).spread(function(data, created){
		res.redirect('/favorites')
	})
})


module.exports = router;
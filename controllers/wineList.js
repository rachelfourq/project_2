var express = require('express');
var db = require('./../models')
var request = require('request');
var passport = require('passport');
var router = express.Router();


router.post('/', function(req, res){
	request(
		"http://services.wine.com/api/beta2/service.svc/JSON/catalog?search=" + req.body.s + "&apikey=" + process.env.WINE_KEY,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render ("wineList", {data: data});
			};
		}	
	);
});

router.get('/:id', function(req, res){
	request(
		"http://services.wine.com/api/beta2/service.svc/JSON/catalog?search=" + req.params.id + "&apikey=" + process.env.WINE_KEY,
		function(error, response, body) {
			if (!error) {
				var data = JSON.parse(body);
				res.render ("linkedWine", {data: data});
			}
		}
	)
});

// router.post('/favorites', function(req, res) {
// 	var addedFave = req.body;
// 	db.favorite.findOrCreate({
// 		where:{
// 		wineId: addedFave.wineId,
// 		title: addedFave.name,
// 	}}).spread(function(data, created){
// 		res.redirect('/favorites', {data: data})
// 	})
// })



module.exports = router;
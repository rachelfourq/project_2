var express = require('express');
var db = require('./../models')
var request = require('request');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser')
var cloudinary = require('cloudinary');
//specific wine page
router.get('/:id', function(req, res) {
	var userPic = cloudinary.url(req.user.pic, { width: 150, height: 150, crop: 'thumb', gravity: 'face',radius: 'max' })
	var id = req.params.id;
	db.favorite.findById(id).then(function(data){
		db.comment.findAll({
			where: {
				favoriteId: id
			}
		}).then(function(comments){
			res.render('favorites.ejs', {data: data, comments: comments, userPic: userPic})
		})
	})
})

router.post('/', function(req, res) {
	var addedFave = req.body;
	// res.send(req.body)
	db.favorite.findOrCreate({
		where:{wineId: addedFave.wineId},
		defaults: {
			title: addedFave.wineName,
			price: addedFave.price,
			image: addedFave.image,
			userId: req.user.id
		}
}).spread(function(data, created){
		res.redirect('/profile')
	})
})

//add comment
router.get('/', function(req, res) {
	var id = req.params.id;
	db.comment.findById(id).then(function(data){
		res.render('favorites.ejs', {data: data})
	})
})
router.post('/comment', function(req, res) {
	var addedComment = req.body;
	console.log(addedComment);
	console.log(req.params.id);
	db.comment.create({
			favoriteId: parseInt(addedComment.favoriteId),
			userId: addedComment.userId,
			// rating: addedComment.rating,
			text: addedComment.text,
			userId: req.user.id
}).then(function(data){
		res.redirect('/favorites/' + addedComment.favoriteId)
	})
})



module.exports = router;
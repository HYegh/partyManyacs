const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
require('../models/user.schema');
require('../models/user_wish.schema');

// cloudinary

const Users = mongoose.model('users');
const Wishes = mongoose.model('user_wishes');

const multipartMiddleware = multipart();

// Cloudinary configuration
cloudinary.config({
  cloud_name: "simplytech",
  api_key: "268378479921889",
  api_secret: "_H2EcUX8KPYSX1XdglB55iR-d24",
});

router.post('/profileImg/:id', multipartMiddleware, (req, res) => {
  // Upload image
  cloudinary.v2.uploader.upload(req.files.image.path, {}, function(
    error,
    result
  ) {
    if (error) {
      return res.status(500).send(error);
    }
    
	Users.findOneAndUpdate({
    ClientId: req.params.id
      },
      { $set: { image: result.secure_url }
	  }, {runValidators: true}, function(err, newTodo) {
	      if (err) {
	        res.send('error');
	      } else {
	        res.json(newTodo)
	      }
	  });	
  });
});

router.post('/updateWishImg/:wishId', multipartMiddleware, (req, res) => {
  cloudinary.v2.uploader.upload(req.files.image.path, {}, (err, result)=> {
     console.log(req.files.image.path);

    if (err) return res.status(500).send(err);
    Wishes.findOneAndUpdate({_id: req.params.wishId}, {$set: {
      imageURL: result.secure_url
    }}, {runValidators: true}, (err, wish) => {
      if (err) {
        res.send('error');
      } else {
        res.json(wish);
      }
    } )
  })
})

module.exports = router;
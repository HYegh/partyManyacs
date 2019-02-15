const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Users = mongoose.model('users');

router.post('/update/:id', (req, res) => {
  Users.findOneAndUpdate({
      ClientId: req.params.id
      },
      { $set: { 
      	fullName: req.body.fullName,
      	phoneNumber: req.body.phoneNumber,
      	gender: req.body.gender
      }
  }, {runValidators: true}, function(err, data) {
      if (err) {
        res.send('error');
      } else {
        res.json(data)
      }
  });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Wishes = mongoose.model('user_wishes');
const PartyWishes = mongoose.model('party_wish');

router.post('/getData', (req, res) => {
  Wishes.find({user_id: req.body.id})
    .exec((err, all) => {
      if(err){
        res.send('error')
      } else {
        res.json(all)
      }
    })
})

router.post('/addData', (req, res) => {
  const newWishObj = new Wishes(req.body);
  newWishObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(newWishObj);
  })
})

router.delete('/delete/:wishId', (req, res) => {
  const { wishId } = req.params;
  Wishes.findOneAndRemove({_id: wishId}, (err, wish) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(wish);
  })
})

router.post('/update/:wishId', (req, res) => {
  const { wishId } = req.params;
  const updatedName = req.body.name;
  Wishes.findOneAndUpdate({_id: wishId}, {name: updatedName}, (err, wish) => {
    if (err) return res.send(err);
    return res.status(200).json(wish)
  });
})

router.post('/checkedWish', (req, res) => {
  let clientId=""
  if(req.body.checked === true){
    clientId = req.body.clientId
  }else{
    clientId  = ""
  }
  PartyWishes.findOneAndUpdate({wish_id: req.body.id, party_id: req.body.party_id}, {$set: {
    selected: req.body.checked,
    selectedUser: clientId
  }}, (err, all) => {
    if (err) return res.send(err);
    return res.status(200).json(all)
  });
})



module.exports = router;
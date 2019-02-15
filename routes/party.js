const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Parties = require('../models/party.schema')

//models
const Users = mongoose.model('users');
const Party = mongoose.model('parties');
const PartyGuests = mongoose.model('party_guests');
const PartyWishes = mongoose.model('party_wish');
const UserWishSchema = mongoose.model('user_wishes');


// returns current user parties
router.post('/getData', (req, res) => {
	Party.aggregate([
  	{ $match: { user_id: req.body.id } },
  ]).exec(function ( err, result ) {  
    res.send(result)
  })
})

// returns current party
router.post('/getCurrentParty', (req, res) => {
  Party.aggregate([
  	{ $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
  ]).exec(function ( err, result ) {     
    res.send(result)
  })
})

//returns wishes in current party
router.post('/getCurrentWishes', (req, res) => {
  PartyWishes.aggregate([
    { $match: { party_id: mongoose.Types.ObjectId(req.body.id) } },
    { $lookup: { from: 'user_wishes', localField: 'wish_id', foreignField: '_id', as: 'wishes' } },
    { $group: { 
      _id: "$party_id", 
      selected: {$push: "$selected"}, 
      selectedUser: {$push: "$selectedUser"}, 
      wishes: {$push: "$wishes"} 
    } },
  ]).exec(function ( err, result ) { 
    if(result.length !== 0 ){
      // console.log(result)
      result = result[0]['wishes'].reduce((acm, item, index) => {
        if(item[0]){
          item[0].selected = result[0]["selected"][index]
          item[0].selectedUser = result[0]["selectedUser"][index]
        }
        acm[acm.length] = item
        return acm
      },[])  
    } 
    res.send(result)
  })
})


// returns guests in current party
router.post('/getCurrentGuests', (req, res) => {
  PartyGuests.aggregate([
  	{ $match: { party_id: mongoose.Types.ObjectId(req.body.id) } },
  	{ $lookup: { from: 'users', localField: 'guests_email', foreignField: 'email', as: 'guests' } },
  	{ $group: { _id: "$party_id", guests: {$push: "$guests"} } },
  ]).exec(function ( err, result ) {
	  if(result.length !== 0 ){
	  		result = result[0]['guests'].reduce((acm, item) => {
	  		acm[acm.length] = item
	  		return acm
	  	},[])   
	  }
    res.send(result)
  })
})

// returns current user invited parties
router.post('/invitedParties', (req, res) => {	
  PartyGuests.aggregate([
  	{ $match: { guests_email: req.body.email } },
  	{ $lookup: { from: 'parties', localField: 'party_id', foreignField: '_id', as: 'parties' } },
  	{ $group: { _id: "$guests_email", party: {$push: "$parties"} } }
  ]).exec(function ( err, result ) {  
   if(result.length !== 0 ){   
  	result = result[0]['party'].reduce((acm, item) => {
  		acm[acm.length] = item
  		return acm
  	},[])  
  }
    res.send(result)
  })
})

// returns users for search time 
router.post('/searchUsers', (req, res) => {	
  Users.aggregate([
  	{ $project: { fullName: { $toLower: "$fullName" }, email: "$email", image: "$image", ClientId: "$ClientId" } },
  	{ $match: { fullName: {$regex: ".*" + req.body.name + ".*"} } },
  ]).exec(function ( err, result ) {
    res.send(result)
  })
})

//returns current invited party inviter
router.get('/inviter/:id', (req, res) => {
  Users.aggregate([
  	{ $match: { ClientId: req.params.id } },
  ]).exec(function ( err, result ) {  
    res.send(result)
  })
})

//adding party data to database
router.post('/addData', (req, res) => {
	const data=req.body
  const newPartyObj = new Party({ ...data });
  newPartyObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(newPartyObj);
  })
})

//adding wishes in party
router.post('/addWishes', (req, res) => {
  req.body.wishes.forEach(wish => {
		const newParty_wishes = new PartyWishes({
			party_id: req.body.party_id,
			wish_id: wish
		})
		newParty_wishes.save(err => {
	    if (err) return res.status(500).send(err);
	  })
	})
	return res.status(200).send([]);
})

//adding guests in party
router.post('/addGuests', (req, res) => {
    req.body.emails.forEach(email => {
			const newParty_wishes = new PartyGuests({
				party_id: req.body.party_id,
				guests_email: email
			})
			newParty_wishes.save(err => {
		    if (err) return res.status(500).send(err);
		  })
		})
		return res.status(200).send([]);
})

//editing current party
router.post('/editCurrentParty', (req, res) => {
	Party.findOneAndUpdate({
      _id: req.body.id
      },
      { $set: { ...req.body }
  }, {runValidators: true}, function(err, newTodo) {
      if (err) {
        res.send('error');
      } else {
        res.json(newTodo)
      }
  });
})

//deleting current party
router.post('/deleteCurrentParty', (req, res) => {
	Party.findOneAndRemove({
    _id: req.body.id
  }, function(err, item) {
    if(err) {
      res.send('error removing')
    } else {
      res.json(item)
    }
  });
})

//removing wish in current party
router.post('/removeCurWish', (req, res) => {
	PartyWishes.findOneAndRemove({
    party_id: req.body.party_id,
    wish_id: req.body.wish_id
  }, function(err, item) {
    if(err) {
      res.send('error removing')
    } else {
      res.json(item)
    }
  });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Ninja = require('../model/ninjas');
//get list of ninjas
router.get('/ninjas',function(req,res){
   // res.send({type:'GET'});
   Ninja.geoNear(
       {type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
       {maxDistance:100000,spherical:true}
    ).then(function(ninjas){
        res.send(ninjas);
    });
});

//add a new ninja to the db
router.post('/ninjas',function(req,res,next){
    Ninja.create(req.body).then(function(ninja){
       res.send(ninja); 
    }).catch(next);
});

//update a ninja in the db
router.put('/ninjas/:id',function(req,res){
    //res.send({type:'GET'});
    Ninja.findByIdAndUpdate({_id : req.params.id},req.body).then(function(Ninja){
        res.send(Ninja);
    });
});

//delete a ninja from the db
router.delete('/ninjas/:id',function(req,res,next){
    console.log(req.params.id);
    Ninja.findByIdAndRemove({_id : req.params.id}).then(function(ninja){
        console.log(ninja);
        res.send(ninja);
    })
   // res.send({type:'DELETE'});
});

module.exports = router;
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    //Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err)
        } else {
               res.render("campgrounds/index", {campground:allCampground, currentUser: req.user});
        }
    })
   
});

router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from forms and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground ={name: name, image: image, description: desc, author: author}
   //Create a new Campground and save to DB
   Campground.create(newCampground, function(err,newlyCreateCampground) {
       if(err){
           console.log(err);
       } else {
            //redirect to campground
          res.redirect("/campground"); 
       }
       
   });
});


router.get("/new", middleware.isLoggedIn , function(req, res){
  res.render("campgrounds/new");

});

router.get("/:id", function(req, res){
    // find the campgroud with provided ID and render the show template for that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
            res.render("campgrounds/shows",{campground: foundCampground});
       }
    });
  
});

//Edit campground route 
router.get("/:id/edit", middleware.checkCampgroudOwner, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
         res.render("campgrounds/edit", {campground: foundCampground});
    });   
});

//Update campground route
router.put("/:id", middleware.checkCampgroudOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err) {
           res.redirect("/campground");
       } else {
           res.redirect("/campground/" + req.params.id);
       }
    });
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroudOwner,function(req, res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campground");
      } else {
          res.redirect("/campground");
      }
   }); 
});




module.exports = router;
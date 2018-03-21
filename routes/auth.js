var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campgrounds");

router.get("/",function(req, res) {
    res.render("landing");  
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req,res){
    // 
    var newUser = new User({
         username: req.body.username,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         avatar: req.body.avatar
       });
    if(req.body.admin === 'Himanshu@67') {
        newUser.isAdmin = true
    } 
    // eval(require("locus"))
   User.register(newUser, req.body.password, function(err,user){
       if(err){
           req.flash("error", err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("Success", "Welcome to Himanshu's Camp" + user.username);
           res.redirect("/campground");
       });
   });
});


router.get("/users/:id", function(req, res) {
   User.findById(req.params.id, function(err, foundUser) {
     if(err) {
       req.flash("error", "Something went wrong.");
       res.redirect("/");
     }
     Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
       if(err) {
         req.flash("error", "Something went wrong.");
         res.redirect("/");
       }
       res.render("users/show", {user: foundUser, campgrounds: campgrounds});
     })
   });
 });
 
//login form
router.get("/login", function(req, res){
    res.render("login");
});

//login route
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campground", 
        failureRedirect: "/login"
    }),function(req,res){

});

//logout route

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged out!");
   res.redirect("/campground");
});


module.exports = router;

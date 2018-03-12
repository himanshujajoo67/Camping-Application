var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user")


seedDB();
mongoose.connect("mongodb://localhost/himanshu_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//passport configuration
app.use(require("express-session")({
    secret:"Once again rusty wins",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Campground.remove(
//     {
//       name: "Granite Hills", 
//     //   image: "https://www.photosforclass.com/download/pixabay-2411069",
//     //   description: "This is a huge Granite hills, No Bathrooms, No water, Beautiful Granite Hills. Awesome Place to be All Alone on your Own"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("New Campground Created");
//             console.log(campground);
//         }
//     })

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res) {
    res.render("landing");  
});


app.get("/campground/new", function(req, res){
  res.render("campgrouds/new");

});


app.get("/campground/:id", function(req, res){
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   Campground.findById(req.params.id,function(err, campground) {
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          Comment.create(req.body.comment, function(err,comment){
              if(err){
                  console.log(err);
              } else {
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campground/" + campground._id);
              }
          });
      }
   });
    
});
app.get("/campground", function(req, res) {
    //Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err)
        } else {
               res.render("campgrounds/index", {campground:allCampground});
        }
    })
   
});

app.post("/campground", function(req, res){
   //get data from forms and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground ={name: name, image: image, description: desc}
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

//Auth Routes
app.get("/register", function(req, res){
    res.render("register");
});


//
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err,user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campground");
       });
   });
});

//login form
app.get("/login", function(req, res){
    res.render("login");
});

//login route
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campground" , 
        failureRedirect: "/login"
        
    }),function(req,res){

});

//logout route

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campground");
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/himanshu_camp");
app.set("view engine", "ejs")



// Scheme setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.remove(
    {
      name: "Dark Night River", 
    //   image: "https://www.photosforclass.com/download/pixabay-2411069",
    //   description: "This is a huge Granite hills, No Bathrooms, No water, Beautiful Granite Hills. Awesome Place to be All Alone on your Own"
        
    }, function(err, campground){
        if(err){
            console.log(err)
        } else {
            console.log("New Campground Created");
            console.log(campground);
        }
    })

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res) {
    res.render("landing");  
});


app.get("/campground/new", function(req, res){
  res.render("new.ejs");

});


app.get("/campground/:id", function(req, res){
    // find the campgroud with provided ID and render the show template for that campground
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            res.render("shows",{campground: foundCampground});
       }
    });
  
});

app.get("/campground", function(req, res) {
    //Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err)
        } else {
               res.render("index", {campground:allCampground});
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
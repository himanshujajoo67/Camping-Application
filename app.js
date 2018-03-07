var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/himanshu_camp");
app.set("view engine", "ejs")



// Scheme setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       name: "Granite Hill", 
//       image: "https://www.photosforclass.com/download/pixabay-2445212"
        
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
   res.render("new.ejs"); 
});

app.get("/campground", function(req, res) {
    //Get all campground from DB
    Campground.find({}, function(err,allCampground){
        if(err){
            console.log(err)
        } else {
               res.render("campground", {campground:allCampground});
        }
    })
   
});

app.post("/campground", function(req, res){
   //get data from forms and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground ={name: name, image: image}
   //Create a new Campground and save to DB
   Campground.create(newCampground, function(err,newlyCreateCampground) {
       if(err){
           console.lo(err);
       } else {
            //redirect to campground
          res.redirect("/campground"); 
       }
       
   });
  
   
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
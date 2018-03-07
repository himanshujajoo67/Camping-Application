var express = require("express");
var app = express();
app.set("view engine", "ejs")

var campground = [
       {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-2271828"},
       {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2445212"},
       {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-2411069"},
       {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-2271828"},
       {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2445212"},
       {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-2411069"},
       {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-2271828"},
       {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2445212"},
       {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-2411069"}
       ]; 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res) {
    res.render("landing");  
});

app.get("/campground/new", function(req, res){
   res.render("new.ejs"); 
});

app.get("/campground", function(req, res) {
       res.render("campground", {campground:campground});
});

app.post("/campground", function(req, res){
   //get data from forms and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground ={name: name, image: image}
   campground.push(newCampground);
   //redirect to campground
   res.redirect("/campground");
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
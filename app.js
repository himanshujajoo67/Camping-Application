var express = require("express");
var app = express();
app.set("view engine", "ejs")

app.get("/",function(req, res) {
    res.render("landing");  
});

app.get("/campground", function(req, res) {
   var campground = [
       {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-2271828"},
       {name: "Granite Hill", image: "https://www.photosforclass.com/download/pixabay-2445212"},
       {name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-2411069"}
       ] 
       res.render("campground", {campground:campground});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
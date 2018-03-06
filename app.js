var express = require("express");
var app = express();
app.set("view engine", "ejs")

app.get("/",function(req, res) {
    res.render("landing");  
});

app.get("/campground", function(req, res) {
   var campground = [
       {name: "Salmon Creek", image: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjXobOSztjZAhURON8KHaowAXwQjRx6BAgAEAY&url=http%3A%2F%2Fweknowyourdreams.com%2Fcamping.html&psig=AOvVaw1-uyH3nrculCSZJPwb9ku2&ust=1520457073594135"},
       {name: "Granite Hill", image: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjQmZ2fztjZAhVxkeAKHWRgDz8QjRx6BAgAEAY&url=https%3A%2F%2Fwww.travelok.com%2FCamping&psig=AOvVaw1-uyH3nrculCSZJPwb9ku2&ust=1520457073594135"},
       {name: "Mountain Goat's Rest", image: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj-xsmlztjZAhUCneAKHQ20Ds4QjRx6BAgAEAY&url=http%3A%2F%2Fwww.nationalparks.nsw.gov.au%2Fcamping-and-accommodation%2Fsydney-and-surrounds-campgrounds&psig=AOvVaw1-uyH3nrculCSZJPwb9ku2&ust=1520457073594135"}
       ] 
       res.render("campground", {campground:campground});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
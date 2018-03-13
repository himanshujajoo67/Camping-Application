var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

var commentsRoutes    = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var authRoutes        = require("./routes/auth");




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

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoutes);
app.use(commentsRoutes);
app.use(campgroundsRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
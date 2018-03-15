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
var methodOverride =  require("method-override");
var commentsRoutes    = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var authRoutes        = require("./routes/auth");
var flash = require("connect-flash");




// seedDB(); //Seed DB
mongoose.connect("mongodb://localhost/himanshu_camp");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});

app.use(authRoutes);
app.use("/campground/:id/comments",commentsRoutes);
app.use("/campground",campgroundsRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping application started");
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
	
// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Mongoose config

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body : String,
	create : {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);



// RESTful Routes

app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index",{blogs: blogs});
		}
	})
	
});






app.listen(3000);
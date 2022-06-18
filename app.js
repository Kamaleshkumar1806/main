const http=require("http");
const express=require("express");
const bodyParser=require("body-parser"); 
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
mongoose.connect("mongodb+srv://Kamalesh:kamal1131@cluster0.r6cmb.mongodb.net/?retryWrites=true&w=majority") 
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
const userSchema=new mongoose.Schema({name:String, password:String,email:String,token: { type: String }});
const user=new mongoose.model("user",userSchema);
const options={port:3000}
var request=http.request(options);
//request.setHeader('Cookie', 'h');
//request.end;
var myHeaders = new Headers(); // Currently empty
const jsonSchema=new mongoose.Schema({"end_year": String,
            "intensity":Number, 
            "sector": String,
            "topic": String,
            "insight": String,
            "url":String,
            "region": String,
            "start_year": String, 
            "impact": String, 
            "added": String, 
            "published":  String ,
            "country": String, 
            "relevance": Number, 
            "pestle": String, 
            "source": String, 
            "title":String, 
            "likelihood": Number});
const Mod=new mongoose.model("Mod",jsonSchema);

app.get("/login", function(req, res){
	//console.log(req.header('Cookie'));
	res.render("login.ejs");});
app.get("/signup", function(req,res){
	res.render("signup.ejs");});
app.post("/signup",function(req,res){
	const semail=req.body.semail;
	const sname=req.body.susername;
	const spass=req.body.spassword;
	const user1=new user({email:semail,name:sname,password:spass});
	user1.save();
res.redirect("/login");});
app.post("/login", function(req,res){
	const uemail=req.body.uemail;
	const upass=req.body.upassword;
	user.find({email:uemail,password:upass},function(err,val){
		if (val.length===0){
			console.log("no user found");
res.redirect('/login');}
		else{
			const token =jwt.sign({user:val}, 'secret key',);
			myHeaders.set('Authorisation', token);
			user.updateOne({user:val},{token:token}, function(err){console.log(err)});
			res.redirect("/home");
}}) 
});
app.get("/home",function(req, res){
	const het=(myHeaders.get("Authorisation"));
	user.find({token:het},function(err, v){
if(v.length!==0){
Mod.find({}, function(err, g){
	if(!err){
		res.render("index", {dat:g})}});}
	else{console.log("no tok auth");
res.redirect("/login");}});
});
var Select=""
app.post("/select", function(req,res){
	const s=req.body.hi;
	Select=s;
	console.log(s);
});
app.post("/search", function(req,res){
	var se=req.body.search;
	let sa={s:se}
	console.log(sa);
	Mod.find({sa},function(err, val){
		var vel=val.slice(0,10);
var delayInMilliseconds = 3000; //1 second

setTimeout(function() {
  res.render("index", {dat:vel});
}, delayInMilliseconds);
			
console.log(vel);
		});
		s=""
	});
app.get("/", function(req, res) {
	res.redirect("/login")});
app.get("/logout", function(req,res){
	myHeaders.set('Authorisation', null);
	res.send("logout success")});
app.listen(3000,function(req,res){
	console.log("server started on 3000");});
	
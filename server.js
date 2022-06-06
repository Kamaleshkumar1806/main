const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Kamalesh:kamal1131@cluster0.r6cmb.mongodb.net/?retryWrites=true&w=majority") 
const express =require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
const listSchema=new mongoose.Schema({
	name:String});
const List=mongoose.model("List", listSchema);
const item1=new List({name:"hi"});
const item2=new List({name:"end"});
const tup=[item1, item2]
app.get("/", function(req, res){
	List.find(function(err, len) {
if(len.length===0) {List.insertMany(tup, function(err, doc){
});res.redirect("/");}
else{res.render("index",{currentDate : " Today", lit:len});}
});
});
app.post("/", function(req, res){
	const Listinput=req.body.li;
	const litem=new List({name:Listinput});
	litem.save();
    res.redirect("/");});
app.post("/delete", function(req, res){
	const r=req.body.checkbox;
	List.findByIdAndRemove(r, function(err){
		if (!err){
			console.log("succesfully deleted checked item");
res.redirect("/");}});});
app.listen(4000,function(){
	console.log("server started");});
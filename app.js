"use strict";
var express= require("express"),
    mongoose= require("mongoose"),
    bodyParser= require("body-parser");

var app= express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var ToDoSchema= new mongoose.Schema({
    todo:String,
    date: {type: Date, default: Date.now()},
    strike:Boolean
});

var ToDo= mongoose.model("ToDo", ToDoSchema);

mongoose.connect("mongodb://localhost/to_dos",{useMongoClient: true});

//DEMO DATA
// ToDo.create({
//     todo:"Go to gym",
//     strike:true
// }, function (err, todo) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Created todo");
//     }
// });

//ROUTES


//INDEX
app.get("/", function (req, res) {
    res.redirect("/todos");
});

app.get("/todos", function (req, res) {
    ToDo.find({}, function (err, todos) {
        if(err){
            console.log(err);
        }else{
            res.render("index",{todos:todos});
        }
    });
});

//CREATE
app.post("/todos", function (req, res) {
    console.log(req.body);
    ToDo.create({
        todo:req.body.text,
        strike:false
    }, function (err, todo) {
        if(err){
            console.log(err);
        }else{
            console.log(todo);
            res.send({todo:todo});
        }
    });
});

//DELETE
app.post("/todos/delete", function (req, res) {
    console.log(req.body.id);
    ToDo.findByIdAndRemove(req.body.id, function (err) {
        if(err){
            console.log(err);
        }else{
            res.send({isSuccess:1});
        }
    });
});



app.listen(3333, function () {
    console.log("ToDos is online!");
})


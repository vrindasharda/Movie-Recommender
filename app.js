// jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request=require("request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/", (req, res)=>{
  const name = req.body.name;
  const url="https://tastedive.com/api/similar?q="+name+"&type=movie&info=1";
  request(url, function(err, response, body){
    if(!err && res.statusCode == 200) { // Successful response
        // console.log(body); // Displays the response from the API
        const movieData=JSON.parse(body);
        res.render("top.ejs", {
          data: movieData.Similar.Results
        });
    } else {
        console.log(err);
    }
  })
});

app.get("/shows", (req, res) => {
  res.render("shows.ejs");
});
app.post("/top_shows", (req, res)=>{
  const name = req.body.name;
  const url="https://tastedive.com/api/similar?q="+name+"&type=show&info=1";
  request(url, function(err, response, body){
    if(!err && res.statusCode == 200) { // Successful response
        // console.log(body); // Displays the response from the API
        const movieData=JSON.parse(body);
        res.render("top_shows.ejs", {
          data: movieData.Similar.Results
        });
    } else {
        console.log(err);
    }
  })
});

app.get("/music", (req, res) => {
  res.render("music.ejs");
});
app.post("/top_music", (req, res)=>{
  const name = req.body.name;
  const url="https://tastedive.com/api/similar?q="+name+"&type=music&info=1";
  request(url, function(err, response, body){
    if(!err && res.statusCode == 200) { // Successful response
        // console.log(body); // Displays the response from the API
        const movieData=JSON.parse(body);
        res.render("top_music.ejs", {
          data: movieData.Similar.Results
        });
    } else {
        console.log(err);
    }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

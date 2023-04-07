//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs'); //! required to run ejs! Dont forget to download all extensions required for this app

app.use(bodyParser.urlencoded({extended: true})); //! to use body-parser
app.use(express.static("public")); //! The page express will use("nameOfTheFolder") || 
let posts = [];

app.get("/", function(req, res){ 
  res.render("home", {
    startingContent: homeStartingContent, //! KEY:ITEM
    posts: posts //! 
    });
});

app.get("/about", function(req, res){ //! When people tries to accesss the server, server will give /about
  res.render("about", {aboutContent: aboutContent}); //! ("Page", {KEY: What you want to pass})
});

app.get("/contact", function(req, res){ //! To access as different route in the server Ex. localhost:3000/contact
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){ //! To access /compose
  res.render("compose"); //! What to give access to
});

app.post("/compose", function(req, res){ //! This is one of the "method" use from the express and html which is located in /views, a method that allows the server to tap in.
  const post = { //! Created a javascriptObject / to store the dataOne and dataTwo
    title: req.body.postTitle,  //! dataOne: Get the data from the <body.postTitle>, body-parser. Dont forget the comma
    content: req.body.postBody //! dataTwo: Value
  };

  posts.push(post); //! Pushing it to the array

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

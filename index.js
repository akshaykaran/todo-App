//Require Express 

const express = require("express");
const path = require("path");
// const port = 5000;
const env = require("dotenv").config();
const port = process.env.PORT || 5000;



//Connection to database 
const db = require("./config/mongoose");
const Todo = require("./models/todoList");

//starting the app
const app = express();


//connection to View Structure 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// conversion of string to valid URL format 
app.use(express.urlencoded());
//accessing the assets folder
app.use(express.static("assets"));



//fetching data from DB
app.get("/", function (req, res) {
  Todo.find({}, function (err, lists) {
    if (err) {
      console.log("error in fetching from Database");
      return;
    }
    return res.render("home", {
      list: lists,
    });
  });
});

// CREATING TODO-LIST IN THE DATABASE
app.post("/create-list", function (req, res) {
  // console.log("body",req.body)
  Todo.create(
    {
      desc: req.body.desc,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newList) {
      if (err) {
        console.log("error in creating a list", err);
        return;
      }
      return res.redirect("back");
    }
  );
});

// Deleting TODO-LIST from Database
app.delete("/delete-contact", async function (req, res) {
  let id = req.query.id;
  const todo = await Todo.findByIdAndDelete(id);
  return res.status(200);
});


//Server Connection
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the Server");
    return;
  }
  console.log("Server is up and running!!");
});

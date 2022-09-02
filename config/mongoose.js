const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;
  // "mongodb+srv://anshurai:anshurai1998@cluster0.trmqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongo_uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error while running db"));
db.once("open", function () {
  console.log("database is connected!!");
});

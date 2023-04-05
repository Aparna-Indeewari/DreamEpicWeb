require("dotenv").config(); 
//  loads environment variables from a .env file into process.env
const express = require("express");
// web framework for Node.js, used for handling HTTP requests and responses
const mongoose = require("mongoose");
// Object Data Modeling (ODM) library used for connecting to MongoDB and interacting with the database
const bodyParser = require("body-parser");
//middleware used for parsing incoming request bodies
const cors = require("cors");
// middleware used for enabling Cross-Origin Resource Sharing

//import routes

const authenticationRoutes = require("./routes/authentication-routes");
const profile=require("./routes/profile-routes");
// authenticationRoutes and profile are variables that hold the imported routes from their respective files

const app = express();
//create an instance of the Express application and set up middleware
app.use(cors());
// enables Cross-Origin Resource Sharing for all routes
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// parse incoming request bodies as JSON and URL-encoded data respectively
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
// set to either the environment variable PORT or the default value of 5000
const URI = process.env.MONGODB_URI;
// set to the environment variable MONGODB_URI.

mongoose
  .connect(URI, {
  //connects to the MongoDB database using the URI and options passed as the second parameter.
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
// passed to mongoose.connect() that help configure the MongoDB connection
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

//use routes
//set up the application to use the imported routes.
app.use("/api/auth", authenticationRoutes);
// Requests to "/api/auth" will be handled by the authenticationRoutes router
app.use("/api/profile",profile);
// Requests to "/api/profile" will be handled by the profile router.


//event loop for server
//Express server and listens for incoming requests on the specified port.
// logged to the console indicating that the server is running and on which port it is running.
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});

// Importing the user model from ../models/user-model file.
const Usermodel = require("../models/user-model");
//Importing the cloudinary object from ../utils/cloudinary file.
const { cloudinary } = require("../utils/cloudinary");
//Importing the mongoose module for database operations.
const mongoose = require("mongoose");


//fetch customer profile data
//Exporting an asynchronous function as getProfileData with req and res parameters
exports.getProfileData = async (req, res) => {
 
 //Starting a try-catch block to handle errors.
 try {
 
    //Checking if req.user is not defined
    if (!req.user) {
    
      //Setting response status code to 422 and returning a JSON object.
      res.status(422).json({
      
        //Setting the success status to false
        success: false,
        
        //Setting the description of the error.
        desc: "Can not find the user - Please check again",
      });
    } else {
    
      //Setting response status code to 200 and returning a JSON object.
      res.status(200).send({
        //Adding the req.user object to the JSON object
        profile: req.user,
      });
    }
    
    //Catching errors if any occurred.
  } catch (error) {
    res.status(500).json({
      success: false,
      
      //Setting the description of the erro
      desc: "Error in getProfileData controller-" + error,
    });
  }
};


//Fetch User profile details
//Exporting an asynchronous function as getUserDetails with req and res parameters.
exports.getUserDetails = async (req, res) => {
  try {
  
    //Finding all the user details using Usermodel and assigning it to the userdetails variable
    const userdetails = await Usermodel.find();
    
    //Setting response status code to 200 and returning a JSON object.
    res.status(200).send({
    
      //Adding the userdetails object to the JSON object
      userdetails,
    });
  } catch (error) {
  
    //Setting response status code to 500 and returning a JSON object.
    res.status(500).json({
      success: false,
      desc: "Error in getUser Details controller-" + error,
    });
  }
};



//delete user
//Exporting an asynchronous function as deleteUser with req and res parameters
exports.deleteUser = async (req, res) => {

  //Getting the id parameter from the request.
  let Id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(Id))
    return res.status(404).send(`No User with id: ${Id}`);

  try {
    await Usermodel.findByIdAndDelete(Id);
    res.status(200).json({ status: "User profile deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};



//edit user
// exports a function called updateuser that takes in a req (request) and res (response) parameters
exports.updateuser =  async (req,res) =>{

  //destructures the password property from the req.body object and assigns it to a constant password
  const { password } = req.body;

  try {
  //creates a new object called newData that has a single property password with the value of the password constant
    const newData = {
      password
    };
    
    
    //finds a user in the database by their ID and updates their password using the findByIdAndUpdate method from Mongoose.
    const updatedUser = await Usermodel.findByIdAndUpdate(
      req.user.id,
      newData,
      {
      
        //options for the findByIdAndUpdate method
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({
      success: true,
      desc: "user updated successfully",
      updatedUser,
    });
    
    //If an error occurs in the try block, the catch block is executed
  } catch (error) {
  
    //If an error occurs, the server responds with an HTTP status code of 500 and sends a JSON object with a success property set to false
    res.status(500).json({
      success: false,
      desc: "Error in updateProfileData controller-" + error,
    });
  }
 }





// import the Usermodel and cloudinary dependencies from their respective files.
const Usermodel =require("../models/user-model");
const { cloudinary } = require("../utils/cloudinary");

// login controller
//exports a function called login as part of the exports object.
exports.login = async (req, res, next) => {
  //function retrieves the email and password values from the request body
  const { email, password } = req.body;
  //check user
  let user;
    //uses Usermodel to find a user with the specified email, and includes the password field in the returned object.
    user = await Usermodel.findOne({ email: email }).select("+password");
  
  //check password match
  //etrieved user object and calls the matchPasswords method to check if the entered password matches the hashed password in the database.
  try {
    const isMatch = await user.matchPasswords(password);
  //If it does match, the function calls sendToken with the user object, 200 HTTP status code, and res object
    if (!isMatch) {
      res.status(401).send({
        success: false,
        desc: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};


// register new user
//exports a function called registerUser as part of the exports object.
It takes in req and res as arguments.
exports.registerUser = async (req, res) => {
  //The function retrieves the email, password, username, role, and fileEnc values from the request body
  const {  email, password , username,role,fileEnc } = req.body;
//check for users with same email address within customer collection
let existingEmail = await findUserByEmail(email);
if (existingEmail) {
  existingEmail = null;
  //If it does exist, the function sends an error message with a 401 HTTP status code
  res.status(401).json({
    success: false,
    desc: "Email already exist - Please check again",
  });
} else {
  //If it doesn't exist, the function uploads the fileEnc to Cloudinary and saves the resulting URL and public ID as part of the profilePicture object.
    try {   
      const profileimage = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "ssd_assignment",
      });
      
      const admin = await Usermodel.create({
        email,
        password,
        username,
        role,
        profilePicture: {
          imagePublicId: profileimage.public_id,
          imageSecURL: profileimage.secure_url,
        }

      });
      const token = await admin.getSignedToken();
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in admin  controller-" + error,
      });
    }
  }
  
};

//send response object to client if login success
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
      desc: "Error occured in findUserByEmail segment",
  // 
  res.status(statusCode).json({ sucess: true, token, user });
};


//find duplicated user emails when creating new users
const findUserByEmail = async (email) => {
  let existingAccount;
  try {
    //It then creates a new user using Usermodel with the provided values, including the profilePicture object
    existingAccount = await Usermodel.findOne({ email: email });
    return existingAccount;
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment",
      error: err.message,
    });
  }
};

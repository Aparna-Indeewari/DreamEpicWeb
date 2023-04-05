//importing the required modules jsonwebtoken and Usermodel
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user-model");

//exports the protectedUser function as a middleware to validate if the user is authorized to access a protected route
exports.protectedUser = async (req, res, next) => {
  //declares a variable token and assigns the value returned by the tokenValidate function which validates the user's JWT token.
  let token;
  token = tokenValidate(req);
  // verify the token using the jwt.verify method and then retrieve the user's information from the database
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usermodel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};

//tokenValidate function that validates the token passed through the request.
const tokenValidate = (reqObj, res) => {
  // check if the authorization header exists and if the token starts with "Bearer"
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

// declare two functions noUserResponse and invalidUserResponse to send error responses in case of failure while validating the token.
const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Frobidden-" + err });
};

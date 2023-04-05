//importing the Mongoose library for MongoDB database interaction.
const mongoose = require("mongoose");
//importing the bcryptjs library for hashing passwords.
const bcrypt = require("bcryptjs");
//importing the jsonwebtoken library for generating and verifying JSON web tokens.
const jwt = require("jsonwebtoken");

//creating a new Mongoose schema for the user.
const UserSchema = new mongoose.Schema({
  // field for the username, which is a string
  username: {
    type: String,
  },
  //field for the email, which is a string
  email: {
    type: String,

  },
  //field for the password, which is a string
  password: {
    type: String,

  },
  //field for the role, which is a string
  role: {
    type: String,

  },
  //field for the profile picture, which is an object
  profilePicture: {
    //field for the image's public ID, which is a string and is required
    imagePublicId: {
      type: String,
      required: [true, "Please provide a Image"],

    },
    //field for the image's secure URL, which is a string
    imageSecURL: {
      type: String,

    },
  },
});

//by using "pre save" we run this code segment before mongoose save data on db
UserSchema.pre("save", async function (next) {
  //check whether the password has already been hashed or not by using isModified
  if (!this.isModified("password")) {
    next();
  }

  //hash password before passing it to db save query through the model
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object

  next();
});

//to compare hashed passwords in login scenarios
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;

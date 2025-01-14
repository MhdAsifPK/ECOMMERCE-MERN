import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateTokenFor.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body; //take the name,email,password from request body
  console.log(name,email,password)

  const userExists = await User.findOne({ email }); //checking is the user is already exists using findOne method
  // console.log(userExists)
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPassowrd = await bcrypt.hash(password, salt);

  //if user is not exists then create a new user using create method
  const user = await User.create({
    name,
    email,
    password: encryptedPassowrd,
  });
  if (user) {
    generateToken(res,user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
  //  generate token
  generateToken(res,user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
// to store response in cookies

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};
const getUserProfile = () => {};

export { createUser, authUser, logout, getUserProfile };

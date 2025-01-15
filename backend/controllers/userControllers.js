import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateTokenFor.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body; //take the name,email,password from request body
  console.log(name, email, password);

  const userExists = await User.findOne({ email }); //checking is the user is already exists using findOne method
  // console.log(userExists)
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  // const salt = await bcrypt.genSalt(10);
  // const encryptedPassowrd = await bcrypt.hash(password, salt);

  //if user is not exists then create a new user using create method
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});
// ========================================================
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    //  generate token
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
// to store response in cookies
// =======================================================
const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};


// =========================================================
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// ========================================================
const getAllUserProfile = asyncHandler(async(req,res) => {
  const users = await User.find()
  res.json(users)
  
});
// ==========================user edit for admnin
const getUserProfile = asyncHandler(async(req,res) => {
  const users = await User.findById(req.params.id)
  res.json(users)
  
});
// =======================================================

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// ================================================================
const updateUserProfileAdmin = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
      
export { createUser, authUser, logout, getAllUserProfile, updateUserProfile ,updateUserProfileAdmin,getUserProfile,deleteUser};

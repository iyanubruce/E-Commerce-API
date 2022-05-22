const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require("../models/users");
const { loginValidation, userValidation } = require("../middlewares/authorize");
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

// signup
exports.signUp = async (req, res, next) => {
  const { error, value } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email }); 
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    return res.status(200).send({ message: "User created successfully!", user: savedUser });
  } catch (err) {
    return res.status(400).send({ error: "User created successfully!", error: err });
  }
};

// login
exports.logIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (!emailUser) return res.status(400).send({ message: "invalid login credential" });

  //compare valid password with hash
  try {
    const validPass= await bcrypt.compareSync(req.body.password, emailUser.password);
    if (!validPass) return res.status(400).send({ message: "invalid login credential" });

    // Token    
    const token = await jwt.sign({ _id: emailUser._id }, USER_JWT_SECRET);

    return res.status(200).header("auth-token", token).send({ "auth-token": token, userId:emailUser._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
    return res
      .clearCookie('auth_token')
      .status(200)
      .json({ success: true, msg: 'Log out successful' });
  };

// Update user
exports.updateUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); //encrypt the password before updating
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });

    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.userId); 

    if (!deleteUser) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete user" });
  }
};

exports.validateUser = async (req, res) => {
  return res.json({
    posts: {
      title: "User Authentication",
      description: "random data you can access because you\'re authenticated",
    },
  });
};

const createUserObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 2),
    phone: req.body.phone,
  };
}
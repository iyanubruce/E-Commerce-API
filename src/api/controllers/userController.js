const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/users');
const { loginValidation, userValidation } = require('../middlewares/authorize');
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const SALT = process.env.SALT;

// signup
exports.signUp = async (req, res) => {
  const { error, value } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: value.email });
  if (emailExist)
    return res.status(400).send({ message: 'Email already exist!' });

  try {
    hashedPassword = await bcrypt.hash(value.password, SALT);
    value.password = hashedPassword;
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    refreshTOKEN = jwt.sign(
      { id: User.id, role: User.role },
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: '1d' }
    );
    accessToken = jwt.sign(
      { id: User.id, role: User.role },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: '15m' }
    );
    User.refreshToken = refreshTOKEN;
    await new User({ ...req.body, password: hashPassword }).save();
    return res
      .cookie(refreshTOKEN, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None',
        secure: true,
      })
      .status(200)
      .send({
        message: 'User created successfully!',
        user: savedUser,
        token: accessToken,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ error: 'Internal Server Error!', error: err });
  }
};

// login
exports.logIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (!emailUser)
    return res.status(400).send({ message: 'invalid login credential' });

  //compare valid password with hash
  try {
    const validPass = await bcrypt.compareSync(
      req.body.password,
      emailUser.password
    );
    if (!validPass)
      return res.status(400).send({ message: 'invalid login credential' });

    // Token
    const token = await jwt.sign({ _id: emailUser._id }, USER_JWT_SECRET);

    return res
      .status(200)
      .header('auth-token', token)
      .send({ 'auth-token': token, userId: emailUser._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.refreshTOKEN = async (req, res) => {
  const cookie = req.cookies['jwt'];
  if (!cookie) {
    return res.status(400).json({ message: 'Not authorized, Sign In' });
  } else {
    token = cookie;
    User = await User.findOne({ refreshToken: token });
    if (!User) {
      return res.status(400).json({ message: 'Not authorized, Sign In' });
    }
    value = await jwt.decode(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    if (value.id != User.id) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const payload = { id: User.id, role: User.role };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: '15m' }
    );
    return res.status(200).json({
      accessToken,
      message: 'Access token successfully created',
    });
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
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).send({ message: 'Could not update user' });
    }
    return res
      .status(200)
      .send({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'An error has occurred, unable to update user' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.userId);

    if (!deleteUser) {
      return res.status(400).send({ message: 'Could not delete user' });
    }
    return res
      .status(200)
      .send({ message: 'User deleted successfully', user: deleteUser });
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'An error has occurred, unable to delete user' });
  }
};

exports.validateUser = async (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json(data);
  });
};

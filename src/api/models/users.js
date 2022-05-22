const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      max: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
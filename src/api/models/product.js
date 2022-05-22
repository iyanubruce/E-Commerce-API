const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    description: {
      type: String,
      default: 'Empty String',
      max: 255,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    initialPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    currentValue: {
      type: Number,
      required: true,
      trim: true,
    },
    noInStock: {
      type: Number,
      default: 0,
      trim: true,
    },
  },
  //updatedAt and createdAt
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

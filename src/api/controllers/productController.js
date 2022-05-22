const product = require('../models/product');

// Create product
exports.createProduct = async (req, res) => {
    
    const Product = new product ({...req.body})    
    console.log('Creating...')
    try {
        await Product.save();
        res.status(201).json({
            Product,
        });
        console.log('Everything in check')
    } catch (error) {
        console.log(error);
    }
};

// Read
exports.getProduct = async (req, res) => {

    const Product = await product.find();   
    console.log(Product)
    try {        
        res.json({Product});   
    } catch (error) {
        console.log(error);
    }
}

// Get Specific Item
exports.getSpecificProduct = async (req, res) => {
    try {
      const Product = await product.findOne({ _id: req.params.id });
      if (!item)
        return res.status(404).json({
          status: 'failed',
          msg: `ID ${req.params.id} does not exist!`,
        });
      res.json(Product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

// Sort, Filter, Query
exports.filterProduct = async (req, res) => {
    try {
      //.sort({ price: 1, category: -1 })
      // Sort the results of a find by the given fields
  
      // .limit(2)
      // Only return a set number of documents
  
      // .skip(2)
      // Skip a set number of documents from the beginning
  
      // const items = await Item.find().sort({ category: 1, price: -1 });
      // const items = await Item.find().limit(2);
      // const items = await Item.find().sort({ price: 1 }).limit(3);
      // const items = await Item.find().sort({ price: 1 }).skip(5);
  
      // Query condition
      // $eq - check for equality
      // $ne - check for not equal
      // gt / $gte - check for greater than or equal
      // $lt / $lte - check for less than or equal
      // $in - check if a value is one of many values
      // $nin - check if a value none of many values
      // $and - Check that multiple conditions are all true
      // $or - Check that one of multiple conditions is true
      // $not - Negate the filter inside of $not
      // $exists - Checks if a field exists
      // $expr - Do comparisons between different fields
  
      // A < B
      const query = { name: 'iphone13' };
  
      // machinery: { $exists: true },
      // $or: [{ category: 'accessories' }, { price: { $lte: 80000 } }],
      const Product = await product.find(query).sort({ price: 1 });
      if (Product.length === 0)
        return res
          .status(200)
          .json({ status: 'success', msg: 'There are no items!' });
      res.json(Product);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

exports.regex =  async (req, res) => {
    try {
      // { <field>: { $regex: /pattern/, $options: '<options>' } }
      // const query = {};
      // case-insensitive => /AbC/i
      // const query = { name: /apple/i };
  
      // starts with => /^abc/
      // const query = { name: { $regex: /^Ip/ } };
  
      // Combining starts with and case-insensitive => /^AbC/i
      // const query = { name: { $regex: /^Ip/i } };
  
      // ends with => /abc$/
      // const query = { name: { $regex: /tch$/ } };
  
      // turn case-insensitive on and off
      // const query = { name: { $regex: '(?i)ip(?-i)hone13' } };
  
      // word boundary => \b
      // case 1: any word starts with
      // const query = { name: { $regex: /\bz/i } };
  
      // case 2: any word ends with
      // const query = { name: { $regex: /h\b/i } };
  
      // Lookahead Assertion => x(?=y)
      // Checks for where x is followed by y
      // const query = { name: { $regex: /apple (?=airpods)/i } };
  
      // Negative Lookahead Assertion => x(?!y)
      // const query = { name: { $regex: /apple (?!airpods)/i } };
  
      // Lookbehind Assertion => (?<=y)x
      // const query = { name: { $regex: /(?<=apple )airpods/i } };
  
      // Negative Lookbehind Assertion => (?<!y)x
      const query = { name: { $regex: /(?<!s) w/i } };
  
      const Product = await product.find(query).sort({ price: 1 });
      if (Product.length === 0)
        return res
          .status(200)
          .json({ status: 'success', msg: 'There are no items!' });
      res.json(Product);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

// Update
exports.updateProduct = async (req, res) => {

    const Product = await product.findOne({...req.body});    
    try {
        if (!Product) {
            return res.status(404).json({
                message: 'Product not found',
            });
            } else {                         
            Product = {...req.body}
            await product.save();
            res.json({
                message: 'Product was updated',
                Product,
            });   
            }  
                    
    } catch (error) {
        console.log(error);
    }
}

// Delete
exports.deleteProduct = async (req, res) => {
    const Product = await product.findOneAndDelete();
    console.log('Deleting...')
    try {
        if (!Product) {
            return res.status(404).json({
                message: 'Product not found',
            });
    }
    res.json({
        message: 'Product deleted',
    });
    } catch (error) {
        console.log(error);
    }
}
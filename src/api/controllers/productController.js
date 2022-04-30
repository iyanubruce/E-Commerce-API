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
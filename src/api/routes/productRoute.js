const router = require('express').Router();

const products = require('../controllers/productController');
// Create
router.post('/', products.createProduct);
// Read
router.get('/', products.getProduct);
// Update
router.put('/', products.updateProduct);
// Delete 
router.delete('/', products.deleteProduct);

module.exports = router;
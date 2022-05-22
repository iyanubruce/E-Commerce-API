const router = require('express').Router();
const products = require('../controllers/productController');
// Create
router.post('/', products.createProduct);
// Read
router.get('/product', products.getProduct);
// Get specific product
router.get('/:id', products.getSpecificProduct);
// Update
router.put('/', products.updateProduct);
// Delete 
router.delete('/', products.deleteProduct);

router.get('/filter', products.filterProduct);
router.get('/regex', products.regex);

module.exports = router;
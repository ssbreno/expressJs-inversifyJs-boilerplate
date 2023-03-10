import express from 'express';

const router = express.Router();
const products = require('../routes/products.routes');
const productsCategory = require('../routes/products-category.routes');

router.use('/products', products);
router.use('/products-category', productsCategory);

module.exports = router;

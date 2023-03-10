import express from 'express';

const router = express.Router();
const products = require('../routes/products.routes');
const category = require('../routes/category.routes');

router.use('/products', products);
router.use('/products-category', category);

module.exports = router;

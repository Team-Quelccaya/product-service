const router = require('express').Router();
const controller = require('../controllers/controllers');

router.get('/products/list', controller.getListProducts);
router.get('/products/:product_id', controller.getProductInfo);
router.get('/products/:product_id/styles', controller.getProductStyles);
router.get('/products/:product_id/related', controller.getRelatedProducts);

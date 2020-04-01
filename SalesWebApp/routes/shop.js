const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);

router.post('/cart/remove/', shopController.postRemoveProduct);

router.get('/cart/',shopController.getShowCart);

router.post('/cart/', shopController.postAddCart);

router.get('/products', shopController.getProducts);

router.get('/products/:prodId', shopController.getSpecificProd);

router.get('/checkout', shopController.getCheckOut);

router.get('/orders', shopController.getOrders);


module.exports = router;

const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);

router.get('/cart', shopController.showCart);

router.post('/cart/remove/:prodIdRemove', shopController.removeCart);

router.get('/cart/:prodId', shopController.addCart);

router.get('/products', shopController.getProducts);

router.get('/products/:prodId', shopController.getSpecificProd);

router.get('/checkout', shopController.getCheckOut);

router.get('/orders', shopController.getOrders);


module.exports = router;

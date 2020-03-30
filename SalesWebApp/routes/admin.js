const path = require('path');
const express = require('express');
const adminControler = require('../controllers/admin');
const router = express.Router();


// /admin/add-product => GET
router.get('/add-product',adminControler.getAddProduct);

// /admin/products => GET
router.get('/products',adminControler.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminControler.postAddProduct);

router.get('/edit-product/:prodId', adminControler.getEditProduct);

router.post('/edit-product/',adminControler.postEdittedProduct);

router.post('/delete-product', adminControler.postDeleteProduct);
//you can not have :prodId or any dynamic elements on your POST route. You get it with req.body.id for ex.;

exports.routes = router;


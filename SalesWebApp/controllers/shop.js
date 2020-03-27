const Product = require('../models/product');
const Cart = require('../models/cart');

const productsSelected = [];
var totalPrice = 0;


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: products.length > 0
    });

  });
}
exports.getSpecificProd = (req, res, next) => {
  const id = req.params.prodId;
  // Product.getSpecificProd(id,product =>{
  //   console.log(product);
  // });
  Product.getSpecificProd(id, product => {
    res.render('shop/product-detail', { prod: product, pageTitle: 'Product Detail', path: '/products' });
  });
};

exports.showCart = (req,res,next) =>{
  Cart.showCart(products =>{
    res.render('shop/cart', { prods: products, pageTitle: 'Your Cart', path: '/cart' });
  });
};

exports.addCart = (req, res, next) => {
  // const id = req.params.prodId;
  // console.log(id);
  // Product.getSpecificProd(id, product => {
  //   totalPrice = product.priceCons + totalPrice;
  //   if(!productsSelected.find(p => p.id === product.id)){ //if product has same id as any of inserted itens than you dont push it into cart array
  //     productsSelected.push(product);
  //   }
  //   res.redirect('/cart');

  // });

  const id = req.params.prodId;
  Product.getSpecificProd(id, (product) =>{

    Cart.addProduct(id, product.priceCons);
  });
  res.redirect('/cart');
};

exports.removeCart = (req,res,next) =>{
  const id = req.params.prodIdRemove;
  console.log(productsSelected);
  Product.getSpecificProd(id,product =>{
    const index = productsSelected.findIndex(p => p.id === id);
    console.log('this is index' + index);
    productsSelected.splice(index,1);
  });
  res.redirect('/cart');
};

exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0
    });

  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' })
};




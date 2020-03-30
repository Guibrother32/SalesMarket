const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // http://localhost:3000/admin/edit-product/0?edit=true

  if (!editMode) { //this is redundant, just to show if got any error you could warn the client, its not a good practice to just redirect the client to main page as well!
    return res.redirect('/');
  }

  const id = req.params.prodId;

  Product.getSpecificProd(id, product => {
    if (!product) {
      return res.redirect('/');//this is redundant, just to show if got any error you could warn the client, its not a good practice to just redirect the client to main page as well!
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '',
      editing: editMode,
      product: product
    });
  });


};
exports.postEdittedProduct = (req, res, next) => {
  const id = req.body.idHidden;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  const updatedProduct = new Product(id,newTitle,newImageUrl,newPrice,newDescription);

  updatedProduct.save();

  res.redirect('/admin/products');

  // Product.fetchAll(products => {
  //   // productList = new Product('', '', '', '', '');
  //   let productList = products;
  //   newProduct = new Product(newTitle,newImageUrl,newPrice,newDescription);
  //   const indexProdToEdit = productList.findIndex(prod => prod.id ===id);
  //   productList[indexProdToEdit] = newProduct;
  //   console.log(productList);
  // });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      hasProducts: products.length > 0
    });

  });
};


exports.postDeleteProduct = (req,res,next) =>{
  const id = req.body.productId;

  Product.delete(id);

  Product.getSpecificProd(id,product=>{
    Cart.removeProduct(id,product.priceCons);
  });

  res.redirect('/admin/products');
};
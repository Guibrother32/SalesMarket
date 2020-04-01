const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
const Product = require('./product');


module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyze cart => finding existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            //Add new product/increase quantity
            let updateProduct;
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            }
            else {
                updateProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log("Error: " + err);
            });
        });
    }
    static removeProduct(id, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const updateCart = { ...cart };
            updateCart.products = updateCart.products.filter(prod => prod.id !== id); //filter all the products that matches with that id, remember, filter takes all, find just find the first that matches
            const product = cart.products.find(prod => prod.id === id); // to find out how many products was added at total price so then we can take it out
            if(!product){
                return; //if you try to delete at admin and its not in the cart, this prevents it to crash
            }
            updateCart.totalPrice = updateCart.totalPrice - product.qty * prodPrice;

            updateCart.products = updateCart.products.filter(prod => prod.id !== id);

            fs.writeFile(p, JSON.stringify(updateCart), err => {
                console.log("Error: " + err);
            });
        });
    };

    static showCart = (cb) => {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};




            // for (let index = 0; index < cart.products.length; index++) {
            //     Product.getSpecificProd(cart.products[index].id, product => {
            //         if (product) {
            //             productsOnCart.products.push(product);
            //         }
            //     });
            //     productsOnCart.totalPrice = cart.totalPrice;

            // }

            // Product.fetchAll(products =>{
            //     for (const product of products) {
            //         let productCheck = cart.products.find(prod => prod.id === product.id)
            //         if(productCheck){
            //             productsOnCart.push({productData:product,qty:productCheck.qty});
            //         }
            //     }
            // });
            // cb(productsOnCart);

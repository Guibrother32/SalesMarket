const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
const Product = require('./product');


module.exports = class Cart {
    static addProduct(id,productPrice) {
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
                cart.products=[...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            }
            else{
                updateProduct = {id:id,qty:1};
                cart.products = [...cart.products,updateProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err =>{
                console.log("Error: " + err);
            });
        });
    }

    static showCart = (cb) =>{

        fs.readFile(p,(err,fileContent)=>{
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            

            for (let index = 0; index < cart.products.length; index++) {
               Product.getSpecificProd(cart.products[index].id,product=>{
                    const productsOnCart=[];
                    productsOnCart.push(product);
               });
            }

            cb(productsOnCart);
            console.log(productsOnCart);
        });
       
    }

};


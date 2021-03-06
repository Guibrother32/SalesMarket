const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');//show the path to the file that we want. (path,folder,file)
// const pCart = path.join(path.dirname(process.mainModule.filename),'data','productsFromCart.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    })
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.titleCons = title;
        this.imageUrlCons = imageUrl;
        this.priceCons = price;
        this.descriptionCons = description;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id === null) {
                this.id = Math.random().toString();
                products.push(this); // to use 'this' here you need to use an arrow function, otherwise this will not reference to the class temporary object// this here is the product.save() called at postAddProduct at products.js 
                fs.writeFile(p, JSON.stringify(products), (err) => { //stringfy parses it to string
                    console.log(err);
                });
            }
            else {
                const indexToUpdateProduct = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[indexToUpdateProduct] = this;
                // products[indexToUpdateProduct] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => { //stringfy parses it to string
                    console.log(err);
                });
            }

        });
    }
    static delete(id){
        getProductsFromFile(products =>{
            const updatedList = products.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(updatedList), (err) => { //stringfy parses it to string
                console.log(err);
            });
        });
    };

    static fetchAll(cb) { //static?
        getProductsFromFile(cb);
    }

    static getSpecificProd(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id); //find in all arrays which id is equal to the id that i want, then if its true (id === p.id) then take the right product (p) then stores in product
            cb(product);
        });
    }



};


// fs.readFile(p,(err,fileContent)=>{
//     if(err){
//         return cb([]);
//     }
//     const contFileArray = JSON.parse(fileContent);
//     console.log(contFileArray.length);
//     for (let index = 0; index < contFileArray.length; index++) {
//         if(prodId == contFileArray[index].id){
//             console.log('yo');
//             return contFileArray[index];
//         }
//     }
// });
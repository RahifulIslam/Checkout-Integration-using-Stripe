const Product = require('../models/productModel');

const addProduct = async (req, res)=> {
    const productData = req.body;
    const productImage = req.file;

    const product = new Product({
        name: productData.name,
        image: productImage.filename,
        price: productData.price,
        quantity: productData.quantity,
    });

    try{
        const newProduct = product.save();
        res.status(201).send({
            "message": "Product added successfully",
            "product": newProduct
        });
    } catch(err){
        return res.status(404).send("Something went wrong");
    }
}

module.exports = {
    addProduct,
}
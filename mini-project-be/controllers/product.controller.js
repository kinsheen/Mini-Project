const Product = require('../models/product.model')

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().exec()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get Product by ID
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).exec()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Create Product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update Product
const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const updatedProduct = await Product.findById(req.params.id).exec()
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// Delete Product
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id).exec();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'Product deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
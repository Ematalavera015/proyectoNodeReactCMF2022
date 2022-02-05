import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetcj all products
// @route GET /api/products
// @access Public

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10; // test 2
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $option: 'i',
            },
        } : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
    // Usar findById
    // Retornar el producto encontrado
    // Sino retornar status 404
    // Y arrojar el error: 'Product not found'

    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne(product);
        res.json({
            message: 'Product removed',
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
    // const product = new Product({
    //     name: 'Producto 10',
    //     price: 0,
    //     user: req.user._id,
    //     image: '/image/sample10.jpg',
    //     brand: 'Sample brand 10',
    //     category: 'Sample category',
    //     countInStock: 0,
    //     numReviews: 0,
    //     description: 'Sample description',
    // });
    const product = req.body;
    console.log('PRODUCT BACKEND ', product);
    const createdProduct = await Product.create(product);
    res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

export const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        category,
        countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.category = category ?? product.category;
        product.countInStock = countInStock ?? product.countInStock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private

export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Get top rated products
// @route GET /api/products/top
// @Access Public

export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ 'rating': 'desc' }).limit(3);

    res.status(200).json(products);
});
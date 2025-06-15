const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    quantity: Number
});

const Cart = mongoose.model("Cart" , cartSchema);

module.exports = Cart
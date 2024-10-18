const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Cart Product Must be Owned By A User'],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'A Product is needed'],
    },
    name: {
        type: String,
        required: [true, 'A Product Must have a name'],
        trim: true,
        minLength: [5, 'A Product name must have more or equal then 10 characters'],
        maxLength: [50, 'A Product name must have less or equal then 50 characters'],
    },
    price: {
        type: Number,
        required: [true, 'A Product must have a Price'],
    },
    quantity: {
        type: Number,
        maxLength: 100,
        minLength: 1,
    },
    image: {
        type: String,
        required: [true, 'Cart Product Needs One Image'],
    },
});

cartProductSchema.set('toObject', { virtuals: true });
cartProductSchema.set('toJSON', { virtuals: true });

// cartProductSchema.index({ user: 1, product: 1 }, { unique: true });

cartProductSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name',
    });

    return next();
});

// cartProductSchema.pre(/^find/, function (next) {
// this.populate({
// path: 'user',
// select: '+name',
// }).populate({
//     path: 'product',
//   });

//   return next();
// });

const CartProductModel = mongoose.model('cartProduct', cartProductSchema);

module.exports = CartProductModel;

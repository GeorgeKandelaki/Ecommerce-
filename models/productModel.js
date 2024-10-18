const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Product Must have a name'],
    trim: true,
    minLength: [5, 'A Product name must have more or equal then 10 characters'],
    maxLength: [
      50,
      'A Product name must have less or equal then 50 characters',
    ],
  },
  company: {
    type: String,
    required: [true, 'A Product must have a Company name'],
    minLength: [
      4,
      'A Product Company Name must have more or equal then 10 characters',
    ],
    maxLength: [
      40,
      'A Product Company Name must have less or equal then 50 characters',
    ],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A Product Must have a Description'],
    minLength: [5, 'Description Must Be at Least 5 Characters'],
  },
  price: {
    type: Number,
    required: [true, 'A Product must have a Price'],
  },
  discount: {
    type: Number,
  },
  images: [
    {
      type: String,
      minLength: [1, 'A Product must have at least one image'],
      required: [true, 'A Product must have at least one Image'],
    },
  ],
  // stock: {
  //  type: Number,
  //  required: [true, "A Product must have a stock"]
  // },
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

productSchema.virtual('discountPrice').get(function () {
  if (!this.discount) return this.price;
  return this.price - this.price * (this.discount / 100);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

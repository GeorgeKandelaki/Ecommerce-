const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../models/productModel');
const User = require('./../models/userModel');

dotenv.config({ path: './config.env' });

// Connect DATABASE
mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(() => console.log('DB connection successful!'));

// READ FILES
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/product.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import Data
async function importData() {
  try {
    await Product.create(products);
    console.log('Data Was Successfully Uploaded');
    await User.create(users);
    console.log('Data Was Successfully Uploaded');
  } catch (err) {
    console.log(err);
  }

  process.exit();
}

// Delete Data
async function deleteData() {
  try {
    await Product.deleteMany();
    console.log('Data Was Successfully Deleted');
    await User.deleteMany();
    console.log('Data Was Successfully Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();

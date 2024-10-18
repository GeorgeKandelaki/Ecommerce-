const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(() => console.log('Database Was Connected Succesfully...'));

const server = app.listen(port, () => {
  console.log(`Listening for Request on Port ${port}...`);
});

const path = require('path');
const express = require('express');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const cartProductRouter = require('./routes/cartProductRoutes');

const AppError = require('./utils/appError');

const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES

// Serving Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parse reading data from body into req.body
app.use(express.json({ rate: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartProductRouter);

// Other Requests
// app.all('*', (req, res, next) => {
//   return next(
//     new AppError(`Can't find ${req.originalUrl} on this Server!`),
//     404
//   );
// });

module.exports = app;

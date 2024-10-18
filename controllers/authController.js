const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove Password From User
  user.password = undefined;

  return res.status(statusCode).json({
    status: 'Success',
    token,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
  return next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if Email and Password Exist
  if (!email || !password)
    return next(new AppError('Email Or Password is Incorrect', 400));

  // 2) Check If User exists and password is Correct
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect Email Or Password'), 401);

  // 3) If password is correct, Grant Access to the account and sent token
  createSendToken(user, 200, res);

  return next();
});

exports.logout = catchAsync(async (req, res, next) => {
  return next();
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the Token and Check if it is there in header or as a cookie
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    return next(
      new AppError('You are not logged in, Please log in to access.', 401)
    );

  // 2) Verify the Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const currentUser = await User.findById(decoded.id).populate('cart');

  if (!currentUser)
    return next(
      new AppError('The User belonging to this token does no longer exist'),
      401
    );

  // 4) Grand Access to Protected Routes
  req.user = currentUser;
  res.locals.user = currentUser;
  return next();
});

exports.restrictTo = roles => {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    return next();
  };
};

exports.isLoggedIn = async (req, res, next) => {
  // 1) Check If cookies exist
  if (req.cookies.jwt) {
    try {
      // 2) Decode the Payload/Information/Data
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check If the user still exists
      const currentUser = await User.findById(decoded.id).populate('cart');

      if (!currentUser) return next("This User doens't Exist", 404);

      // 3) Check if user changed password after the token was issued
      // if (await currentUser.changedPasswordAfter(decoded.iat)) return next();

      // 4) Let the user access protected routes
      res.user = currentUser;
      res.locals.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  return next();
};

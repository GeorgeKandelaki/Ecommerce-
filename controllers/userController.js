const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const handlerFactory = require('./handlerFactory');

exports.resizePhotos = catchAsync(async (req, res, next) => {
  return next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  return next();
});

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User, 'cart');

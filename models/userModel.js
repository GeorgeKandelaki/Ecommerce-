const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have  a name'],
    minLength: [5, 'A name must be at least or equal to 5 characters'],
    maxLength: [40, 'A name must not be more then 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email'],
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'A User must have  a password'],
    minLength: [8, 'A Password Must be at Least 8 Characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    validate: {
      // This ONLY works on Create and Save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.pre('save', async function (next) {
  // If Pass was modified, run this functions
  if (!this.isModified('password')) return next();

  //  Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  //  Delete the passwordConfirm Field
  this.passwordConfirm = undefined;

  return next();
});

userSchema.virtual('cart', {
  ref: 'cartProduct',
  foreignField: 'user',
  localField: '_id',
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

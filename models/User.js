const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  verificationCode: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  this.verificationCode = Math.floor(100000 + Math.random() * 999999);
  next();
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    return {
      username: ret.username,
      email: ret.email,
      firstName: ret.firstName,
      lastName: ret.lastName,
    };
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.verifyCode = function (verificationCode) {
  return this.verificationCode == verificationCode;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

const { findLastKey } = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const { Schema } = mongoose;

const usersSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const User = mongoose.model('User', usersSchema);

module.exports = User;
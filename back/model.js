var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const userSchema = new Schema({
  fname: {
    type: String,
    required: [true, "First name is required"]
  },
  lname: {
    type: String,
    required: [true, "Last name is required"]
  },
  age: {
    type: String,
    required: [true, "Age is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  encrypted_password:{
    type: String,
    required: [true, "Password is required"]
  }
  friends: [],
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  ranking: Number
});

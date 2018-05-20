var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://database-user:test@ds119930.mlab.com:19930/suipi-game-db');

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
  },
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

userSchema.methods.setPassword = function (plainPassword, callback) {
  var user = this;
  bcrypt.hash(plainPassword, 12).then(function (hash) {
    user.encrypted_password = hash;
    callback();
  });
};

userSchema.methods.verifyPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.encrypted_password).then(function (valid) {
    callback(valid);
  });
};

userSchema.methods.simpleUser = function () {
  return {
    id: this._id,
    fname: this.fname,
    lname: this.lname,
    age: this.age,
    email: this.email,
    friends: this.friends,
    wins: this.wins,
    losses: this.losses
  }
}

var User = mongoose.model('User', userSchema);

module.exports = { User: User };

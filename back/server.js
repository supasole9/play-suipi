const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

const model = require('./model');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(session({secret: "deezBIGnuts", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(
  {usernameField: 'email'},
  function (email, password, done) {
  userModel.User.findOne({ email:email }).then(function (user) {
    if (!user) {
      return done(null, false)
    }
    user.verifyPassword(password, function (valid) {
      if (valid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }, function (err) {
    return done(err)
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id)
});

passport.deserializeUser(function(id, done) {
  userModel.User.findOne({ _id:id }).then(function(user) {
    done(null, user);
  }, function (err) {
    done(err);
  });
})

app.post("/session", passport.authenticate("local"), function (req,res) {
  res.sendStatus(201);
});

app.get("/me", function(req, res) {
  if (req.user) {
    res.json(req.user.simpleUser())
  } else {
    res.sendStatus(401);
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const Cards = require("../gameLogic/cards.js");

const userModel = require('./models/userModel');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static("public"));

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
      console.log("user not found");
      return done(null, false)
    }
    user.verifyPassword(password, function (valid) {
      if (valid) {
        console.log("success");
        return done(null, user);
      } else {
        console.log("bad password");
        return done(null, false);
      }
    });
  }, function (err) {
    console.log("some error");
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

app.post("/users", function(req, res) {
  console.log(req.body)
  var user = new userModel.User ({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email
  });
  user.setPassword(req.body.password, function () {
    user.save().then(function () {
      console.log("saving user")
      res.status(201).json(user);
    }, function (err) {
      if (err.errors) {
        var messages = {}
        for (var e in err.errors) {
          messages[e] = err.errors[e].message;
        }
        res.status(422).json(messages);
      }
      else {
        console.log("Post /User - Internal Error")
        res.sendStatus(500)
      }
    });
  });
});

app.post("/newgame", function (req, res) {
  var Deck = new Cards.deck();
  res.send(JSON.stringify({ Deck: Deck }));
})

app.listen(9090, function () {
     console.log("Server is ready and listening");
});

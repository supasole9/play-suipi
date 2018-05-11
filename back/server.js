const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

const model = require('./model');

const app = express();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cleanroutes = require('../index');
// option 1
// var routes = [];
// routes.push(require('./routes/healthcheck'));
// routes.push(require('./routes/users'));

//option2
const routes = require('./routes');

//option 3
const healthRouter = require('./routes/healthcheck');
const userRouter = require('./routes/users');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// option 1 & 2
app.use('/', cleanroutes(routes));

// option 3
// app.use('/', cleanroutes([healthRouter, userRouter]));

module.exports = app;

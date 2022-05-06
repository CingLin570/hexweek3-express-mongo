const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('./controller/http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

require('./connection');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// 捕捉404錯誤並前往錯誤處理程序
app.use(function(req, res, next) {
  http.notFound(req, res, next);
});

// 錯誤處理程序
app.use(function(err, req, res, next) {
  http.errorHandler(err ,req , res, next);
});

module.exports = app;

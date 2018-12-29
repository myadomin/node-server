var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
  // 允许跨域 后面设置了Access-Control-Allow-Credentials那这里就不能为'*'
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  // 允许cookie跨域通用
  res.header('Access-Control-Allow-Credentials', true)
  // 必须要设置下面才能然后post启用Content-Type: application/json;charset=UTF-8进行前后端传输
  // 因为启用了Content-Type json传输，所以触发了cors的复杂请求，所以post先发一个options请求校验跨域，然后再发一个post请求
  // 具体见 http://www.cnblogs.com/qunxiadexiaoxiangjiao/p/9446956.html
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

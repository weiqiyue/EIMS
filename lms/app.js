/*
 * @Author: your name
 * @Date: 2021-02-12 19:57:54
 * @LastEditTime: 2021-04-16 20:39:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs=require('ejs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var passport=require('passport')



// var indexRouter = require('./routes/');
// var usersRouter = require('./routes/users');
// 引入路由
var adminRouter=require('./routes/admin.js')
var profileRouter=require('./routes/profile.js')
var webinfoRouter=require('./routes/webinfo.js')
var packageRouter=require('./routes/package.js')
var carRouter=require('./routes/car.js')
var newRouter=require('./routes/new.js')
var logRouter=require('./routes/log.js')


var uploadRouter=require('./routes/upload.js')

var app = express();


// 链接数据库
mongoose.connect('mongodb://localhost/lms', {useNewUrlParser: true,useUnifiedTopology: true})
  .then((res)=>{
    console.log("链接数据库成功")
  })
  .catch((err)=>{
    console.log("链接数据库失败",err)
  })

  // 初始化passport
  app.use(passport.initialize());
  // 配置passport---向外部传递出去passport
  require('./config/passport.js')(passport)

// view engine setup---转换模板引擎
app.set("views",path.join(__dirname,"views"))
app.engine("html",ejs.__express)
app.set("view engine","html")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// 使用路由
app.use("/admin",adminRouter)
app.use("/profile",profileRouter)
app.use("/webinfo",webinfoRouter)
app.use("/package",packageRouter)
app.use("/car",carRouter)
app.use("/new",newRouter)
app.use("/log",logRouter)


app.use("/upload",uploadRouter)

// 使用中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json);

// 处理静态文件
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // 打印错误信息
  console.log("错误信息",err.message)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//允许跨域
app.all('*',function (req, res, next) {
  console.log(req,res)
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


module.exports = app;

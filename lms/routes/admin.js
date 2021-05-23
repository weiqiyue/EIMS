var express = require('express');
var mongoose=require('mongoose');
/* 上传文件 */
var multer=require('multer')
var fs=require('fs')

var ObjectId = require('mongodb').ObjectID;
var Admin=require('../model/admin.js')
var bodyParser=require('body-parser')
var bcrypt=require('bcrypt') //加密，密码匹配
var keys=require('../config/index') //工具类---token的加密名字
var jwt=require('jsonwebtoken') //分配token
var router=express.Router();
var passport=require('passport') //验证token

/* 解决post请求失败的使用的 */
// router.use(bodyParser.urlencoded({extended:false}));
// router.use(bodyParser.json)

router.get("/",(req,res)=>{
  res.json({msg:"admin根路由"})
})



/* 注册接口 */
router.post("/register",(req,res)=>{
  var user={}=req.body
  console.log("接受的参数",req.body)
  // 注册之前应该先查找有没有重名的---不能重名
  Admin.findOne({name:req.body.name})
    .then((doc)=>{
      // 如果存在重名的
      if(doc){
        return res.status(400).json({msg:'用户名重复'})
      }else{
        // 添加用户
        var newAdmin=new Admin(user)
        // 密码加密
        bcrypt.genSalt(10,(err,salt)=>{
          // hash是加密后的密码
          bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
            if(err){
              console.log("加密失败",err)
              throw err;
            }
            newAdmin.password=hash;
            newAdmin.save()
              .then((doc)=>{
                console.log("注册成功",doc)
                res.json({
                  msg:"注册成功",
                  status:true,
                  doc
                })
              })
              .catch((err)=>{
                console.log("注册失败",err)
                res.json({
                  msg:"注册失败",
                  status:false,
                  err:err
                })
              })
          })
        })
      }
    })
})

// 登录接口---远本应为post请求
router.post("/login",(req,res)=>{
  var password=req.body.password
  // 查询用户是否存在？
  Admin.findOne({name:req.body.name})
    .then((admin)=>{
      // if(!admin){
      //   return res.status(404).json({msg:'管理员不存在'})
      // }else{
        console.log("登录的值",admin)
        // 用户存在就进行密码匹配
        /* 第一个password是前端传递的，第二个是获取的数据库对象的 */
        bcrypt.compare(password,admin.password)
          .then((isMatch)=>{
            if(isMatch){
              console.log("匹配成功",isMatch)
              // 如果匹配成功，分配token

              // jwt.sign("规则","加密名字","过期时间","箭头函数")
              // 规则：可以自己定义，例如id,name等--对象的形式
              // 加密名字：可以自己写死，如写一个工具类，写死为secret并向外暴漏--String类型
              // 过期时间：对象形式--如：{expiresIn:3600}  ---1个小时
              // 箭头函数：(err,token)=>{}
              var rule={id:admin._id,name:admin.name,identity:admin.identity,password:admin.password,email:admin.email,sex:admin.sex,age:admin.age,address:admin.address,registerDate:admin.registerDate,remark:admin.remark,phone:admin.phone,avatar:admin.avatar}
              jwt.sign(rule,keys.secretOrKey,{expiresIn:14400},(err,token)=>{
                if(err){
                  console.log("获取token失败",err)
                  return res.status(400).json({msg:"获取token失败"})
                }else{
                  res.json({
                    msg:"获取token成功，登陆成功",
                    status:true,
                    doc:admin,
                    // 如果要验证token，必须要写固定的头
                    token:"Bearer "+token,
                  })
                }
              })
            }else{
              return res.status(400).json({msg:"登录失败，密码错误"})
            }
          })
          .catch(err=>{
            console.log("密码匹配失败",err)
          })
      // }
    })
    .catch((err)=>{
      console.log("没有该用户！")
      res.status(404).json({msg:"没有该用户"})
    })
})

// 获取全部数据----在有权限的情况下
router.get('/allAdmin',passport.authenticate('jwt', { session: false }),function(req, res) {
  // var formatdatetime='';
  Admin.find({})
    .then((doc)=>{
      console.log("获取全部的数据成功",doc)
      //转换时间格式
      // doc.forEach((item,index)=>{
        //转换时间格式
          // function addDateZero(num) {
          //     return (num < 10 ? "0" + num : num);
          // }
          // let d = new Date(item.registerDate);
          // formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
          // console.log("转化的时间",formatdatetime)
          // return formatdatetime
      // })
        res.json({
          msg:"获取全部数据成功",
          status:200,
          doc:doc
        })
    })
    .catch((err)=>{
      console.log("获取全部数据失败",err)
      res.json({
        msg:"获取全部数据失败",
        status:401,
        err:err
      })
    })
});

// 获取单个用户的数据--按照名字
router.get("/oneAdmin/:name",passport.authenticate('jwt',{session:false}),(req,res)=>{
  var name=req.params.name
  console.log("请求的条件",req.params.name)
  Admin.findOne({name:name})
  .then((doc)=>{
    console.log("获取单条数据成功",doc)
    res.json({
      msg:"获取单条数据成功",
      status:200,
      info:doc
    })
  })
  .catch((err)=>{
    console.log("获取单条数据失败",err)
    res.json({
      msg:"获取单条数据失败",
      status:401,
      info:err
    })
  })
})

// 修改用户的信息---根据id修改

/* 上传图片用的 */
var upload = multer({dest: './public/avatars/'});
var path=""

router.post('/up',passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
  console.log("admin上传图片时的参数",req.body)
  /* 上传图片 */
  let ret = {};
  ret['code'] = 20000;
  var file = req.file;
  if (file) {
      console.log("上传的文件",file)
      var fileNameArr = file.originalname.split('.');
      var suffix = fileNameArr[fileNameArr.length - 1];
      //文件重命名
      fs.renameSync('./public/avatars/' + file.filename, `./public/avatars/${file.originalname}`);
      file['newfilename'] = `${file.originalname}`;
  }
  ret['file'] = file;

  res.json({
    status:200,
    msg:"上传成功",
    info:ret
  })
  path=`avatars/${file.originalname}`
})

var user={
  // name:"",
  // registerDate:"",
  // identity:"",
  // avatar:"",
  // password:"",
  // age:"",
  // sex:"",
  // email:"",
  // phone:"",
  // address:"",
  // remark:"",
  // status:"",
}
router.post("/modify/:id",passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
  console.log("修改信息接受的参数",req.body)
  if(req.body.name){
    /* 不用return */
    user.name=req.body.name
  }
  if(req.body.registerDate){
    user.registerDate=req.body.registerDate
  }
  if(req.body.identity){
    user.identity=req.body.identity
  }

  if(path!=''){
    user.avatar=path
  }

  if(req.body.password){
    user.password=req.body.password
  }
  if(req.body.age){
    user.age=req.body.age
  }
  if(req.body.sex){
    user.sex=req.body.sex
  }
  if(req.body.email){
    user.email=req.body.email
  }
  if(req.body.phone){
    user.phone=req.body.phone
  }
  if(req.body.address){
    user.address=req.body.address
  }
  if(req.body.status){
    user.status=req.body.status
  }
  if(req.body.remark){
    user.remark=req.body.remark
  }
  console.log("组成的信息user",user)
  // 检查名字是否被人使用
  Admin.findOne({name:user.name})
  .then((user1)=>{
    if(user1){
      if(user1._id!=req.params.id){
        console.log("查找到的用户",user1)
        return res.json({
          msg:"该名字已经被人注册！",
          status:403,
        })
      }else{
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err){
              console.log("加密失败",err)
              throw err
            }
            user.password=hash
            console.log("加密的密码",user.password)
            Admin.findByIdAndUpdate({"_id":ObjectId(req.params.id)},{
            $set:user
            // {
            //   name:user.name,
            //   registerDate:user.registerDate,
            //   identity:user.identity,
            //   avatar:path,
            //   password:user.password,
            //   age:user.age,
            //   sex:user.sex,
            //   email:user.email,
            //   phone:user.phone,
            //   address:user.address,
            //   remark:user.remark,
            // }
            },{new:true})
            .then((doc)=>{
              if(!doc){
                // res.json({
                //   msg:"没有任何内容",
                //   status:404
                // })
                console.log("没有任何内容")
              }else{
                console.log("修改用户信息成功",doc)
                res.json({
                  msg:"修改信息成功",
                  status:200,
                  info:doc
                })
              }
            })
            .catch((err)=>{
              console.log("更新信息失败",err)
              res.json({
                msg:"更新信息失败",
                status:401,
                info:err
              })
            })
          })
        })
      }
    }else{
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
          if(err){
            console.log("加密失败",err)
            throw err
          }
          user.password=hash
          console.log("加密的密码",user.password)
          Admin.findByIdAndUpdate({"_id":ObjectId(req.params.id)},{
          $set:user
          // {
          //   name:user.name,
          //   registerDate:user.registerDate,
          //   identity:user.identity,
          //   avatar:path,
          //   password:user.password,
          //   age:user.age,
          //   sex:user.sex,
          //   email:user.email,
          //   phone:user.phone,
          //   address:user.address,
          //   remark:user.remark,
          // }
          },{new:true})
          .then((doc)=>{
            if(!doc){
              // res.json({
              //   msg:"没有任何内容",
              //   status:404
              // })
              console.log("没有任何内容")
            }else{
              console.log("修改用户信息成功",doc)
              res.json({
                msg:"修改信息成功",
                status:200,
                info:doc
              })
            }
          })
          .catch((err)=>{
            console.log("更新信息失败",err)
            res.json({
              msg:"更新信息失败",
              status:401,
              info:err
            })
          })
        })
      })
    }
  })
})

/* 根据id进行删除 */
router.get("/delete/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log("获取的id",req.params.id)
  Admin.findByIdAndDelete({"_id":ObjectId(req.params.id)})
  .then((doc)=>{
    console.log("删除成功",doc)
    res.json({
      status:200,
      msg:"删除成功",
      info:doc
    })
  })
  .catch((err)=>{
    console.log("删除失败",err)
    res.json({
      status:401,
      msg:"删除失败",
      info:err
    })
  })

})


// 如果获取到token并且想要获得一定的信息，此时需要验证token
// router.get("/verify","验证的方法",(req,res)={})
/* 如果想要进行测试需要传入参数--Authorization=token值 */
router.get("/verify",passport.authenticate('jwt', { session: false }),(req,res)=>{
  // res.json(req.user)
  res.json({
    id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
  })
})


module.exports = router;

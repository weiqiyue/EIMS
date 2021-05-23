const { json } = require('body-parser');
var express = require('express');

/* 上传文件 */
var multer=require('multer')
var fs=require('fs')

var router=express.Router();
var passport=require('passport')
var New=require('../model/new.js')

router.get('/',(req,res)=>{
    res.json({
        msg:"新闻、物流介绍的根路由"
    })
})

// 获取全部的新闻
router.get("/all",passport.authenticate('jwt', { session: false }),(req,res)=>{
    New.find({})
    .then((doc)=>{
        console.log("查找全部新闻成功",doc)
        res.json({
            msg:"查找全部新闻成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("查找全部新闻失败",err)
        res.json({
            msg:"查找全部新闻失败",
            status:401,
            info:err
        })
    })
})

// 根据标题查询
router.get("/one/:title",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据标题查询的参数",req.params.title)
    New.findOne({title:req.params.title})
    .then((doc)=>{
        console.log("根据标题查询成功",doc)
        res.json({
            msg:"根据标题查询成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("根据标题查询失败",err)
        res.json({
            msg:"根据标题查询失败",
            status:401,
            info:err
        })
    })
})


/* 上传图片用的 */
var upload = multer({dest: './public/news/'});
var path=""

router.post('/up', passport.authenticate('jwt', {
    session: false
}), upload.single('file'), (req, res) => {
    console.log("admin上传图片时的参数", req.body)
    /* 上传图片 */
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        console.log("上传的文件", file)
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('./public/news/' + file.filename, `./public/news/${file.originalname}`);
        file['newfilename'] = `${file.originalname}`;
    }
    ret['file'] = file;

    path = `news/${file.originalname}`
    res.json({
        status: 200,
        msg: "上传成功",
        info: ret,
        path:path
    })
})
// 更新---根据标题名来进行查询
router.post("/update/:title",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据标题更新的参数",req.params.title)
    var xw={}
    if(req.body.title){
        xw.title=req.body.title
    }
    if(path){
        xw.img=req.body.img
    }
    if(req.body.content){
        xw.content=req.body.content
    }
    if(req.body.pubtime){
        xw.pubtime=req.body.pubtime
    }
    if(req.body.detail){
        xw.detail=req.body.detail
    }
    New.findOneAndUpdate({title:req.params.title},{$set:xw},{new:true})
    .then((doc)=>{
        console.log("更新对应title成功",doc)
        res.json({
            msg:"更新对应title成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("更新对应title失败",err)
        res.json({
            msg:"更新对应title失败",
            status:401,
            info:err
        })
    })
})

// 添加新闻
router.post("/add",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("接受的参数",req.body)
    var new1=new New(req.body)
    new1.save()
    .then((doc)=>{
        console.log("添加成功",doc)
        res.json({
            msg:"添加成功",
            info:doc
        })
    })
    .catch((err)=>{
        console.log("添加失败",err)
        res.json({
            msg:"添加失败",
            info:err
        })
    })
})


//删除---根据title
router.get("/delete/:title",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("根据名字删除接受的参数",req.params.title)
    New.findOneAndDelete({title:req.params.title})
    .then((doc)=>{
        console.log("删除成功",doc)
        res.json({
            msg:"删除成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("删除失败",err)
        res.json({
            msg:"删除失败",
            status:401,
            info:err
        })
    })
})




module.exports = router;
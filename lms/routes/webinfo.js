var express = require('express');
var router=express.Router();
var passport=require('passport')
var Carousel=require('../model/carousel.js')

/* 上传文件 */
var multer=require('multer')
var fs=require('fs')


router.get("/",(req,res)=>{
    console.log("这是管理前端页面的信息")
    res.json({msg:"weninfo的信息"})
})


// 查询全部的轮播图---或者说只获取后三个
router.get("/all",passport.authenticate('jwt',{ session:false }),(req,res)=>{
    console.log("这是得到全部轮播图数据的接口")
    Carousel.find({})
    .then((doc)=>{
        console.log("获取全部的轮播图数据成功",doc)
        res.json({
            msg:"获取全部轮播图--成功",
            status:200,
            info:doc.reverse().splice(0,3)
        })
    })
    .catch((err)=>{
        console.log("获取全部的轮播图数据失败",err)
        res.json({
            msg:"获取全部轮播图--失败",
            status:401,
            info:err
        })
    })
})


// 更换--多个-轮播图的接口--[注意：要验证token]----其实就是向数组里面添加，只取后三
// 1
/* 上传图片用的 */
var upload = multer({dest: './public/carousels/'});
var path = ""

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
        fs.renameSync('./public/carousels/' + file.filename, `./public/carousels/${file.originalname}`);
        file['newfilename'] = `${file.originalname}`;
    }
    ret['file'] = file;

    path = `carousels/${file.originalname}`
    res.json({
        status: 200,
        msg: "上传成功",
        info: ret,
        path:path
    })
})
// 2
router.post("/upmany",passport.authenticate('jwt', { session: false }),(req,res)=>{
    var imgs=[]
    console.log("接受的多个轮播图的参数",req.body)
    imgs=req.body
    console.log("更新的信息",imgs)
    // 新加的
    imgs.forEach((item,index)=>{
        var carousel=new Carousel({
            img:item.path,
            uptime:new Date()
        })
        console.log("每一个caroursel",carousel)
        carousel.save()
        .then((doc)=>{
            console.log("保存--多个--轮播图成功",doc)
            /* 这里有个警告---连续存储-【多次设置请求头】 */
            res.end({
                msg:"保存--多个--轮播图成功",
                status:true,
                info:doc
            })
        })
        .catch((err)=>{
            console.log("保存--多个--轮播图失败",err)
            return res.json({
                msg:"保存--多个--轮播图失败",
                status:false,
                info:err
            })
        })
    })
})
// 3---删除静态文件(此时还没有存入到数据库)
/* 删除文件 */
router.get('/delete/:filename', (req, res) => {
    // fs.unlinkSync("./public/avatars/"+req.params.filename);
    try {
        fs.unlinkSync('./public/carousels/'+req.params.filename);
        console.log('文件已被成功地删除');
        res.json({
            msg:"删除成功",
            status:200,
        })
    } catch (err) {
        // 处理错误
        res.json({
            msg:"删除失败",
            status:400,
            info:err,
        })
    }
})


//更新---单个轮播图
router.post("/upone",passport.authenticate('jwt', { session: false }),(req,res)=>{
    var imgs={}
    imgs=req.body
    console.log("更新的信息",imgs)
    // 新加的
    var carousel=new Carousel(imgs)
    carousel.save()
    .then((doc)=>{
        console.log("保存--单个--轮播图成功",doc)
        /* 这里有个警告---连续存储-【多次设置请求头】 */
        res.json({
            msg:"保存--单个--轮播图成功",
            status:true,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("保存--单个--轮播图失败",err)
        return res.json({
            msg:"保存--单个--轮播图失败",
            status:false,
            info:err
        })
    })
})


module.exports = router;

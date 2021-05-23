var express = require('express');
var router=express.Router();
var passport=require('passport')
var Car=require('../model/car.js')

router.get('/',(req,res)=>{
    console.log("车辆路由")
    res.json({
        msg:"车辆路由"
    })
})

//添加车辆 
router.post("/addcar",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("添加车辆接受的参数",req.body)
    var car={}=req.body
    Car.findOne({carcode:req.body.carcode})
    .then((che)=>{
        if(che){
            return res.json({
                msg:"错误，车牌号重复了",
                status:400
            })
        }else{
            var newCar=new Car(car)
            newCar.save()
            .then((doc)=>{
                console.log("添加车辆成功",doc)
                res.json({
                    msg:"添加车辆成功",
                    status:200,
                    info:doc
                })
            })
            .catch((err)=>{
                console.log("添加车辆失败",err)
                res.json({
                    msg:"添加车辆失败",
                    status:401,
                    info:err
                })
            })
        }
    })
})

// 获取所有的车辆
router.get("/allcar",passport.authenticate('jwt', { session: false }),(req,res)=>{
    Car.find({})
    .then((doc)=>{
        // console.log("获取所有的车辆成功",doc)
        res.json({
            msg:"获取所有的车辆成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        // console.log("获取所有的车辆失败",err)
        res.json({
            msg:"获取所有的车辆失败",
            status:401,
            info:err
        })
    })
})

// 根据_id更新
router.post("/modifycar/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("修改车辆接受的参数",req.params.id)
    var car={}
    if(req.body.carcode){
        car.carcode=req.body.carcode
    }
    if(req.body.brand){
        car.brand=req.body.brand
    }
    if(req.body.time){
        car.time=req.body.time
    }
    if(req.body.carman){
        car.carman=req.body.carman
    }
    if(req.body.carphone){
        car.carphone=req.body.carphone
    }
    if(req.body.carremark){
        car.carremark=req.body.carremark
    }else if(req.body.carremark==''){
        car.carremark=''
    }
    
    Car.findByIdAndUpdate({"_id":req.params.id},{$set:car},{new:true})
    .then((doc)=>{
        console.log("根据id更新成功",doc)
        res.json({
            msg:"更新成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("更新失败",err)
        res.json({
            msg:"更新失败",
            status:401,
            info:err
        })
    })
})

// 根据id删除
router.get("/deletecar/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log("删除车辆接受的参数",req.params.id)
    Car.findByIdAndDelete({"_id":req.params.id})
    .then((doc)=>{
        console.log("删除车辆成功",doc)
        res.json({
            msg:"删除成功",
            status:200,
            info:doc
        })
    })
    .catch((err)=>{
        console.log("删除车辆失败",err)
        res.json({
            msg:"删除失败",
            status:401,
            info:err
        })
    })
})

module.exports = router;
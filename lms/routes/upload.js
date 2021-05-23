/*
 * @Author: your name
 * @Date: 2021-04-16 14:22:53
 * @LastEditTime: 2021-04-17 00:16:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\routes\upload.js
 */
var express = require('express');
var fs=require("fs")
var path=require('path')
var router=express.Router();
var multer = require('multer');//引入multer




/* 上传文件 */
var upload = multer({dest: './public/avatars/'});//设置上传文件存储地址
/* 
upload.single('file')---是单文件上传
关于单文件还是多文件上传参考：
    https://github.com/chyingp/nodejs-learning-guide/blob/master/%E8%BF%9B%E9%98%B6/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0-multer.md
    https://www.cnblogs.com/lulin1/p/6477525.html
*/
router.post('/up', upload.single('file'), (req, res, next) => {
    // 实际就是一个文件对象
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        console.log("上传的文件",file)
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        /* 
            文件重命名：
            格式参考:http://ourjs.com/detail/5a4245953506837194998bcf
         */
        fs.renameSync('./public/avatars/' + file.filename, `./public/avatars/${file.originalname}`);
        file['newfilename'] = `${file.originalname}`;
    }
    ret['file'] = file;
    // res.send(ret);
    res.json({
        status:200,
        msg:ret
    })
})

/* 下载文件 */
router.get('/down/:filename/:oldname', (req, res, next) => {
    console.log("接受的参数",req.params.filename,req.params.oldname)
    /* 这两个名字保持一致即可 */
    var filename = req.params.filename;
    var oldname = req.params.oldname;
    var file = './public/avatars/' + filename;
    console.log("拼接的路径",file)
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
        'Content-Disposition': 'attachment; filename=' + encodeURI(oldname),//告诉浏览器这是一个需要下载的文件
    });//设置响应头
    var readStream = fs.createReadStream(file);//得到文件输入流
    debugger
    readStream.on('data', (chunk) => {
        res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
    });
    readStream.on('end', () => {
        res.end("哈哈")
    })
})

/* 删除文件 */
router.get('/delete/:filename', (req, res) => {
    // fs.unlinkSync("./public/avatars/"+req.params.filename);
    try {
        fs.unlinkSync('./public/avatars/'+req.params.filename);
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


module.exports = router;
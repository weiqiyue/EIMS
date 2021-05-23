/*
 * @Author: your name
 * @Date: 2021-03-04 23:42:22
 * @LastEditTime: 2021-03-05 12:45:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\config\Reptile.js
 */

var axios = require("axios")
var MongoClient = require("mongodb").MongoClient;

/* 插入一条的异步方法 */
function insertOne(collection, obj) {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017/', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },(err,db)=>{
                if (err) {
                    console.log("抛错1", err)
                }
                var dbo=db.db("weiqi")
                dbo.collection(collection).insertOne(obj, () => {
                    if (err) {
                        console.log("添加insertOne出错", err)
                    }
                    console.log("插入insertOne成功", obj)
                    db.close()
                    resolve()
                })
            })
            })
            // 注意，错误是会产生错误对象的
    }

/* 插入多条数据 */
function insertMany(collection, arr) {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017/', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },(err,db)=>{
                if (err) {
                    console.log("抛错2", err)
                }
                var dbo=db.db("weiqi")
                dbo.collection(collection).insertOne(arr, () => {
                    if (err) {
                        console.log("添加insertOne出错", err)
                    }
                    console.log("插入insertOne成功", arr)
                    db.close()
                    resolve()
                })
            })
    })
}

/* 获取全部的方法 */
async function getList() {
    var httpUrl = "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js"
    var result = await axios.get(httpUrl)
    console.log("获取全部的数据成功", result.data.hero)
    await insertMany("herolist", result.data.hero)
    return result.data.hero
}

/* 获取具体的方法---最终的 */
async function getOne(heroId) {
    var httpUrl = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroId}.js`
    var result = await axios.get(httpUrl)
    console.log("获取全部的数据成功", result.data.hero)
    await insertMany("heroinfo", result.data.hero)
    return result.data
}

/* 主函数 */
async function run() {
    var herolist = await getList()
    await herolist.reduce(async (prev, item) => {
        await prev
        return new Promise(async (resolve, reject) => {
            await getOne(item.heroId)
            resolve()
        })
    }, Promise.resolve())
}
// run()

// module.exports={
//     insertMany,
//     insertOne,
//     getList,
//     getOne,
//     run
// }
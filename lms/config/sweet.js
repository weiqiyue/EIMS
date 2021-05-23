/*
 * @Author: your name
 * @Date: 2021-03-05 21:19:43
 * @LastEditTime: 2021-03-07 10:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms\config\sweet.js
 */

/* 
1:page.$()--获取单个元素  page.$$()--获取多个元素
    使用page.$()---使用 元素.getProperty('属性名')---可以获取元素相对应的属性--比如a标签的href属性
    再使用  属性._remoteObject.value----获取对应的值----比如href属性的值
    在使用正则获取想要的值（字符串）----值.split('?url=')[1]----获取href属性的值的 url= 后面的值
2:将json格式的数据转化成字符串（利用正则）----/(\{.*?\})/igs
3:input(page.$()获取的元素).focus()----聚焦到输入框
4:page.keyboard.type("甜品")----想输入框输入内容
5:btn(page.$()).click()-----点击按钮的事件
6:取消元素的冒泡事件：--例如：
    await page.$eval('.search input[name="Submit"]',(el)=>{
        el.addEventListener('click',function(event)=>{
            event.cancleBubble=true
        })
    })
7:slowMo:250,----每个步骤放慢250ms



*/


var puppeteer = require('puppeteer');

(async () => {
    // puppeteer.launch：实例化浏览器
    /* 可以传入options对象--设置浏览器有界面或者无界面-----无界面性能更高 */
    const options={
        headless:false,  //有界面
        defaultViewport:{
            width:1600,  //不用带单位
            height:800,
        },
        // 每个步骤放慢250ms
        slowMo:250,
    }
    const browser = await puppeteer.launch(options);
    /* 打开界面 */
    const page = await browser.newPage();
    await page.goto('https://www.jd.com/');
    await page.screenshot({path: '../data/screenshot.png'}); //page页面的方法--截图
    /* 获取元素并返回数据是page的方法---$$eval或$eval-----最好使用$$eval */
    page.$$eval('#navitems ul li a', (el) => {
        el.forEach((item,index)=>{
            console.log(item.innerHTML)
        })
    });
    /* 监听打印事件----页面事件----要想监听成功,被监听的方法  前面不能带有定义的变量 */
    page.on('console', (...args)=> {
        console.log(args)
    });

    /* 聚焦输入框---输入数据 */
    // 获取输入框
    var input=await page.$("#search .form input")
    //聚焦到输入框
    await input.focus()
    // 向输入框输入内容
    await page.keyboard.type("甜品")
    /* 点击按钮搜索  */
    var btn=await page.$("#search .form button")
    // 点击
    btn.click()

    var arr=[]
    
    // 其他操作...
    // await browser.close();
})();

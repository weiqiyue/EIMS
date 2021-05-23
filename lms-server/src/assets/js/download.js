/*
 * @Author: your name
 * @Date: 2021-04-16 19:47:19
 * @LastEditTime: 2021-04-16 20:14:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\assets\js\download.js
 */
const downloadUrl = url => {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
        document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
};
module.exports = downloadUrl;
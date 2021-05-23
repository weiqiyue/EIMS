/*
 * @Author: your name
 * @Date: 2021-02-26 14:53:21
 * @LastEditTime: 2021-04-24 15:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\mixins\index.js
 */
export const mixin={
    methods: {
        // 将后台的图片展示出来---用于表格
        getUrl(url){
            return `${this.$store.state.host}/${url}`
        }
    },
}
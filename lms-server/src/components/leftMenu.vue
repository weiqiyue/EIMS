<template>
    <div class="menu">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="collapse" router background-color="#334256" text-color="#ffffff" active-text-color="#614ad3" :collapse-transition="false">
            <template>
                <div class="nav" v-on:click="isCollapse">
                    <i class="fa fa-navicon fold"></i>
                </div>
            </template>
            <!-- 1级 -->
                <template v-for="(item,index) in menulist">
                <el-submenu v-if="item.children && item.children.length!=0" :index="item.index" v-bind:key="index" id="WQ">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <!-- 2级 -->
                    <template v-for="itemChild in item.children">
                        <el-submenu v-if="itemChild.children && itemChild.children.length!=0" :index="itemChild.index" :key="itemChild.index" id="leftTwo">
                            <template slot="title">
                                <i :class="itemChild.icon"></i>
                                <span>{{itemChild.title}}</span>
                            </template>
                            <!-- 3级 -->
                            <template v-for="itemChild_Child in itemChild.children">
                                <el-menu-item :index="itemChild_Child.index" :key="itemChild_Child.index" style="border:0 !important;">
                                    <template slot="title">
                                        <i :class="itemChild_Child.icon"></i>
                                        <span slot="title">{{itemChild_Child.title}}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                        <!-- 最后不要忘记判断2级菜单，第2个含children的对象的children是否为空 -->
                        <template v-else> 
                            <template>
                                <el-menu-item  :index="itemChild.index" :key="itemChild.index"  id="lefttwoOne">
                                    <template slot="title" popper-class="Tips">
                                        <i :class="itemChild.icon"></i>
                                        <span slot="title">{{itemChild.title}}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </template>
                    </template>
                </el-submenu>
                <!-- 最后不要忘记判断1级菜单，第1个含children的对象的children是否为空 -->
                <template v-else> 
                    <template>
                        <el-menu-item :index="item.index" :key="item.index" id="one"> 
                            <!-- <template slot="title"> -->
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.title}}</span>
                            <!-- </template> -->
                        </el-menu-item>
                    </template>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import $ from "jquery"
import bus from '../assets/js/bus.js'
export default {
    data(){
        return{
            collapse:true,
            menulist:[
                {
                    icon:"el-icon-s-home",
                    index:"home",
                    title:"首页"
                },
                {
                    icon:"el-icon-s-custom",
                    index:"",
                    title:"个人资料",
                    children:[
                        {
                            icon:"el-icon-user",
                            index:"infoShow",
                            title:"查看资料"
                        },
                        { 
                            icon:"el-icon-edit",
                            index:"modify",
                            title:"修改资料",
                        }
                    ]
                },
                {
                    icon:"el-icon-s-data",
                    index:"odd",
                    title:"我的订单",
                    // children:[]
                }
            ],
        }
    },
    methods:{
        isCollapse(){
            this.collapse=!this.collapse
            bus.$emit("collapse",this.collapse)   //向其他的页面发送是否展开的信息
            console.log("当前按钮的collapse的状态",this.collapse)
        },
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','')
        }
    }
}
</script>

<style scoped>
/* 左侧菜单 */
.menu{
    /* 因为外部要随着--内部改变 */
    width:auto;
    height:calc(100vh - 58px);
    position: absolute;
    top:58px;
    left:0;
    /* bottom:0; */  /* bug点--上方对不齐 */
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* border:2px solid palegreen; */
}
.el-menu-vertical-demo{
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    border:1px solid #334256;
    /* height:calc(100vh - 60px); */
    text-align: left;
    /* border:2px solid red; */

}
.el-menu-vertical-demo::-webkit-scrollbar{
    width:0 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width:13vw;
}

/* 没有孩子的一级菜单 */
.el-menu-vertical-demo .el-menu-item:hover{
    outline: 0 !important;
    font-weight: bold !important;
    border:0 !important;
    color:purple !important;
}
/* .el-menu-vertical-demo{
    border:2px solid green;
    transition: all 0.3s ease-in-out  !important;
} */
/* 有孩子的一级菜单 */
/deep/#WQ>.el-submenu__title:hover{
    border:0;
    color:purple !important;
}

/* 子菜单样式 */
#lefttwoOne{
    width:77%;  /* 定位解决不了溢出的问题---就利用改变长度 */
    height:48px;
    margin-left:16.9% !important;
    padding-left:30% !important;
}
.el-menu-vertical-demo .el-submenu:hover{
    border:0 !important;
    color:purple !important;
}

/* 收缩时 */
/* 图标的样式 */
/* 首页 */
/deep/#one>.el-tooltip{
    width:62% !important; /* 定位解决不了溢出的问题---就利用改变长度 */
    height:100%;
}



/* 其他的 */
.fold{
    color:#74828f;
    font-size:24px;
    position: relative;
    left:22px;
    cursor: pointer;
}

</style>

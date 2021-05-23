<template>
    <div class="Order">
        <sourcemenu v-if="defaultrouter=='/order'" v-on:update1="getactive"></sourcemenu>
        <div :class="currentindex==2 && defaultrouter.indexOf('/order')!=-1?defaultrouter.indexOf('/order/')!=-1?'orderMenuTwo':'orderMenuOne':'orderMenu'">
            <ul>
                <li v-for="(item, index) in orderMenu" :key="index" :class="index==currentindex?'orderactive':''" v-on:click="clickred(index)">{{item}}</li>
            </ul>
            <div class="menuthree" v-if="currentindex==2">
                <p>JY支持，你要的这里都有</p>
                <p>我们期待为您带来更加优质的线上服务体验</p>
            </div>
        </div>
        <!-- 当前的定位 -->
        <div class="position" v-if="currentindex==0">
            <p>您当前的位置：<span>{{positionInfo.address}}</span></p>
        </div>
        <!-- <sourcesidebutton></sourcesidebutton> -->
        <!-- 寄件栏 -->
        <div :class="active==0?'orderbody':'orderbodyone'" v-if=" currentindex==0">
            <div class="move">
                <el-steps :active="active" align-center finish-status="success">
                    <el-step title="寄件人信息"></el-step>
                    <el-step title="收件人信息"></el-step>
                    <el-step title="完成下单"></el-step>
                </el-steps>
            </div>
            <!-- 寄快递 -->
            <div class="Mail" v-if="active==0">
                <p>寄件人信息</p>
                <el-form :model="mailForm" status-icon :rules="rules" ref="mailForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" v-model="mailForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input type="text" v-model="mailForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹名字" prop="packagename">
                        <el-input type="text" v-model="mailForm.packagename" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹数量" prop="packagenum">
                        <el-input type="text" v-model.number="mailForm.packagenum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹重量" prop="packageweight">
                        <el-input type="text" v-model.number="mailForm.packageweight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="省市区" prop="area">
                        <!-- <el-input type="text" v-model="mailForm.area" autocomplete="off" v-on:focus="handlefocus" v-if="InputFlag"></el-input> -->
                        <div class="Select">
                            <el-select v-model="provinceValue" placeholder="请选择省" @change="selectProvimce" style="width:33%;">
                                <el-option
                                    v-for="(item,index) of provincearr"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                            <el-select v-model="cityValue" placeholder="请选择市" @change="selectcity" style="width:33%;">
                                <el-option v-for="(item,index) of cityarr" :key="index" :label="item.name" :value="item.id" class="box"></el-option>
                            </el-select>
                            <el-select placeholder="请选择区" v-model="RegionValue" v-on:change="handleBlur" style="width:33%;">
                                <el-option
                                    v-for="(item,index) of regionarr"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input type="text" v-model="mailForm.address" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item  label="备注" prop="remark" >
                        <el-input type="textarea" class="remark" maxlength="100" show-word-limit  v-model="mailForm.remark"  clearable  placeholder="请输入内容" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('mailForm')">下一步</el-button>
                        <el-button @click="resetForm('mailForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 收快递 -->
            <div class="Mail" v-if="active==1">
                <p>收件人信息</p>
                <el-form :model="collectForm" status-icon :rules="rules" ref="collectForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" v-model="collectForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input type="text" v-model="collectForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="省市区" prop="area">
                        <!-- <el-input type="text" v-model="mailForm.area" autocomplete="off" v-on:focus="handlefocus" v-if="InputFlag"></el-input> -->
                        <div class="Select">
                            <el-select v-model="provinceValue1" placeholder="请选择省" @change="selectProvimceone" style="width:33%;">
                                <el-option
                                    v-for="(item,index) of provincearr1"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                            <el-select v-model="cityValue1" placeholder="请选择市" @change="selectcityone" style="width:33%;">
                                <el-option v-for="(item,index) of cityarr1" :key="index" :label="item.name" :value="item.id" class="box"></el-option>
                            </el-select>
                            <el-select placeholder="请选择区" v-model="RegionValue1" v-on:change="handleBlurone" style="width:33%;">
                                <el-option
                                    v-for="(item,index) of regionarr1"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input type="text" v-model="collectForm.address" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="prev('collectForm')">上一步</el-button>
                        <el-button type="primary" @click="submitFormone('collectForm')">下一步</el-button>
                        <el-button @click="resetFormone('collectForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 完成 -->
            <div class="Mail" v-if="active>=2">
                <div class="congratulate">
                    <div class="congratulateTitle">
                        <i class="fa fa-bullhorn" style="font-size:48px;color:red"></i>
                        <p style="margin:0px 0 0 20px;color:#e41749;">完成寄件！</p>
                    </div>
                    <p><span style="font-size:14px;">请牢记您的包裹单号：</span><span style="color:#08ffc8;">{{code}}</span></p>
                    <div class="congratulateBtn">
                        <el-button type="info" @click="prev1()">上一步</el-button>
                        <el-button type="primary" @click="go()">确定</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 填完订单信息---弹出对话框检查订单的信息###### -->
        <!-- <div class="Dialog"> -->
            <el-dialog
            title="修改订单信息"
            :visible.sync="dialogVisible"
            width="80%"
            center
            class="modifyPackage"
            :show-close="false">
                <!-- 对话框镶嵌表单--将寄件人、收件人的信息合并 -->
                <!-- 寄件人部分###################### -->
                <el-form :model="packageForm" status-icon :rules="rules" ref="packageForm" label-width="120px" class="packageform" :hide-required-asterisk="true">
                    <el-form-item label="寄件人姓名" prop="Susername">
                        <el-input type="text" v-model="packageForm.Susername" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件人号码" prop="Sphone">
                        <el-input type="text" v-model="packageForm.Sphone" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="寄件人地址" prop="sarea"> -->
                        <!-- <el-input type="text" v-model="mailForm.area" autocomplete="off" v-on:focus="handlefocus" v-if="InputFlag"></el-input> -->
                        <!-- <div class="Select">
                            <el-select v-model="provinceValue" placeholder="请选择省" @change="selectProvimce">
                                <el-option
                                    v-for="(item,index) of provincearr"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                            <el-select v-model="cityValue" placeholder="请选择市" @change="selectcity">
                                <el-option v-for="(item,index) of cityarr" :key="index" :label="item.name" :value="item.id" class="box"></el-option>
                            </el-select>
                            <el-select placeholder="请选择区" v-model="RegionValue" v-on:change="handleBlur">
                                <el-option
                                    v-for="(item,index) of regionarr"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                        </div> -->
                    <!-- </el-form-item> -->
                    <el-form-item label="寄件人详细地址" prop="Saddress">
                        <el-input type="text" v-model="packageForm.Saddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹名字" prop="packagename">
                        <el-input type="text" v-model="packageForm.packagename" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹数量" prop="packagenum">
                        <el-input type="text" v-model.number="packageForm.packagenum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包裹重量" prop="packageweight">
                        <el-input type="text" v-model.number="packageForm.packageweight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item  label="备注" prop="remark" class="remark">
                        <el-input type="textarea"  maxlength="100" show-word-limit  v-model="packageForm.oremark"  clearable  placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <!-- 收件人部分################# -->
                    <el-form-item label="收件人姓名" prop="Cusername">
                        <el-input type="text" v-model="packageForm.Cusername" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人号码" prop="Cphone">
                        <el-input type="text" v-model="packageForm.Cphone" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="收件人地址" prop="carea"> -->
                        <!-- <el-input type="text" v-model="mailForm.area" autocomplete="off" v-on:focus="handlefocus" v-if="InputFlag"></el-input> -->
                        <!-- <div class="Select">
                            <el-select v-model="provinceValue1" placeholder="请选择省" @change="selectProvimceone">
                                <el-option
                                    v-for="(item,index) of provincearr1"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                            <el-select v-model="cityValue1" placeholder="请选择市" @change="selectcityone">
                                <el-option v-for="(item,index) of cityarr1" :key="index" :label="item.name" :value="item.id" class="box"></el-option>
                            </el-select>
                            <el-select placeholder="请选择区" v-model="RegionValue1" v-on:change="handleBlurone">
                                <el-option
                                    v-for="(item,index) of regionarr1"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    class="box"
                                ></el-option>
                            </el-select>
                        </div> -->
                    <!-- </el-form-item> -->
                    <el-form-item label="收件人详细地址" prop="Caddress">
                        <el-input type="text" v-model="packageForm.Caddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click="cancel('packageForm')">取消</el-button>
                        <el-button type="primary" @click="packageModify('packageForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        <!-- </div> -->
        <!-- 查询栏####### -->
        <div class="pollbody" v-if="currentindex==1">
            <div class="pollsearch">
                <!-- 搜索框 -->
                <div class="frame">
                    <el-input placeholder="请输入运单号" v-model="code" class="input-with-select" clearable style="width:600px;">
                        <el-button slot="append" icon="el-icon-search" style="background-color:red !important;color:white !important;" v-on:click="check()">查询</el-button>
                    </el-input>
                </div>
                <div class="pollTitle">
                    <h2>我的包裹</h2>
                </div>
                <hr>
                <div class="pollContent">
                    <div class="empty" v-if="pollFlag==false">
                        <img src="https://s3.jpg.cm/2021/03/16/3FhLO.png">
                        <p>暂无运单</p>
                    </div>
                    <div class="Be" v-if="pollFlag==true">
                        <div class="BeTitle">
                            <div class="BeTitleFont">
                                <i class="el-icon-back"></i>
                                <p>返回列表</p>
                            </div>
                            <div class="map">
                                <p>开启地图模式</p>
                                <el-checkbox v-model="checked" style="margin-top:7px;" v-on:change="mapclick"></el-checkbox>
                            </div>
                        </div>
                        <!-- 分界线 -->
                        <hr>
                        <!-- 展示物流信息的区域 -->
                        <div class="mapInfo">
                            <!-- 1、地图区域 -->
                            <div id="container1" class="maparea" v-if="checked==true"></div>
                            <!-- 2、信息框 -->
                            <div class="InfoBox" v-if="InfoFlag==true">
                                <!-- 第一部分---路径 -->
                                <div class="InfoBoxCode">
                                    <!-- <p>运单号:<span style="font-size:16px;color:#d9534f;font-weight:200;">SF1046556881008</span></p> -->
                                    <p>运单号:<span style="font-size:16px;color:#d9534f;font-weight:200;">{{code}}</span></p>
                                    <div class="InfoBoxCodePath">
                                        <!-- <p>深圳市</p> -->
                                        <p>{{startCity}}</p>
                                        <i class="el-icon-right"></i>
                                        <!-- <p>鹤壁市</p> -->
                                        <p>{{endCity}}</p>
                                    </div>
                                </div>
                                <!-- 第二部分---签收时间 -->
                                <div class="InfoBoxTime" v-if="signStatus==true">
                                    <p>签收时间</p>
                                    <p>2月9日 11:11</p>
                                </div>
                                <div class="InfoBoxTime" v-if="signStatus==false">
                                    <p>订单状态</p>
                                    <p>{{acceptForm.progress}}</p>
                                </div>
                            </div>
                            <!-- 3、具体信息 -->
                            <div :class="checkFlag==true?'DetailsOne':'Details'">
                                <p :class="lineFlag==true?'panelTitle':'panelTitleOne'">线路信息:</p>
                                <div id="panel"></div>
                            </div>
                        </div>
                        <!-- <div style="height:500px;"></div> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务支持 -->
        <div class="Support" v-if="currentindex==2 && defaultrouter=='/order'">
            <div class="fontbg">
                <p>常用功能</p>
            </div>
            <div class="SupportMenu">
                <div class="SupportTool" v-for="(item, index) in SupportMenu" :key="index" v-on:click="open(item)">
                    <i :class="item.class"></i>
                    <p>{{item.name}}</p> 
                </div>
            </div>
        </div>
        <!-- 嵌套路由进来的部分 -->
        <div class="routerView" v-if="currentindex==2 && defaultrouter!='/order'">
            <router-view></router-view>
        </div>
        <!-- 底部区域 -->
        <div :class="currentindex==2?'footerone':'footer'">
            <sourcefooter></sourcefooter>
        </div>
    </div>
</template>

<script>
import MapLoader from '../map/map.js'
import { province } from "../assets/js/map.js";
import sourcemenu from '../components/sourceMenu.vue'
// import sourcesidebutton from '../components/sourceSidebutton.vue'
import sourcefooter from '../components/sourceFooter.vue'
import {location} from '../map/location.js'
import {addPackage,byCode} from '../api/index.js'
export default {
    data(){
        var validateMobile=(rule,value,callback)=>{
            var MobileRegex = /^1[0-9]{10}$/;
            if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
            } else {
                callback();
            }
        };
        var checkNum1=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('重量不能为空'))
            }
            setTimeout(()=>{
                if(!Number.isInteger(value)){
                    callback(new Error("请输入数字值"));
                }else{
                    callback();
                }
            },1000)
        };
        var checkNum=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('数量不能为空，至少1件'))
            }
            setTimeout(()=>{
                if(!Number.isInteger(value)){
                    callback(new Error("请输入数字值"));
                }else{
                    callback();
                }
            },1000)
        }
        return{
            currentindex:0,  //当前的导航
            active:0,   //默认激活的步骤
            // SelectFlag:false,   //三级联动是否显示
            // InputFlag:true,
            pollFlag:false,   //是否有包裹
            checked:false,   //是否开启地图模式
            checkFlag:false,    //具体信息展示的样式的切换
            InfoFlag:false,    //信息框的展示与否
            signStatus:false,  //签收状态信息的切换
            lineFlag:false,    //线路信息的标题的显示与否
            sourceFlag:false,   //是否从首页跳转查询订单
            /* 三级联动需要的参数 */
            arr: [1, 3, 4],
            provincearr: [],
            cityarr: [],
            regionarr: [],

            provincearr1: [],
            cityarr1: [],
            regionarr1: [],
            /* 寄件人信息参数 */
            provinceValue: "",
            provinceName: "",
            cityValue: "",
            cityName: "",
            RegionValue: "",
            RegionName: "",
            /* 收件人信息参数 */
            provinceValue1: "",
            provinceName1: "",
            cityValue1: "",
            cityName1: "",
            RegionValue1: "",
            RegionName1: "",

            defaultrouter:"/order",//默认的路由---监听路由的变化
            SupportMenu:[
                {
                    name:"运费时效",
                    class:"fa fa-cny",
                    link:'/order/cost'
                },
                {
                    name:"服务范围",
                    class:"fa fa-map-pin",
                    link:"/order/cover"
                },
                {
                    name:"网点查询",
                    class:"fa fa-map-marker",
                    link:"/order/area"
                },
                {
                    name:"收寄标准",
                    class:"fa fa-info",
                    link:"/order/stand"
                }
            ],

            /* 关于高德地图 */
            map:{},

            code:"",  //运单号
            startCity:"",  //起始城市
            endCity:"",   //终点城市
            positionInfo:{    //定位信息
                address:"",
                lat:"",   //纬度
                lng:""    //经度
            }, 
            orderMenu:[
                "我要寄件",
                "运单追踪",
                "服务支持"
            ],
            // 寄件人的信息
            mailForm:{
                name:'',
                phone:'',
                area:'',
                address:'',
                packagename:'',
                packagenum:'',
                packageweight:'',
                remark:'',
            },
            // 收件人的信息
            collectForm:{
                name:'',
                phone:'',
                area:'',
                address:'',
            },
            // 修改订单的信息
            packageForm:{
                username:'',
                Susername:'',
                Sphone:'',
                Saddress:'',
                sarea:'',
                packagename:'',
                packagenum:'',
                packageweight:'',
                Cusername:'',
                Cphone:'',
                Caddress:'',
                carea:'',
                progress:'',
                oremark:'',
            },
            /* 之所以处理位置信息，是为了配合地图使用 */
            //  根据订单号查询，用于接受返回信息的表单。用于处理起始位置信息
            strList:[],
            //  根据订单号查询，用于接受返回信息的表单。用于处理终点位置信息
            strListone:[],
            // 根据订单号查询，用于接受返回信息的表单
            acceptForm:{},
            // 对话框是否展开的标识符
            dialogVisible:false,
            rules:{
                name:[
                    {required:true,message:"姓名不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                phone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                area:[
                    {required:true,message:"地区不能为空",trigger:"change"}
                ],
                address:[
                    {required:true,message:"详细地址不能为空",trigger:"blur"},
                    {min:3,message:"最少3个字",trigger:"blur"},
                ],
                // 关于修改信息
                Susername:[
                    {required:true,message:"姓名不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                Sphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                sarea:[
                    {required:true,message:"地区不能为空",trigger:"change"}
                ],
                Saddress:[
                    {required:true,message:"详细地址不能为空",trigger:"blur"},
                    {min:3,message:"最少3个字",trigger:"blur"},
                ],
                Cusername:[
                    {required:true,message:"姓名不能为空",trigger:"blur"},
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                Cphone:[
                    {validator:validateMobile,trigger:"blur"},
                    { required: true, message:'请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }

                ],
                carea:[
                    {required:true,message:"地区不能为空",trigger:"change"}
                ],
                Caddress:[
                    {required:true,message:"详细地址不能为空",trigger:"blur"},
                    {min:3,message:"最少3个字",trigger:"blur"},
                ],
                packagename:[
                    {required:true,message:"包裹名字不能为空",trigger:"blur"}
                ],
                packagenum:[
                    {required:true,validator:checkNum,trigger:"blur"},
                ],
                packageweight:[
                    {required:true,validator:checkNum1,trigger:"blur"},
                ]
            }
        }
    },
    watch:{ // 路由监听：监听路由的变化，从而做出相应操作
        $route: {
            immediate: true, // 一旦监听到路由的变化立即执行
            handler(to,from) { // 回调函数，两个参数，to：当前的组件，from：上一个组件
                this.defaultrouter = to.path // 给activeMenu重新赋值为当前组件的路由地址
                console.log("监听的路由",this.defaultrouter)
            }
        },
        // 监听当前页的变化，防止路由跳转错误
        currentindex(val){
            console.log("监听的内容",val)
            this.$router.push({path:'/order'})
            console.log(this.defaultrouter)
        },
        // 监听按 运单号 查询，输入框的变化(是否为空)
        code(val){
            console.log("监听的订单号的情况",val)
            if(val==''){
                // 线路部分清空---防止重复
                document.getElementById('panel' ).innerHTML =''
                // 信息框消失
                this.InfoFlag=false
                // 线路信息消失
                this.lineFlag=false
                // 提示包裹为空
                this.pollFlag=false
                
                // 从source页面传递的标识符
                this.$store.state.sourceFlag=false
                // 从source页面传递的订单号
                this.$store.state.code=""
            }
        },
        /* 监听source页面查询触发的事件 */
        sourceFlag(val){
            console.log("监听的sourceFlag",val)
            if(val==true){
                this.check()
            }
        },
        // 监听地图按钮，是否变化---防止路线信息累加
        checkFlag(val){
            document.getElementById('panel' ).innerHTML =''
        }
    },
    mounted(){
        // 调用加载地图+控件
        this.getmap()
        // 获取当前的位置
        this.getLocation()
    },
    created(){

        this.getactive()

        this.provincearr = province;
        this.provincearr1 = province;
        this.packageForm.username=this.$store.state.user.name
        console.log("用户的名字",this.packageForm.username)

        /* 为了查询source页面的订单 */
        this.code=this.$store.state.code
        this.sourceFlag=this.$store.state.sourceFlag
        // this.position() 
        
    },
    methods:{
        /* 为了从导航跳转过来---或者从首页查询订单跳转 */
        getactive(){
            this.currentindex=JSON.parse(this.$route.query.currentindex)
            console.log("路径的active",this.currentindex)
        },
        /**获取地图定位 */
        getLocation() {
            // let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                this.positionInfo.address=result.formattedAddress.substr(0,6)
                console.log("获取的当前的位置",this.positionInfo.address)
                this.positionInfo.lat=result.position.lat
                this.positionInfo.lng=result.position.lng
                console.log("当前的信息",this.positionInfo)
                console.log(result)
                this.lat = result.position.lat;
                this.lng = result.position.lng;
                this.province = result.addressComponent.province;
                this.city = result.addressComponent.city;
                this.district = result.addressComponent.district;
            });
        },
        /* 加载地图 */
        getmap(){
            let that = this
            MapLoader()
            .then((AMap) => {
                console.log('地图加载成功',AMap)
                that.map = new AMap.Map("container1", {
                    resizeEnable: true,
                    center: [117.000923, 36.675807],
                    viewMode:'2D',
                });
                AMap.plugin([
                'AMap.ToolBar',
                'AMap.Scale',
                'AMap.OverView',
                'AMap.MapType',
                'AMap.Geolocation',
            ], 
                function(){
                    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                    that.map.addControl(new AMap.ToolBar());

                    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                    that.map.addControl(new AMap.Scale());

                    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                    that.map.addControl(new AMap.OverView({isOpen:true}));
                
                    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                    that.map.addControl(new AMap.MapType());
                
                    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                    that.map.addControl(new AMap.Geolocation());
                });

                //  ******异步加载插件----路径规划
                AMap.plugin('AMap.Driving', function() {
                    var driving = new AMap.Driving({
                        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                        policy: AMap.DrivingPolicy.LEAST_TIME,
                        panel: "panel",
                        map:that.map  //想要地图上显示路径，必须要有
                    })
                    /* 根据经纬度进行查询 */
                    // var startLngLat = [116.379028, 39.865042]
                    // var endLngLat = [116.427281, 39.903719]
                    
                    /* 根据关键字查询 */
                    driving.search(driving.search([
                        {keyword:that.strList[2] ,city:that.strList[1]},
                        {keyword: that.strListone[2],city:that.strListone[1]}
                    ], function(status, result) {
                        // 未出错时，result即是对应的路线规划方案---返回的信息需要的是routes
                        console.log("得到的路线",status,result)
                    }))
                })
            })
            .catch((err)=>{
                console.log("地图加载失败",err)
            })
        },
        /* 获取位置的经纬度 */
        // position() {
        //     let geocoder = new AMap.Geocoder({
        //         city: "全国" //默认：“全国”
        //     });
        //     let marker = new AMap.Marker();
        //     let str = "浚县";
        //     geocoder.getLocation(str, (status, result) => {
        //         if (status === "complete" && result.geocodes.length) {
        //         let lnglat = result.geocodes[0].location;
        //         console.log("获取的坐标",lnglat)
        //         marker.setPosition(lnglat);
        //         /* 为了将位置显示在地图上 */
        //         // this.map.add(marker);
        //         // this.map.setFitView(marker);
        //         } else {
        //         this.$message.error("查询位置失败,请重新输入");
        //         }
        //     });
        // },
        // 查询订单界面的
        check(){
            if(this.code!=""){
                console.log("点击了查询")
                this.pollFlag=true
                // 根据订单号进行查询
                byCode(this.code)
                .then((res)=>{
                    console.log("根据订单号查询成功",res)
                    if(res.status==200){
                        this.$notify({
                            message:"查询包裹成功",
                            type:"success"
                        })
                        this.acceptForm=res.info[0]
                        this.strList=this.acceptForm.Saddress.split("-")
                        this.strListone=this.acceptForm.Caddress.split("-")
                        console.log("起始字符串数组",this.strList[1])
                        console.log("终点字符串数组",this.strListone[1])
                        // 信息框展示
                        this.InfoFlag=true
                        // 线路信息展示
                        this.lineFlag=true
                        // 展示路线信息---调用地图方法
                        this.getmap()
                        //赋值起始与终点城市
                        this.startCity=this.strList[1]
                        this.endCity=this.strListone[1]
                        // 切换签收状态信息
                        if(this.acceptForm.progress=='订单已完成配送' || this.acceptForm.progress=='订单审核中'){
                            this.signStatus=false
                        }else{
                            this.signStatus=true
                        }
                        // 根据id查找后台查找成功(状态时找不到)，返回前台状态码404
                    }else if(res.status==404){
                        this.$notify({
                            message:"查询包裹失败，检查货单号是否正确",
                            type:"error"
                        })
                    }
                })
                .catch((err)=>{
                    console.log("根据订单号查询失败",err)
                })
            }else{
                this.$notify({
                    message:"请先输入订单号",
                    type:"error"
                })
            }
        },
        /* 是否展示地图 */
        mapclick(){
            this.getmap()
            // this.toolmap()
            this.checkFlag=!this.checkFlag
        },
        clickred(index){
            this.currentindex=index
        },
        handlefocus(){
            // this.InputFlag=false
            // this.SelectFlag=true
        },
        /* ##############关于三级联动的bug####防止两部分联动 */
        selectProvimce(id) {
            console.log("选中的",id)
            this.cityarr = [];
            this.regionarr = [];
            this.cityValue = "";
            this.RegionValue = "";
            for (let item of this.provincearr) {
                if (id == item.id) {
                    console.log("省份",item);
                    this.provinceName=item.name
                    this.cityarr = item.children;
                }
            }
        },
        selectProvimceone(id) {
            console.log("选中的",id)
            this.cityarr1 = [];
            this.regionarr1 = [];
            this.cityValue1 = "";
            this.RegionValue1 = "";
            for (let item of this.provincearr1) {
                if (id == item.id) {
                    console.log("省份",item);
                    this.provinceName1=item.name
                    this.cityarr1 = item.children;
                }
            }
        },
        selectcity(id) {
            this.regionarr = [];
            this.RegionValue = "";
            for (let item of this.cityarr) {
                if (id == item.id) {
                    console.log("城市",item)
                    this.cityName=item.name
                    this.regionarr = item.children;
                    this.cityValue=this.cityName
                }
            }
        },
        selectcityone(id) {
            this.regionarr1 = [];
            this.RegionValue1 = "";
            for (let item of this.cityarr1) {
                if (id == item.id) {
                    console.log("城市",item)
                    this.cityName1=item.name
                    this.regionarr1 = item.children;
                    this.cityValue1=this.cityName1
                }
            }
        },
        handleBlur(id){
            for (let item of this.regionarr) {
                if (id == item.id) {
                    console.log("区域",item)
                    this.RegionName=item.name
                    // this.RegionValue=this.RegionName
                }
            }
            var str=this.provinceName+"-"+this.cityName+"-"+this.RegionName
            
            //无关紧要
            // this.provinceValue==this.provinceName
            // this.cityValue==this.cityName
            // this.RegionValue=this.RegionName

            this.mailForm.area=str

            this.packageForm.sarea=str
        },
        handleBlurone(id){
            for (let item of this.regionarr1) {
                if (id == item.id) {
                    console.log("区域",item)
                    this.RegionName1=item.name
                    this.RegionValue1=this.RegionName1
                }
            }
            // this.SelectFlag=false
            var str1=this.provinceName1+"-"+this.cityName1+"-"+this.RegionName1
            
            //无关紧要
            // this.provinceValue1==this.provinceName1
            // this.cityValue1==this.cityName1
            // this.RegionValue1=this.RegionName1
            
            this.collectForm.area=str1

            this.packageForm.carea=str1
            console.log("修改信息的表单",this.packageForm.sarea,this.packageForm.Cusername)
        },
        submitForm(mailForm) {
            this.$refs[mailForm].validate((valid) => {
                if (valid) {
                    this.active=1
                    // 给修改表单赋值
                    this.packageForm.Susername=this.mailForm.name
                    this.packageForm.Sphone=this.mailForm.phone
                    this.packageForm.sarea=this.mailForm.area
                    this.packageForm.packagename=this.mailForm.packagename
                    this.packageForm.packagenum=this.mailForm.packagenum
                    this.packageForm.packageweight=this.mailForm.packageweight
                    this.packageForm.progress="订单审核中",
                    this.packageForm.Saddress=this.mailForm.area+'-'+this.mailForm.address
                    this.packageForm.oremark=this.mailForm.remark
                    console.log("填好的寄件表单内容",this.mailForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitFormone(collectForm) {
            // if(this.)
            this.$refs[collectForm].validate((valid) => {
                if (valid) {
                    // this.active=2
                    this.dialogVisible=true
                    // 给修改表单赋值
                    this.packageForm.Cusername=this.collectForm.name
                    this.packageForm.Cphone=this.collectForm.phone
                    this.packageForm.carea=this.collectForm.area
                    this.packageForm.Caddress=this.collectForm.area+'-'+this.collectForm.address
                    console.log("填好的收件表单内容",this.collectForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(mailForm) {
            this.$refs[mailForm].resetFields();
            this.provinceValue=""
            this.cityValue=""
            this.RegionValue=""
        },
        resetFormone(collectForm) {
            this.$refs[collectForm].resetFields();
            this.provinceValue1=""
            this.cityValue1=""
            this.RegionValue1=""
        },
        prev(){
            this.active=0
        },
        prev1(){
            this.active=1
        },
        go(){
            // this.active=3
            setTimeout(()=>{
                this.$router.push({ path: '/source'})
            },1000)
        },
        // 点击取消按钮---检查信息
        cancel(packageForm){
            this.dialogVisible=false
            // 取消订单--跳转到寄件人信息页面
            this.active=0
            this.$notify({
                message:"您取消了订单",
                type:"error"
            })
            // 点击取消，进度为0
            this.packageForm.progress=""
            // 是否清空信息表单内容???
        },
        // 点击确定按钮---检查信息
        packageModify(packageForm){
            this.dialogVisible=false
            this.$refs[packageForm].validate((valid) => {
                if (valid) {
                    // 上传订单
                    addPackage(this.packageForm)
                    .then((res)=>{
                        console.log("上传订单成功",res)
                        this.$notify({
                            message:"下单成功",
                            type:"success"
                        })
                        this.code=res.info._id
                        // 跳转到订单完成的页面
                        this.active=3
                        // 清空表的信息
                        this.mailForm={}
                        this.collectForm={}
                        this.packageForm={}
                    })
                    .catch((err)=>{
                        console.log("上传订单失败",err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 路由跳转
        open(item){
            console.log("打开的路由",item,)
            this.$router.push({path:item.link})
        }
    },
    components:{
        sourcemenu,
        // sourcesidebutton,
        sourcefooter,
    },
}
</script>

<style scoped>
.Order{
    width:100vw;
    height:100vh;
    position: relative; /*父相子绝*/
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}


/* 定位信息 */
.position{
    width:100vw;
    height:5vh;
    padding:0 4%;
    background-color: #fff7f7;
    box-shadow: 0 0 20px rgb(192 192 192 / 50%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1000;
}
.position p{
    width:100%;
    /* border:2px solid purple; */
    margin-top: 0.7%;
    display: flex;
    align-items: center;
}
.position p span{
    font-size: 20px;
    color:red;
}


/* 滑块的样式 */
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 6px;  /* 侧边的 */
    height: 16px; /* 底部的 */
    background-color: #7af5cf;/*//背景色*/
}

/*定义滚动条轨道 内阴影+圆角*//* 滚动槽 */
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(255,0,0,0.3);
    border-radius: 10px;
    background-color: #4e3cf5;/*滚动条槽的颜色*/
}
/*定义滑块 内阴影+圆角*//* 滚动条滑块 */
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #ccc;
}
/*交互时样式设置*/
::-webkit-scrollbar-thumb:window-inactive {
    background: red;
    width: 10px;
    height: 10px;
    border: 6px;
}
/* 两边按钮设置*/
::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border: 2px;
    background: black;
}
::-webkit-scrollbar-button:horizontal:decrement:hover {
    /*当鼠标在水平滚动条递减属性的按钮上的状态，在该文件中就只有水平方向的第一个按钮*/
    /* decrement 表示递减的碎片 */
    width: 10px;
    height: 10px;
    border: 6px;
    background: #d3150b;
}
/*内层轨道，滚动条中间部分（除去）,滚动槽颜色可能会遮挡该颜色*/
::-webkit-scrollbar-track-piece {
    /*background: #29d32f;*/
}
/*两个滚动条的交汇处*/
::-webkit-scrollbar-corner {
    width: 10px;
    height: 10px;
    border: 2px;
    background: #bdd39b;
}

::-webkit-scrollbar-track-piece:start {
    /*滚动条上半边或左半边*/
    width: 10px;
    height: 10px;
    border: 2px;
    background: #d1a2d3;
}



.orderMenu{
    width:100%;
    height:14vh;
    margin-top: 10px;
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
}
.orderMenuOne{
    width:100%;
    height:30vh; 
    /* margin-top: 10px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: url("https://s3.jpg.cm/2021/03/20/CuYcL.png") no-repeat center ;
    background-size: 100% 100%;
}
.orderMenuOne ul{
    width:40%;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.orderMenuOne ul li{
    /* margin-left: 40px; */
    font-size: 20px;
    font-weight: bold;
    color:white;
    padding-bottom:13px;
    margin-top: 15px;
}
.orderMenuOne ul li:hover::after{
    transform-origin:center;
    transform:scale(1);
}
/* 为了下划线的动画的定位 */
.orderMenuOne ul li:after{
    position: relative;
    content:'';
    display: block;
    height:2px;
    width:100%;
    background:wheat;
    top: 15px;
    left: 0;  
    transform:scale(0);
    transition:all 0.2s;
}

.orderMenuTwo{
    width:100%;
    height:30vh; 
    /* margin-top: 10px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: url("https://s3.jpg.cm/2021/03/20/CuYcL.png") no-repeat center ;
    background-size: 100% 100%;
}
.orderMenuTwo ul{
    width:40%;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.orderMenuTwo ul li{
    /* margin-left: 40px; */
    font-size: 20px;
    font-weight: bold;
    color:white;
    padding-bottom:13px;
    margin-top: 15px;
}
.orderMenuTwo ul li:hover::after{
    transform-origin:center;
    transform:scale(1);
}
/* 为了下划线的动画的定位 */
.orderMenuTwo ul li:after{
    position: relative;
    content:'';
    display: block;
    height:2px;
    width:100%;
    background:wheat;
    top: 15px;
    left: 0;  
    transform:scale(0);
    transition:all 0.2s;
}

.routerView{
    width:70%;
    min-height:54%;
    overflow-y: scroll;
    /* border:1px solid red; */
    box-shadow: 0 0 20px rgb(192 192 192 / 50%);
}
.routerView::-webkit-scrollbar{
    width:0;
}

.menuthree{
    width:20vw;
    height:10vh;
    position: relative;
    bottom:20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.menuthree p:nth-child(1){
    color:white;
    font-size: 18px;
    font-weight: bold;
}
.menuthree p:nth-child(2){
    color:white;
    font-size: 12px;
}

.orderactive{
    color: tomato !important;
    /* border:2px solid red;
    border-top-style:none;
    border-right-style:none;
    border-left-style:none; */
}

.orderMenu ul{
    width:40%;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.orderMenu ul li{
    /* margin-left: 40px; */
    font-size: 20px;
    font-weight: bold;
    color:white;
    padding-bottom:13px;
    margin-top: 15px;
}
.orderMenu ul li:hover::after{
    transform-origin:center;
    transform:scale(1);
}
.orderMenu ul li:after{
    position: relative;
    content:'';
    display: block;
    height:2px;
    width:100%;
    background:wheat;
    top: 15px;
    left: 0;  
    transform:scale(0);
    transition:all 0.2s;
}
.orderbody{
    width:60%;
    height:77vh;
    /* border:1px solid blue; */
    background-color:#ffffff;
    background: url("https://s3.jpg.cm/2021/03/13/3LTCG.png") no-repeat center;
    margin-top: 20px;
    background-size:100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.orderbodyone{
    width:60%;
    height:77vh;
    /* border:1px solid blue; */
    background-color:#ffffff;
    background: url("https://s3.jpg.cm/2021/03/14/3QLUG.png") no-repeat center;
    background-size:60% 60%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.move{
    width:100%;
    border:2px solid #cccccc;
    margin-top:10px;
    border-top-style:none;
    border-right-style:none;
    border-left-style:none;
}

/* 修改步骤条的的线条形状 */
/deep/.el-step__line{
    background: transparent !important;
    border-top: 5px dotted !important;
}
/deep/.el-step__line-inner{
    border-width: 0 !important;
}


/* 修改步骤条(完成)的--圆圈的颜色以及进度条的颜色 */
/deep/.el-step__head.is-success{
    border-color:red !important;
    color:red !important;
}
/deep/.el-step__head.is-success .el-step__icon.is-text{
    color:red;
}
/* 修改步骤条(完成)的--文字的颜色 */
/deep/.el-step__title.is-success{
    color:red !important;
    font-weight:bold !important;
}


/* 修改步骤条(正在进行)的--圆圈的颜色以及进度条的颜色 */
/deep/.el-step__head.is-process{
    border-color:green !important;
    /*color:green !important;*/ /*会导致线条的颜色、圆圈的文字的颜色也会改变*/
}
/deep/.el-step__head.is-process .el-step__icon.is-text{
    color:green;
}
/* 修改步骤条(正在进行)的--文字的颜色 */
/deep/.el-step__title.is-process{
    color:green !important;
}


.Mail{
    width:59.3vw;
    /* height:60vh; */
    height:400px;
    margin-top: 22px;
    /* border:1px solid olive; */
    background: rgba( 155, 155, 155, 0.75 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 3.0px );
    -webkit-backdrop-filter: blur( 3.0px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
}
.Mail::-webkit-scrollbar{
    width:0 !important;
}
.Mail p{
    font-size: 20px;
    font-weight:bold;
}

/* 表单的下方的按钮 */
/* .btn{
    width:100%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
}
.btn:hover{
    background-color: transparent !important;
} */
.demo-ruleForm{
    margin-top: 20px;
    margin-left: -50px;
}

.Support{
    width:70vw;
    height:30vh;
    background-color:#ffffff; 
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30px;
    position: relative;
}

/* 红色标签必须 父相子绝 */
.fontbg{
    width:60px;
    height:30px;
    position: absolute;
    top:10px;
    left:0;
    background: url("https://s3.jpg.cm/2021/03/20/C1Uor.png") no-repeat center;
    background-size: 100% 100%;
    line-height: 30px;
    color:white;

}
.SupportMenu{
    width:70%;
    height:300px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.SupportTool{
    width:100px;
    height:60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    padding-top: 10px;
}
.SupportTool i{
    font-size: 20px;
}
.SupportTool p{
    font-size: 18px;
}
.SupportTool:hover{
    color:red;
    cursor:pointer;
}


.footer{
    width:100%;
    margin-top:30px;
}
.footerone{
    width:100%;
    margin-top:30px;
}

.congratulate{
    width:80%;
    height:40%;
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin: auto;
    /* border:1px solid red; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
.congratulateTitle{
    width:100%;
    height:8vh;
    /* border:1px solid purple; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top:20px;
}
.congratulateBtn{
    width:100%;
    height:10vh;
    /* border:1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top:20px;
}

.modifyPackage{
    /* border:2px solid green; */
}
.packageform{
    /* border:1px solid red; */
    width:67.4%;
    height:100%;
    margin-right: auto;
    margin-left: auto;
}


.pollbody{
    width:60%;
    height:80vh;
    /* border:1px solid red; */
    background-color:#ffffff;
    background: url("https://s3.jpg.cm/2021/03/14/3eugw.png") no-repeat center;
    margin-top: 30px;
    background-size:70% 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pollsearch{
    width:90%;
    height:80vh;
    background: rgba( 255, 255, 255, 0.40 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-with-select{

}
.frame{
    width:90%;
    height:20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pollTitle{
    width:90%;
    height:10%;
    display: flex;
    align-items: center;
}
.pollTitle h3{
    text-align: left;
}
.pollbody hr{
    display: block;
    width:100%;
    height:1px;
    background-color: #f2f2f2;
}
.pollContent{
    width:90%;
    height:64%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* .pollContent::-webkit-scrollbar{
    width:0 !important;
} */
.empty{
    width:90%;
    height:90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
}
.empty img{
    width:200px;
    height:200px;
}
.empty p{
    margin-left: -20px;
    font-size: 14px;
    font-weight: bold;
}
.Be{
    width:98%;
    height:90%;
    /* border:2px solid olive; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
}
.BeTitle{
    width:100%;
    height:40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.BeTitleFont{
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 40px;
}
.BeTitleFont i{
    font-size:30px;
    font-weight:100px;
}
.BeTitleFont p{
    font-size: 20px;
    font-weight:bold;
    margin-top: 10px;
    margin-left:10px;
}
.mapInfo{
    width:100%;
    height:auto;
    /* border:3px solid orangered; */
    overflow-y: scroll;
    min-height: 78%;
    position: relative;
}
.map{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.map p{
    font-size: 12px;
    margin-top:10px;
    margin-right: 6px;
}
/deep/.el-checkbox__inner{
    border:2px solid #ccc !important;
}
.Be hr{
    width:100%;
    background-color: #414141;
}
.maparea{
    width:98%;
    height:600px;
    /* border:1px solid purple; */
    position: relative;
    left:0;
    right:0;
    margin: auto;
}

/* 表单信息框 必须父相子绝 */
.InfoBox{
    width:98%;
    height:80px;
    position: absolute;
    top:10px;
    right:0;
    left:0;
    margin: auto;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 0.5px );
    -webkit-backdrop-filter: blur( 0.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index:1000;
}

/* 地图控件的位置 */
/deep/.amap-controls{
    position: relative;
    top:180px;
}
/deep/.amap-scale-text{
    position: relative;
    top:26px;
}
/deep/.amap-scale-line{
    position: relative;
    top:26px;
}

.InfoBoxCode{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 6px;
}
.InfoBoxCodePath{
    display: flex;
    flex-direction: row;
    position: relative;
    top:10px;
}
.InfoBoxCodePath p{
    font-size:20px;
    font-weight:bold;
    color:#2d2d2d;
}
.InfoBoxCodePath p:nth-child(3){
    margin-left: 16px;
}
.InfoBoxCodePath i{
    font-size:20px;
    font-weight:bold;
    position: relative;
    top:5px;
    left:10px;
}
.InfoBoxTime{
    width:200px;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-right: 6px;
}
.InfoBoxTime p:nth-child(1){
    font-size: 20px;
    color:black;
    font-weight:bold;
    position: relative;
    top:5px;
}
.InfoBoxTime p:nth-child(2){
    font-size: 16px;
    color:red;
    font-weight: bold;
    position: relative;
    top:-5px;
}
.Details{
    width:98%;
    height:auto;
    min-height: 110px;
    /* border:2px solid orangered; */
    position: relative;
    top:100px;
    right:0;
    left:0;
    bottom:0;
    margin: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.DetailsOne{
    width:98%;
    height:auto;
    min-height: 110px;
    /* border:3px solid orangered; */
    position: relative;
    top:0px;
    right:0;
    left:0;
    bottom:0;
    margin: auto;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 路线信息 */
.panelTitle{
    position: absolute;
    top:-2px;
    left:0;
    font-size: 18px;
    font-weight:bold;
    color:brown;
}
.panelTitleOne{
    display: none;
}
#panel {
    /* border:2px solid red; */
    text-align: left;
}
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>

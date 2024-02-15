<template xmlns:el-col="http://www.w3.org/1999/html" xmlns:font-style="http://www.w3.org/1999/xhtml">

    <!-- 这个10就是让行距变小大概, 默认160   -->
    <div>
        <div class="middle" :style="backgroundDiv"></div>
        <el-row class="me-row" :gutter="20" type="flex" align="middle" style="margin-top: 100px">
            <!--          这里我加了hover,  颜色选的丑的一批, 后面诺, 交给你了, 加油奥里给
                          对了click也可以加, 然后效果什么的都可以调 什么鼠标变手 阴影之类的
            -->
            <el-col :span="8">
                <div>
                    <ul class="left-nav-list">
                        <li><div class="nav-button">
                            <div class="text2" style="margin-top: 25px">
                                <p style="margin: 8px auto">Personal</p>
                                <p style="margin: 8px auto">Information</p>

                                <!----各多如下一行------->

                                <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                            </div>
                        </div>
                        </li>

                        <li><div class="nav-button" style="line-height: 100px" @click="toMyPost()">
                            <!--                line height = height 居中-->
                            <div class="text2" @click="toMyPost()">
                                <p style="margin: 0 auto" @click="toMyPost()">My Post list</p>
                                <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                            </div>
                        </div></li>

                        <li><div class="nav-button" style="line-height: 100px" @click = "toCollection()">
                            <div class="text2" >
                                <p style="margin: 0 auto">Post Collection</p>
                                <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                            </div>
                        </div>
                        </li>

                        <li><div class="nav-button" >
                            <div class="text2" style="margin-top: 25px">
                                <p style="margin: 8px auto">Notification</p>
                                <p style="margin: 8px auto">Board</p>
                                <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                            </div>
                        </div>
                        </li>
                        <li><div class="nav-button" style="line-height: 100px">
                            <div class="text2" >
                                <p @click="toReset()" style="margin: 0 auto">Reset</p>
                                <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </el-col>


            <el-col :span="16" >
                <div>
                    <div class="notificationBoard">
                        <el-header style = "border-radius: 10px; font-style: italic; color: white; padding-top: 10px"> Notifications </el-header>
                        <div class="upper-lever"
                             style="height: 75%; box-sizing: border-box; padding: 40px 20px">
                            <div style="justify-content: center">
                                <el-row>
                                    <el-col :span="7">
                                        <div class = "cardnot" @click="toPostList()">
                                            <el-badge :value="notificationInfo.postnum" class="item">
                                                <el-card class = "cardbutton" :body-style="{ padding: '10px' }">
                                                    <img src="https://pic.imgdb.cn/item/626fff99239250f7c516ddc7.jpg" class="image">
                                                        <div style="padding: 14px;">
                                                            <span>New Posts</span>
                                                        <div class="bottom clearfix">
                                                            <el-button type="text" class="button">clear</el-button>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-badge>
                                        </div>
                                    </el-col>

                                    <el-col :span="7">
                                        <div class = "cardnot">
                                            <el-badge :value="notificationInfo.commentnum" class="item">
                                                <el-card class = "cardbutton" :body-style="{ padding: '10px' }">
                                                    <img src="https://pic.imgdb.cn/item/626fff99239250f7c516ddc7.jpg" class="image">
                                                    <div style="padding: 14px;">
                                                        <span>New Comments</span>
                                                        <div class="bottom clearfix">
                                                            <el-button type="text" class="button">clear</el-button>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-badge>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <el-footer>{{currentDate}} </el-footer>
                    </div>

                </div>
            </el-col>>


        </el-row>
    </div>


</template>
<script>
    import riden from '@/assets/riden.jpg'
    export default {
        name:'notificationBoard',
        data(){
            return{
                backgroundDiv: {
                    backgroundImage: "url(" + require("../assets/xjtluBG.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "2500px auto",
                    marginTop: "10px",
                },
                riden:riden,
                labelPosition:'left',
                dialogVisible: false,
                InfoModificationForm:{
                    id:0,
                    nickName:'',
                    gender:'',
                    grade:'',
                    major:'',
                    PersonalizedInfo:''
                },
                notificationInfo:{
                    postnum:1,
                    commentnum:1,
                },
                currentDate: new Date(),
                PersonId: {
                    id:0
                },
                AvatarB64:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                userInfo:{
                    nickName:'DefaultAdmin',
                    avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                },
                }
            },
        methods:{
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
            toReset:function (){
                console.log(1)
                this.$router.push('/reset')
            },
            toCollection:function (){
                this.$router.push('/home/postcollection')
            },
            toPostList:function (){
                this.$router.push('/home')
            },
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
            toMyPost:function (){
                this.$router.push('/home/myPost')
            },

            getNotifications:function (){
                // 不確定是不是需要對用戶特化
                // this.PersonId.id = localStorage.getItem('idToken')
                this.$http.get('/user/getPersonalInfo', {params:this.PersonId}).then(res=>{
                    if(res.status===200){
                        //隨便獲取點東西
                    }else {
                        alert('unknown error of system')
                    }
                })
            },

        created() {
          //獲取數據寫在這裏

            //this.getNotfications()
        },
    }
    }

</script>

<style lang="less" scoped>
    el-divider{
        height: 10em;
    }

    .cardnot{
        padding: 10px;
        margin: 0px;
        transition: all .5s;
    }
    .cardnot:hover{
        margin: 10px;
        padding: 5px;
    }

    //card内樣式
    .image {
        width: 100%;
        display: block;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .notificationBoard{
        height: 650px;
        width: 60%;
        position: absolute;
        bottom: -5%;
        padding-right: -20%;
        background-color: white;
        opacity: 80%;
        margin: 0 auto;
        border-radius: 20px;
        line-height: 30px;
        font-family: "Comic Sans MS";
        font-size: large;
        box-shadow:5px 5px 16px #aaaaaa;
    }


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    //左边效果* html部分也有调整//


    .text2 {
        font-family: "Helvetica";
        font-weight: bold;
    }

    .text2:hover {
        text-shadow: #676769 1px 1px 2px;
    }
    .left-nav-list .nav-button{
        margin-top: 20px;
        margin-left: 100px;
        opacity: 90%;
        box-shadow: 2px 2px 4px #3d3c3c;
        border-radius: 15px;
        background-color: rgba(220, 233, 255, 0.75);
    }
    //左边波纹效果*//
    .left-nav-list .nav-button:hover{
        animation: animated-border 1.5s infinite;
        @keyframes animated-border {
            0% {
                box-shadow: 0 0 0 0 rgba(253, 252, 252, 0.37);
            }
            100% {
                box-shadow: 0 0 0 10px rgba(255,255,255,0);
            }
        }
        //挑radius要连着下面的navbutton一起调
    }
    .nav-button{
        position: relative;
        height: 100px;
        opacity: 90%;
        width: 200px;
        margin: 2px auto;
        border-radius: 15px;
        overflow: hidden;
        transition: all .6s;
    }
    .nav-button:hover {
        color: #fff;
        border-color: #00000c;
    }

    .nav-button .bgsqr1, .nav-button .bgsqr2,.nav-button .bgsqr3, .nav-button .bgsqr4 {
        background: rgba(149, 158, 232, 0.99);
        position: absolute;
        top: 0;
        width: 0px;
        height: 100%;
        transition: all 0.4s;
        opacity: 0.35;
    }

    .nav-button .bgsqr3, .nav-button .bgsqr4 {
        opacity: 0.75;
    }

    .nav-button .bgsqr1 {
        left: 0;
    }

    .nav-button .bgsqr2 {
        right: 0
    }

    .nav-button .bgsqr3 {
        right: 0;
    }

    .nav-button .bgsqr4 {
        left: 0;
    }

    .nav-button:hover .bgsqr1, .nav-button:hover .bgsqr2, .nav-button:hover .bgsqr3, .nav-button:hover .bgsqr4 {
        width: 100%;
    }

    .nav-button:hover .bgsqr3, .nav-button:hover .bgsqr4 {
        transition-delay: .4s;
    }

    .nav-button p {
        position: relative;
        z-index: 999;
    }
    li {
        list-style: none;
    }


    .logout{
        font-style: italic;
    }
    .logout:hover {
        background: linear-gradient(90deg, rgb(240, 25, 72) 0%, rgba(255, 120, 71) 50%, rgb(240, 25, 72) 100%);
        background-size: 300% 100%; /*扩大背景区域*/
        animation: text 4s infinite linear;
        text-shadow: #676769 4px 4px 5px;
        @keyframes logout {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: -150% 0;
            }
        }
    }
    .me-row{
        margin: 0;
        padding: 0;
        line-height: 20px !important;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .card2{
        z-index: 2;
    }
    .userpanel{
        text-align: center;
        color: white;
        font-size: medium;
        padding-top: 5%;
        padding-left: 2%;
    }
    .username{
        padding-left: 5px;
    }
    .detailbtn{
        position: relative;
        right:0px;
        bottom:-50px;
        color: #A7BFE8;
    }
    .card{
        width:900px;
        height:90px;
        border: 1px solid #999;
        margin: 5px auto;
        box-shadow: 10px 10px 5px gray;
        border-radius: 30px;
        background-color: #f9fafc;
    }
    .el-pagination{
        position: absolute;
        bottom: 30px;margin: auto;left: 0;right: 0;
    }
    .el-dropdown-link{
        cursor: pointer;
        display: flex;
        justify-content: space-around;
    }
    .pic-name{
        line-height: 0;
    }
    a {
        text-decoration: none;
        color: blue;
        font-size: 25px;
    }
    a:hover{
        text-decoration: none;
        color: white;
        font-size: 25px;
    }
    .text{
        background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
        -webkit-background-clip: text; /*截取背景区域为文字*/
        color: transparent;
        background-size: 300% 100%; /*扩大背景区域*/
        animation: text 4s infinite linear;
    }
    @keyframes text {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -150% 0;
        }
    }

    .router-link-active {
        text-decoration: none;
        color: #A7BFE8;
    }
    .el-container{
        padding: 0;
        margin: 0;
        height: 100%;
    }
    .el-header {
        padding-top: 0;
        padding-bottom: 0;
        background-image: linear-gradient(to right, #A7BFE8, #6190E8, #6253FF, #6190E8, #A7BFE8);
        color: #333;
        border-radius: 3px;
    }

    .el-footer {
        bottom: -10px;
        position: absolute;
        width: 100%;
        background-image: linear-gradient(to right, #A7BFE8, #6190E8, #6253FF, #6190E8, #A7BFE8);
        color: white;
        text-align: center;
        justify-content: center;
        font-size: medium;
        border-radius: 10px;
        font-style: italic;
        font-family: "UD Digi Kyokasho N-B";
        font-weight: bold;
        fill-opacity: 80%;
        line-height: 40px;
        position: page;
    }

    .el-col{
        height: auto;
        margin-top: 0;
        padding-top: 0;
    }
    .el-row{
        height: auto;
        padding-top: 0;
        margin-top: 0;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        overflow-x:hidden;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .box-card {
        width: 480px;
    }
    .card-item{
        margin-bottom: 0%;
        margin-top: 0%;
    }
    .title {
        padding-left: 10%;
        padding-top: 5px;
        font-family: "Segoe UI";

    }
</style>

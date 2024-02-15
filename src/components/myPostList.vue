<template xmlns:el-col="http://www.w3.org/1999/html">

        <!-- 这个10就是让行距变小大概, 默认160   -->
        <div v-loading.fullscreen.lock="fullscreenLoading">

            <el-row class="me-row" :gutter="20" type="flex" align="middle" style="margin-top: 100px">
                <el-col :span="5" :offset="0">
                    <div class="left-nav">
                        <!--          这里我加了hover,  颜色选的丑的一批, 后面诺, 交给你了, 加油奥里给
                                      对了click也可以加, 然后效果什么的都可以调 什么鼠标变手 阴影之类的

                        -->
                        <ul class="left-nav-list">
                            <li>
                                <div class="nav-button" @click="toMePage()">
                                    <div class="text2" style="margin-top: 25px" @click="toMePage()">
                                        <p style="margin: 8px auto" @click="toMePage()">Personal</p>
                                        <p style="margin: 8px auto" @click="toMePage()">Information</p>
                                        <!----各多如下一行------->
                                        <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button" style="line-height: 100px">
                                    <!--                line height = height 居中-->
                                    <div class="text2">
                                        <p style="margin: 0 auto">My Post list</p>
                                        <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button" @click="toCollection()" style="line-height: 100px">
                                    <div class="text2">
                                        <p style="margin: 0 auto">Post Collection</p>
                                        <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button" @click="toNotification()">
                                    <div class="text2" style="margin-top: 25px">
                                        <p style="margin: 8px auto">Notification</p>
                                        <p style="margin: 8px auto">Board</p>
                                        <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                                    </div>
                                </div>
                            </li>

                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia-->
                            <li><div class="nav-button" style="line-height: 100px">
                                <div class="text2" >
                                    <p @click="toReset()" style="margin: 0 auto">Reset</p>
                                    <div class="bgsqr1"></div><div class="bgsqr2"></div><div class="bgsqr3"></div><div class="bgsqr4"></div>
                                </div>
                            </div>
                            </li>
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                            <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang-->

                        </ul>
                    </div>
                </el-col>



                <el-col :span="18" :offset="3" style="line-height: 10px">
                    <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
                    <div class="grid-content bg-purple" v-for="post in tableData.slice((pageNumber-1)*pageSize, pageNumber * pageSize)" style="margin-bottom: 30px" >
                        <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
                        <div>
                            <!--row内居中-->
                            <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

                                <!--头像-->
                                <el-col :span="5" class="pic-name" style="text-align: right" >
                                    <!--                 上方设置右对齐 -->
                                    <el-avatar :src="post.avatarurl"  ></el-avatar>
                                </el-col>
                                <!-- 名字-->
                                <el-col :span="10" style="text-align: left; margin-left: 2px">
                                    <div class = "username">
                                        <h4><!--date ！！！！！！！暂时需要后端方法稍作调整, 目前显示不了！！！！！！-->
                                            {{post.date}}
                                        </h4>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                        <div class="card"  >
                            <el-row type="flex" align="middle">
                                <el-col :span="16" style="text-align: left">
                                    <div class = "title" style="font-size: 20px;font-family: Microsoft YaHei; line-height: 25px"> <strong>Title:</strong>  {{post.title}}
                                    <el-tag style = "margin-left: 10px; " size="small" type="warning"  effect="plain">
                                        {{post.writerName}}
                                    </el-tag>
                                    </div>
                                </el-col>
                                <el-col :span='8'>
                                    <!--                    这里就是最方便的地方了， 直接绑定postid，  可以通过router to 直接传参post,id到detail 虽然还没实现  作为实验， 点击即可在控制台打印id-->
                                    <div class="detailbtn">
                                        <el-button type="primary" plain round @click="SendToDetail(post.id)">See Detail</el-button>
                                        <el-button style="position: relative" type="danger" icon="el-icon-delete" circle @click="toggleDeletion(post.id)"></el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="queryInfo.pageNumber"
                        :page-size= "queryInfo.pageSize"
                        :page-sizes="[4]"
                        layout="total, sizes, prev, pager, next"
                        :total="total"
                >
                </el-pagination>
            </el-row>

            <el-dialog
                    title="Deletion"
                    :visible.sync="dialogVisible"
                    width="20%"
                    top="15%"
                    style="line-height: 20px; opacity: 90%;"
            >
                <h1>Are you sure?</h1>
                <div style = "text-align:center">
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="danger" @click="deletion">Delete</el-button>
              </span>
                </div>
            </el-dialog>
        </div>

</template>
<script>
import riden from '@/assets/riden.jpg'
    export default {
        name: 'myPostList',
        data() {

            return {
              fullscreenLoading: false,
              PersonId: {
                id:0
              },
               /* itemslabel: [
                    { type: '', label: 'Love' },
                    { type: 'success', label: 'Friendship' },
                    { type: 'info', label: '标签三' },
                    { type: 'danger', label: '标签四' },
                    { type: 'warning', label: '标签五' }
                ],*/
              personalInfo:{
                nickName:'',
                gender:'',
                grade:'',
                major:'',
                PersonalizedInfo:'',
              },
              riden:riden,
              deleteTarget: {
                id:0
              },
              avatarList:[{id:0,url:require('../assets/avatar/man1.png')},
                {id:1,url:require('../assets/avatar/man2.png')},
                {id:2,url:require('../assets/avatar/woman1.png')},
                {id:3,url:require('../assets/avatar/woman2.png')}],
              tableData: [],
              queryInfo: {
                id:0,
                pageNumber: 1,
                pageSize: 4,
              },
                total:0,
                pageNumber: 1, //初始页
                pageSize: 4,    // 每页的数据
                input2:'',
                disabled:false,



                //用来操作弹出框
                labelPosition:'left',
                dialogVisible: false,


                AvatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

                userInfo: {
                    nickName: 'DefaultAdmin',
                    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                },

            }
        },

        methods: {

            toCollection:function (){
                this.$router.push('/home/postCollection')
            },

            toNotification:function (){
                this.$router.push('/home/notificationBoard')
            },
            openmyposts() {
                const h = this.$createElement;
                this.$notify({
                    title: 'Welcome to XJTLU bonding',
                    duration: 6000,
                    position: 'bottom-right',
                    offset: 250,
                    message: h('i', { style: 'color: teal'}, 'You can see all your posts here!')
                });
            },
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
            // 启动删除的函数，将target设置为目标id
            toggleDeletion:function (id){
                this.dialogVisible = true;
                this.deleteTarget.id = id
                console.log(id)
            },

            //实际删除的函数
            deletion: async function (){
              const { data: res } = await this.$http.get('/post/delete',{ params: this.deleteTarget })
                //对target进行删除
              if (res.status !== 200) {
                this.dialogVisible = false
                return this.$message.error('Delete failed')
              }else {
                this.dialogVisible = false
                await this.getMyPostList()
                return this.$message.success("Delete successfully")

              }
                //置空，防止潜在bug

            },

            toReset:function (){
            console.log(1)
            this.$router.push('/reset')
            },

          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
            toMePage:function (){
                this.$router.push('/home/myInfo')
            },
            getMyPostList: async function (){
                this.queryInfo.id = localStorage.getItem('idToken')
                const { data: res } = await this.$http.get('/user/getPersonalPost',{ params: this.queryInfo })
                if (res.status !== 200) {
                  return this.$message.error('数据获取失败')
                }

              for(let i=0,len=res.data.postList.length;i<len;i++){
                res.data.postList[i].avatarurl=this.avatarList[res.data.postList[i].avatar].url

              }
                this.tableData = res.data.postList
                this.total = res.data.totalpage
              console.log(this.tableData,"this.tableData")
            },

            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getMyPostList()
            },

          //上面的表格dongheng说能够实现跳转了能实现传参了, 但我不确定, 就是
            SendToDetail:function (id){
                this.$router.push({name:'postDetail',query: { id } || this.redirect})
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(newPage) {
                this.queryInfo.pageNumber = newPage
                this.getMyPostList()
            },

            // getUserInfo: function () {
            //     const token = localStorage.getItem('idToken')
            //     this.$http.get('/getUserInfo', {headers: {'token': token}}).then(res => {
            //         this.userInfo.nickName = res.data.data.nickName
            //         this.userInfo.avatar = res.data.data.avatar
            //     })
            // },
          // getPersonalInfo:function (){
          //   this.PersonId.id = localStorage.getItem('idToken')
          //   this.$http.get('/user/getPersonalInfo', {params:this.PersonId}).then(res=>{
          //     if(res.status===200){
          //
          //       this.personalInfo.nickName=res.data.data.username
          //       this.personalInfo.gender=res.data.data.gender
          //       this.personalInfo.grade=res.data.data.grade
          //       this.personalInfo.major=res.data.data.major
          //       this.personalInfo.PersonalizedInfo=res.data.data.personalInfo
          //
          //     }else {
          //       alert('unknown error of system')
          //     }
          //   })
          // },
        },
        created() {
            //磨洋工加载条，给钱加速
            //this.getUserInfo()
            this.getMyPostList()
            setTimeout(() =>{
                this.openmyposts()}, 1500)
            },
        }


</script>

<style lang="less" scoped>
    el-divider{
        height: 10em;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    //左边波纹效果*//

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
    .text2{
        font-family: "Helvetica";
        font-weight: bold;
    }
    .text2:hover{
        animation: text 4s infinite linear;
        text-shadow: #676769 1px 1px 2px;
    }
    .nav-button{
        position: relative;
        height: 100px;
        opacity: 90%;
        width: 200px;
        //border:1px black solid;
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
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    //see detail按钮效果*//


    .seedetail{
      background-color: #7DC4CC;
    }
    .seedetail:hover {
      background: linear-gradient(90deg, #BC95C6 0%, #7DC4CC 50%, #BC95C6 100%);
      background-size: 300% 100%; /*扩大背景区域*/
      animation: text 4s infinite linear both, animated-border 1.5s infinite;
      text-shadow: #676769 4px 4px 5px;
      @keyframes logout {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -150% 0;
        }
      }
      @keyframes animated-border {
        0% {
          box-shadow: 0 0 0 0 #A7BFE8;
        }
        100% {
          box-shadow: 0 0 0 20px rgba(255,255,255,0);
        }
      }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang

    li{
        list-style: none;
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
        top: 30px;
        color: #A7BFE8;
    }
    .card{
        width:70%;
        height:100px;
        opacity: 80%;
        //border: 1px solid #999;
        margin: 5px auto;
        padding: 0;
        box-shadow: 10px 10px 5px gray;
        border-radius: 30px;
        transition: all 500ms;
        border-radius: 30px;
        background-color: #ffffff;

    }
    .card:hover{
        color: #6253FF;
        box-shadow: 20px 15px 5px gray;
        background-color: #f1f8ff;
        padding-top: 1%;
        padding-bottom: 1%;
    }

    .el-pagination{
        position: absolute;

        bottom: -15%;margin: auto;left: 0;right: 0;
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
    .text{
        background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
        -webkit-background-clip: text; /*截取背景区域为文字*/
        color: transparent;
        background-size: 300% 100%; /*扩大背景区域*/
        animation: text 4s infinite linear;
    }
    @keyframes text{
        0%  { background-position: 0 0;}
        100% { background-position: -150% 0;}
    }
    //左侧几个按钮的字体渐变色动画*//


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
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

    .el-col{
        height: 100%;
        margin-top: 0;
        padding-top: 0;
    }
    .el-row{
        padding-top: 0;
        margin-top: 0;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
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
    .title {
        padding-left: 10%;
        padding-top: 5px;
        font-family: "Segoe UI";


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
            padding: 0px;
            background-color: #f9fafc;
        }

    }


</style>

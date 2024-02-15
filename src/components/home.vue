<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5" class="header-row">

          <div style="width:auto; margin-top: 18px; text-align: left" >
            <router-link to="/home/" @click.native="refresh">
              <i class="el-icon-eleme" style = "display: inline-block; font-weight: bold">XJTLU BONDING</i>
<!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
            </router-link>
              <!--<h1 class="text" style="display: inline"><strong>XJTLU</strong><em>Bonding</em></h1>-->
          </div>
        </el-col>
        <el-col :span="6">
          <div style="margin-top: 12px">
          <el-input
              placeholder="Search..."
              prefix-icon="el-icon-search"
              @keyup.enter.native="sendquery()"
              v-model="input2">
          </el-input>
          </div>
        </el-col>
        <el-col :span="1" style="margin-top: 12px" >
          <el-button  icon="el-icon-search" circle @click="sendquery()">
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryInfo.valueS" @focus="getScene" @change="sendScene(queryInfo.valueS)" multiple filterable remote style="margin-top: 12px; margin-left: 22px; color: rebeccapurple;" placeholder="Select category">
            <el-option
                v-for="item in optionsS"
                :key="item.id"
                :label="item.typeName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-top: 12px; text-align: right" >
          <router-link to="/home/createPost">
            <el-button type="primary" icon="el-icon-edit" plain :disabled="disabled">
<!--              在send页面边灰 改变disabled的值-->
              Add New Post
            </el-button>
          </router-link>
        </el-col>
        <el-col  :span="6">

<!--          头像加id-->
          <div style="float: right;margin-top: 6px">
            <el-dropdown>
              <span class="el-dropdown-link" >
                <el-badge :value="newLikeAndComment" :hidden="hideNewNotifyAvatar" :max="99" class="item" >
                    <el-avatar  shape="square" :size="50" :src="aurl" style="margin-right: 5px"></el-avatar>
                </el-badge>
                <h4 style="display: inline; margin-left: 2px">{{ userInfo.nickName }}</h4>
                <i class="el-icon-arrow-down el-icon--right" style="margin-top: 19px"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="logoutConfirm">Log out</div></el-dropdown-item>
                <el-dropdown-item  divided ><div style="height: 100%;width:100%" @click="toReset()">Reset Password</div></el-dropdown-item>
                <router-link to="/home/myInfo">
                  <el-dropdown-item divided>My Info</el-dropdown-item>
                </router-link>


                <router-link to="/home/myPost">

                    <el-dropdown-item divided>
                        My Post
                    </el-dropdown-item>

                </router-link>
                  <router-link to="/home/postCollection">
                      <el-dropdown-item divided>Post Collection</el-dropdown-item>
                  </router-link>

                  <div @click = "toNotification()">
                     <el-dropdown-item divided><el-badge :value="newLikeAndComment" :max="99" class="item" :hidden="hideNewNotifyDropdown">Notification</el-badge></el-dropdown-item>
                  </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 这个10就是让行距变小大概, 默认160   -->
    <el-main class="postListMain"  >
      <div class="middle" :style="backgroundDiv"></div>
      <router-view @update="eliminateNotification"></router-view>

    </el-main>
  </el-container>
</template>
<script>
//import { EventBus } from "../EventBus.js"
import riden from '@/assets/riden.jpg'
import postList from '@/components/postList'
import notificationBoard from "@/components/notificationBoard";
import createPost from "@/components/createpost";
import myPostList from "@/components/myPostList";
import personalInfo from "@/components/personalInfo";
export default {

  name:'resetPassword',
  components:{postList,notificationBoard,createPost,myPostList,personalInfo},
  data(){

    return{
      queryInfo:{
        valueS:''
      },
        //提醒boolean
      newLikeAndComment:30,
      hideNewNotifyAvatar: true,
      hideNewNotifyDropdown: true,
      optionsS:[],
      backgroundDiv: {
        backgroundImage:"url(" + require('../assets/xjtluBG.jpg') + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "2500px auto",
        marginTop: "10px",
      },
      avatarList:[{id:0,url:require('../assets/avatar/man1.png')},
        {id:1,url:require('../assets/avatar/man2.png')},
        {id:2,url:require('../assets/avatar/woman1.png')},
        {id:3,url:require('../assets/avatar/woman2.png')}
        ],
      aurl:'',
      PersonId: {
        id:0
      },
      riden:riden,
      input2:'',
      disabled:false,
      userInfo:{
        nickName:'',
        avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },

    }
  },

  methods:{
    // changeAvatarNotify:function (){
    //   console.log("changing")
    //   this.newNotifyAvatar=true
    // },
    // notificationCount: async function(){
    //   //獲取存在新提醒token
    // },
    // notificationChange: async function(){
    //     //清除notification
    // },
    //因为我决定等到用户真的在notification界面看见才清零， 所以这两个方法我就注掉了。
    eliminateNotification:function (flag,flag2){
        console.log("激活了")
        if(flag===1&&flag2===2){
          this.hideNewNotifyAvatar=true;
          this.hideNewNotifyDropdown=true;
        }
    },
    getNotifications: async function (){
        const id = localStorage.getItem("idToken")
        this.$http.get('/user/checkNotification',{params:{userId:id}}).then(res=>{
          if(res.data.status===200){
            this.newLikeAndComment=res.data.data.newLikeAndComment
            if(this.newLikeAndComment>0){
              this.hideNewNotifyDropdown=false
              this.hideNewNotifyAvatar=false
            }else{
              this.hideNewNotifyAvatar=true
              this.hideNewNotifyDropdown=true
            }
          }
        }).catch(()=>{
          this.hideNewNotifyDropdown=true
          this.hideNewNotifyAvatar=true
          this.$message.error({message:"fail to fetch notification data from server"})
        })
    },

    toNotification:function (){
      this.$router.push('/home/notificationBoard')
    },

    refresh:function (){
      this.$router.go(0)
    },
    delay:function(fn,time){return new Promise(resolve=>{setTimeout(()=>{resolve(fn())},time)})},
    logoutConfirm:function() {
      this.$confirm('Are you sure you wanna logout?', 'Confirm', {
        confirmButtonText: 'Log out',
        cancelButtonText: 'Play more~~',
        type: 'info'
      }).then( () => {
        this.$message({
          type: 'success',
          message: 'Bye Bye~~~',
        }) //test

        this.$store.commit('CLEAR_Login')
        this.$router.push('/login')

      }).catch(() => {
        this.$message({
          type: 'success',
          message: 'Welcome Back!!'
        });
      });
    },
    async getScene () {
      const { data: res } = await this.$http.get('post/querytype')
      if (res.status === 200) {
        this.optionsS = res.data // 把获取到的数据赋给this.data
      }
    },
    sendScene:async function() {
      if (this.$route.path !=='/home'&&this.$route.path !=='/home/'){
        await this.$router.push('/home')
      }
      this.queryevent.$emit('queryType',this.queryInfo.valueS)
    },

    toReset:function (){
      console.log(1)
      this.$router.push('/reset')
    },
    getUserInfo:function (){
      this.PersonId.id = localStorage.getItem('idToken')
        this.$http.get('/user/getPersonalInfo',{params:this.PersonId}).then(res=>{
          this.aurl = this.avatarList[res.data.data.avatar].url
          this.userInfo.nickName=res.data.data.username
          console.log(res,":useronfo")
        })
    },
    sendquery:async function (){
      if (this.$route.path !=='/home'&&this.$route.path !=='/home/'){
        await this.$router.push('/home')
      }
      this.queryevent.$emit('query',this.input2)
    },
  },

  passquery(){
    console.log(1)
    this.$router.push('/reset')
  },
  created() {
    this.getUserInfo()
    this.getNotifications()
  }




}
</script>

<style lang="less" scoped>

.middle {
  width:100%;
  height:100%;
  position:absolute;
  background-size:cover;
  object-fit: cover;
  -webkit-filter: blur(10px);
}
.card2{
  z-index: 2;
  opacity: 70%;

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
  margin: 5px auto;
    opacity: 70%;
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
a:visited{
  text-decoration: none;
  color: yellow;
  font-size: 25px;
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

.el-icon-eleme{
    font-style: italic;
    font-family: "BIZ UDGothic";
    font-size: x-large;
    color: mediumpurple;
    transition: color ease-in 500ms;
}
.el-icon-eleme:hover{
  text-decoration: none;
  color: white;
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  .middle {
    width:100%;
    height:auto;
    position:absolute;
    background-size:cover;
    object-fit: cover;
    -webkit-filter: blur(10px);
  }
  .card2{
    z-index: 2;

  }
}


</style>

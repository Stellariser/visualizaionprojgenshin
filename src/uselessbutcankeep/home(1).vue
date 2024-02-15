<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5" class="header-row">

          <div style="float: left; margin-top: 18px" >
            <router-link to="/404">
              <i class="el-icon-s-home" ></i>
<!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
            </router-link>
              <h1 class="text"style="display: inline"><strong>XJTLU</strong><em>Bonding</em></h1>

          </div>
        </el-col>
        <el-col :span="6">
          <div style="margin-top: 12px">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              @keyup.enter.native=""
              v-model="input2">

          </el-input>
          </div>
        </el-col>
        <el-col :span="1" style="margin-top: 12px" >
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>
        <el-col :span="6" style="margin-top: 12px; text-align: right" >
          <router-link to="createpost">
            <el-button type="primary" icon="el-icon-edit" plain :disabled="disabled" @click="createpost">
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
                <el-avatar shape="circle" :size="50" :src="userInfo.avatar" style="margin-right: 5px"></el-avatar>
                <h4 style="display: inline; margin-left: 2px">{{userInfo.id}}</h4>
                <i class="el-icon-arrow-down el-icon--right" style="margin-top: 19px"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Log out</el-dropdown-item>
                <el-dropdown-item divided>Reset Password</el-dropdown-item>
                <el-dropdown-item divided>My Info</el-dropdown-item>
                <el-dropdown-item divided>My Post</el-dropdown-item>
                <el-dropdown-item divided>My Like</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <!-- 这个10就是让行距变小大概, 默认160   -->
    <el-main class="postListMain" style="line-height: 10px">
      <!--背景部分-->
      <div class="middle" :style="backgroundDiv"></div>

      <router-view></router-view>



      <el-row class="card2">
        <el-col :span="18" :offset="3">
          <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
          <div class="grid-content bg-purple" v-for="post in postList.slice((currentPage-1)*pagesize, currentPage * pagesize)" >
            <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
            <div>
              <!--row内居中-->
              <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

                <!--头像-->
                <el-col :span="5" class="pic-name" style="text-align: right" >
                  <!--                 上方设置右对齐 -->
                  <el-avatar icon="el-icon-user-solid" src=post.avatar  ></el-avatar>
                </el-col>
                <!-- 名字-->
                <el-col :span="2" style="margin-left: 2px">
                  <div class = "username">
                    <h4>
                      {{post.userName}}
                    </h4>
                  </div>
                </el-col>
              </el-row>

            </div>
            <div class="card">
              <el-row>
                <el-col :span="18" style="text-align: left">
                  <div class = "title">  Title:  {{post.title}}</div>
                </el-col>
                <el-col :span='5'>
                  <router-link to="#">
                    <!--                    这里就是最方便的地方了， 直接绑定postid，  可以通过router to 直接传参post,id到detail 虽然还没实现  作为实验， 点击即可在控制台打印id-->
                    <div class="detailbtn">
                      <el-button type="success" size="medium" round @click="print(post.id)">See Detail</el-button>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size= "pagesize"
          layout="prev, pager, next"
          :total="postList.length">
      </el-pagination>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name:'home',
  data(){
    return{
      //这里不知道为什么我电脑只能识别绝对路径，还得辛苦你改一下了
      backgroundDiv: {
        backgroundImage: "url(" + require("D:\\CPT202\\XJTLUbonding-master\\XJTLUbonding-master\\src\\assets\\xjtlu.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "2500px auto",
        marginTop: "10px",
      },

      currentPage: 1, //初始页
      pagesize: 5,    // 每页的数据
      input2:'',
      disabled:false,
      userInfo:{
        id:'DefaultAdmin',
        avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      postList:[{
        userName: "dandan1",
        title: "i am post title1",
        avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        id:0,
      },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan3",
          title: "i am post title3",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:2,
        }],
    }
  },
  methods:{
    print:function (id){
      console.log(id)
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    createpost(){
      this.$router.push('/createpost');
    },
  }
}
</script>

<style lang="less" scoped>
//背景部分的css
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
  margin: 0px auto;
  box-shadow: 10px 10px 5px gray;
  border-radius: 30px;
  background-color: #f9fafc;
}
//这里是添加了浮动效果和边框形状改变的效果，在考完试后准备再加一个描边特效，但是估计比较耗时间就先给你这版了
.card:hover{
  box-shadow: 20px 15px 5px gray;
  border-radius: 50px 10px 50px 10px;

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
}


</style>

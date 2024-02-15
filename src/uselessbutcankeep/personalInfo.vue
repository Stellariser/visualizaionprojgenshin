<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5" class="header-row">

          <div style="float: left; margin-top: 18px">
            <router-link to="/home/">
              <i class="el-icon-s-home"></i>
              <!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
            </router-link>
            <h1 class="text" style="display: inline"><strong>XJTLU</strong><em>Bonding</em></h1>

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
        <el-col :span="1" style="margin-top: 12px">
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>
        <el-col :span="6" style="margin-top: 12px; text-align: right">
          <router-link to="/createPost">
            <el-button type="primary" icon="el-icon-edit" plain :disabled="disabled">
              <!--              在send页面边灰 改变disabled的值-->
              Add New Post
            </el-button>
          </router-link>
        </el-col>
        <el-col :span="6">

          <!--          头像加id-->
          <div style="float: right;margin-top: 6px">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="50" :src="userInfo.avatar" style="margin-right: 5px"></el-avatar>
                <h4 style="display: inline; margin-left: 2px">{{ userInfo.nickName }}</h4>
                <i class="el-icon-arrow-down el-icon--right" style="margin-top: 19px"></i>








    @@ -60,113 +60,207 @@

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
    <el-main>
      <el-row class="me-row" :gutter="20" type="flex" align="middle" style="margin-top: 100px">
        <el-col :span="5" :offset="0">
          <div class="left-nav" style="border: 10px solid red">
            <!--          这里我加了hover,  颜色选的丑的一批, 后面诺, 交给你了, 加油奥里给
                          对了click也可以加, 然后效果什么的都可以调 什么鼠标变手 阴影之类的
            -->
            <ul class="left-nav-list">
              <li>
                <div class="nav-button">
                  <div class="text text2" style="margin-top: 25px">
                    <p style="margin: 8px auto">Personal</p>
                    <p style="margin: 8px auto">Information</p>
                  </div>
                </div>
              </li>

              <li>
                <div class="nav-button" style="line-height: 100px">
                  <!--                line height = height 居中-->
                  <div class="text text2">
                    <p style="margin: 0 auto">My Post list</p>
                  </div>
                </div>
              </li>

              <li>
                <div class="nav-button" style="line-height: 100px">
                  <div class="text text2">
                    <p style="margin: 0 auto">Liked History</p>
                  </div>
                </div>
              </li>

              <li>
                <div class="nav-button">
                  <div class="text text2" style="margin-top: 25px">
                    <p style="margin: 8px auto">Commented</p>
                    <p style="margin: 8px auto">History</p>
                  </div>
                </div>
              </li>

              <li>
                <div class="nav-button" style="line-height: 100px">
                  <div class="text text2">
                    <p style="margin: 0 auto">My Post list</p>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-divider direction="vertical" style="height:10em"></el-divider>
        </el-col>
        <el-col :span="4">
          <div style="border: 10px solid black">
            <div class="middle-avatar" style="margin-top: -50px">
              <el-avatar :size="180" :src="AvatarB64"></el-avatar>
              <br><br><br>
              <el-button type="primary" icon="el-icon-edit">Change</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical" style="height:10em"></el-divider>
        </el-col>

        <el-col :span="12">
          <div style="border:3px solid blue">
            <div class="personalInfo" style="margin: 0 auto; border: 2px solid blueviolet">
              <div class="upper-lever"
                   style="height: 75%; box-sizing: border-box; border: #00DBDE 1px solid;padding: 40px 20px">
                <div style="text-align: left">
                  <ul>
                    <!--                 这里字体字号也交给你了诺-->
                    <li style="list-style: none;"><p>nickName: {{ personalInfo.nickName }}</p></li>
                    <li style="list-style: none;"><p>gender: {{ personalInfo.gender }}</p></li>
                    <li style="list-style: none;"><p>grade: {{ personalInfo.grade }}</p></li>
                    <li style="list-style: none;"><p>major: {{ personalInfo.major }}</p></li>
                    <li style="list-style: none;"><p style="padding: 0;margin:0">Personal</p>
                      <p style="padding: 0;margin:0">Description: </p>
                      <p style="padding: 0;margin-top:5px">{{ personalInfo.PersonalizedInfo }}</p></li>
                  </ul>
                </div>

              </div>
              <div class="bottom-lever" style="height: 25%; line-height: 150px">
                <el-button style="margin: 0 auto;" type="primary" icon="el-icon-edit" size="medium" plain
                           @click="dialogVisible = true">Modify personalInfo
                </el-button>
                <!--                    title="Modify your Information"-->
                <el-dialog
                    :visible.sync="dialogVisible"
                    width="35%"
                    style="line-height: 30px;">
                  <h3>!!Modify Your Information!!</h3>
                  <el-form ref="InfoModificationForm" hide-required-asterisk="true" :label-position="labelPosition" label-width="100px" :model="InfoModificationForm" :rules="InfoModificationFormRules">
                    <el-form-item label="nickName" prop="nickName">
                      <el-input v-model="InfoModificationForm.nickName" placeholder="Let's get a cool name"></el-input>
                    </el-form-item>
                    <el-form-item label="gender" prop="gender" >
                      <el-input v-model="InfoModificationForm.gender" placeholder="Are you male or female? Or middle"></el-input>
                    </el-form-item>
                    <el-form-item label="grade" prop="grade" >
                      <el-input v-model="InfoModificationForm.grade" placeholder="Tell us your grade?"></el-input>
                    </el-form-item>
                    <el-form-item label="major" prop="major">
                      <el-input v-model="InfoModificationForm.major" placeholder="Find people in same major!"></el-input>
                    </el-form-item>
                    <el-form-item label="Description" prop="personalDes" >
                      <el-input type="textarea"
                                v-model="InfoModificationForm.personalDes"
                                :autosize="{ minRows: 3, maxRows: 5}"
                                placeholder="Introduce yourself to other one"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" @click="submit(InfoModificationForm)">Submit</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </div>
        </el-col>

      </el-row>
    </el-main>


  </el-container>
</template>
<script>
export default {
  name:'home33',
  data(){
    return{
        //这里不知道为什么我电脑只能识别绝对路径，还得辛苦你改一下了
        backgroundDiv: {
          backgroundImage: "url(" + require("../assets/xjtluBG.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "2500px auto",
          marginTop: "10px",
        },
      labelPosition:'left',
      dialogVisible: false,
      InfoModificationForm:{
        nickName:'',
        gender:'',
        grade:'',
        major:'',
        personalDes:''
      },
      personalInfo:{
        nickName:'',
        gender:'',
        grade:'',
        major:'',
        PersonalizedInfo:'',
      },
      AvatarB64:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfo:{
        nickName:'DefaultAdmin',
        avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      InfoModificationFormRules:{
        nickName: [
          { required: true, message: 'please input your username', trigger: 'blur' },
          { min: 3, max: 12, message: 'length should >= 3 and < 12', trigger: 'blur' }
        ],
        gender: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        grade: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        major: [
          { required: false,  trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        personalDes: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 100, message: 'length should not over than 100', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    //header的
    getUserInfo:function (){
      const token = localStorage.getItem('idToken')
      this.$http.get('/getUserInfo',{headers:{'token':token}}).then(res=>{
        this.userInfo.nickName=res.data.data.nickName
        this.userInfo.avatar = res.data.data.avatar
      })
    },
    getPersonalInfo:function (){
      const token = localStorage.getItem('idToken')
      this.$http.get('/user/getPersonalInfo',{params:{'token':token}}).then(res=>{
        if(res.data.status===200){
          this.AvatarB64= res.data.data.avatar
          this.personalInfo.nickName=res.data.data.nickName
          this.personalInfo.gender=res.data.data.gender
          this.personalInfo.grade=res.data.data.grade
          this.personalInfo.major=res.data.data.major
          this.personalInfo.PersonalizedInfo=res.data.data.PersonalizedInfo
        }else {
          alert('unknown error of system')
        }
      })
    },

    ////20:34 改动, 还改动了上面subimit
    submit(formName){
      const token = localStorage.getItem('idToken')
      this.$refs[formName].validate(async (valid)=>{
        if(valid){
          //!!!!!! 这里我直接传表单了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
          await this.$http.get('/user/modifyInfo', {params:{token:token,form:this.InfoModificationForm}}).then(res=>{
            //修改成功
            if(res.data.status===200){
              //消失弹框
              this.dialogVisible= false
              //弹出祝贺1.5秒
              setTimeout("alert('success modified LOL!!')",1500)
              //还不存在, 后续改router
              this.$router.push('/home/mePage')
            }else{
              alert('userName has been used, sorry~')
            }
          })
        }else {
          alert('Could you pls check again T-T')
        }
      })
    }
  },
  created() {
    //header栏的,后面整合删掉
    this.getUserInfo()

    this.getPersonalInfo()
  }
}
</script>

<style lang="less" scoped>
el-divider{
  height: 10em;
}
.personalInfo{
  height: 600px;
  width: 500px;
}
.middle {
  width:100%;
  height:100%;
  position:absolute;
  background-size:cover;
  object-fit: cover;
  -webkit-filter: blur(10px);
}
.left-nav-list .nav-button:hover{
  border-radius: 20px;
  //挑radius要连着下面的navbutton一起调
  background-color: #99a9bf;
}
.nav-button{
  height: 100px;
  width: 200px;
  border:2px black solid;
  margin: 2px auto;
  border-radius: 20px;
}
li{
  list-style: none;
}
.me-row{
  margin: 0;
  padding: 0;
  line-height: 18px !important;
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
a:visited{
  text-decoration: none;
  color: yellow;
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
}
</style>

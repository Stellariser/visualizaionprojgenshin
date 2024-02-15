
<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading" class="common-layout">
      <el-dialog
        title="Failed Login"
        :visible.sync="DialogVisible"
        width="20%"
        height ="20%"
        >
        <p>{{popMessage}}</p>
        <div style = "text-align:center">
              <span slot="footer" class="dialog-footer">
              <el-button @click="DialogVisible = false">login again</el-button>
              <el-button type="primary" @click="register">register a new account</el-button>
              </span>
        </div>
      </el-dialog>
      <el-container>
        <el-header>Welcome to XJTLU Bonding!</el-header>
        <el-main><div style = "transform:rotate(6deg)">   //Bonding//</div></el-main>
        <el-footer>May the joy and happiness around you today and always!</el-footer>
      </el-container>

      <div class="login_container" >
        <div class="login_box">
          <!--头像区域-->
          <div class="avatar_box">
            <img src="../assets/riden.jpg" alt="">
          </div>
          <!--登陆表单区-->
          <div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
              <!--用户名-->
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="please input username" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <!--密码-->
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="please input the password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
              </el-form-item>
              <!--按钮-->
              <el-form-item class="btns">
                <el-button type="primary" @click="login('loginForm')" :loading="isLoading">Log in</el-button>
                <el-button type="info" round @click = "register" :loading="isLoading">Register</el-button>
              </el-form-item>
              <el-form-item class="btns2">
                <el-button type="text" round @click = "reset">Forgotten password?</el-button><!--reset 路由，需要跳转到重设界面，重设界面没写-->
              </el-form-item>
              <el-form-item class="btns2">
                <el-button type="text" round @click = "">Guest Mode?</el-button><!--游客模式-->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    let isPassword = (rule,value,callback) => {
      // let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      //实现密码校验数字和字母
      let Reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
      if (!value) {
        //如果为空就回调错误的信息
        return callback(new Error("password could not be empty"));
      }
      if (!Reg.test(value)) {
        callback(new Error('please input legal password with the use of number and letter'));
      }
      else{
        callback();
      }
    };
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: 'asd123asd'
      },
      isLoading:false,
      DialogVisible: false,
      popMessage:'',
      fullscreenLoading: false,

      // 表单验证规则
      loginFormRules: {
      username: [
        { required: true, message: 'please input your username', trigger: 'blur' },
        { min: 3, max: 12, message: 'length should >= 3 and < 12', trigger: 'blur' }
      ],
          password: [
        { required: true, message: 'pls input your password', trigger: 'blur' },
            { min: 6, max: 12, message: 'length should >= 6 and <= 12', trigger: 'blur' },
        { validator: isPassword,  trigger: 'blur' }
      ],

    },

    }
  },
  methods: {

    reset: function (){
      this.$router.push('/reset')
    },

    login(formName) {
      if(!localStorage.getItem('passwordWrongTime')){
        this.$store.commit('INIT_PASS_W')
      }
      this.isLoading=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$http.post('/user/login' ,this.loginForm).then(res=>{
            console.log(this.loginForm)
            if (res.data.status===200){
              this.$store.commit('INIT_PASS_W')
              const jwt = res.data.data.id
              this.$store.commit('SET_LOGSTATUS',{name:'loginObj',idToken:jwt,lastTime:Date.now()})
              this.$router.push('/home')
            }
            else if(res.data.status===0){
              // alert('username has been used, pls change to another one')
              this.popMessage = res.data.msg
              this.DialogVisible = true
            }else if(res.data.status===1){
            //   密码错了
              if(localStorage.getItem('passwordWrongTime')>=3){
                this.$store.commit('INIT_PASS_W')
                this.$router.push('/reset')
              }
              this.$store.commit('ADD_PASS_W')
              this.popMessage = res.data.msg
              this.DialogVisible = true
            }
          })

        } else {
          console.log('error submit!!');
          this.isLoading = false
          this.DialogVisible = true
          return false;
        }
        this.isLoading = false

      });
    },
    register () {
      this.$router.push('/register')
    },
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #00428f;
    height: 100%;

  }


  .login_box{
    width:450px;
    height:350px;
    background-color: #E0E0DF;
    border-radius:3px;
    position: absolute;
    left:50%;
    top:50%;
    opacity: 80%;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow:2px 2px 8px #aaaaaa;
    transform: translate(-50%,-50%);

    .avatar_box{
      height:180px;
      width:180px;
      border: 1px solid #6253FF;
      padding:10px;
      border-radius: 80%;
      background-color: #6253FF;
      position: absolute;
      left:52%;
      transform: translate(-50%,-60%);
      img{
        padding:10%;
        height:80%;
        width:80%;
        border-radius: 90%;
      }

    }
    .btns{
      display: flex;
      justify-content: center;
    }
    .btns1{
         display: flex;

          padding-left: -10px;
        padding-top: -20px;
         justify-content: left;
       }

    .btns2{
      display: flex;
      height: 5px;
      justify-content: center;

    }
    .register{
      display: flex;
      position: relative;
      top:80%;
      left:5%;
    }
    .login_form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px ;
      box-sizing: border-box;
    }
  }
  .el-header,
  .el-footer {
    background-color: #6253FF;
    color: white;
    text-align: center;
    justify-content: center;
    font-size: large;
    font-style: italic;
    font-family: "UD Digi Kyokasho N-B";
    font-weight: bold;
    fill-opacity: 80%;
    line-height: 60px;
    border-radius: 7px;
    position: page;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    line-height: 780px;
    color: #6253FF;
    text-align: center;
    font-family: "BIZ UDGothic";
    font-size: 300px;
    opacity: 70%;
    font-weight: bold;
    overflow-y:hidden;
    overflow-x:hidden;
    filter: blur(20px);
    transition: all 1s;
  }

  .el-main:hover {
    filter: blur(0px);
    opacity: 100%;
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
</style>

<template>
    <div class="common-layout">
      <el-dialog
        title="Duplicate UserName!"
        :visible.sync="DialogVisible"
        width="20%"
        height ="20%"
        >
        <div style = "text-align:center">
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="DialogVisible = false">close</el-button>
              </span>
        </div>
      </el-dialog>
        <el-container>
            <el-header>Register</el-header>
            <el-main><div style = "transform:rotate(6deg)">   //Bonding//</div></el-main>
            <el-footer>May the joy and happiness around you today and always!</el-footer>
        </el-container>

        <div class="login_container">
            <div class="login_box">
                <!--头像区域-->
                <div class="avatar_box">
                    <img src="../assets/riden.jpg" alt="">
                </div>
                <!--登陆表单区-->
                <div>
                    <el-form ref="regForm" :model="regForm" :rules="registerFormRules" label-width="0px" class="login_form">
                        <!--用户名-->
                        <el-form-item prop="username">
                            <el-input placeholder="your name" v-model="regForm.username" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <!--密码-->
                        <el-form-item prop="password">
                            <el-input placeholder="enter your password" v-model="regForm.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input placeholder="confirm your password" v-model="regForm.confirmPassword" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                        </el-form-item>
                      <el-form-item prop="answer">
                        <el-input placeholder="Where is your hometown?" v-model="regForm.answer" ></el-input>
                      </el-form-item>
                        <!--按钮-->
                      <el-form-item  prop="validation" style="width: 450px">
                        <el-input v-model="regForm.validation" style="width: 200px; float: left" ></el-input>
                        <el-image @click="getImage()" :src="'data:image/png;base64,'+ this.captureImage" alt="" class="validationImage" fit="scale-down" ></el-image>
                          <el-button type="primary" round @click = "submit('regForm')" :loading="isLoading">Submit!</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {Base64} from "js-base64";

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

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regForm.confirmPassword !== '') {
          this.$refs.regForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatevalidation = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('pls input the validation code'));
      } else if (value.toLowerCase() !== this.realValid) {
        callback(new Error('wrong validation code'));
      } else {
        callback();
      }
    };
    return {
      DialogVisible: false,
      isLoading:false,
      captureImage:'',
      realValid: '',
      // 这是登陆表单的数据绑定对象
      regForm: {
        username: '',
        password: '',
        confirmPassword: '',

        answer: '',
        validation:'',
      },
      fake:{
        id :1,
      },
      // 表单验证规则
      registerFormRules: {
        username: [
          { required: true, message: 'Username', trigger: 'blur' },
          { min: 3, max: 12, message: 'length: 3-12', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password', trigger: 'blur' },
          { min: 6, max: 12, message: 'length: 6-12', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Confirm Password', trigger: 'blur' },
          { min: 6, max: 12, message: 'Must be the same!', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        answer: [
          { required: true, message: 'Where is your hometown?', trigger: 'blur' },
          { min: 2, max: 15, message: 'Where is your hometown?', trigger: 'blur' }
        ],
        validation: [
          { validator: validatevalidation, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    login () {
      this.$router.push('/home')
    },
    getImage:function (){

      this.$http.get('/VerificationCode/get', {  params: this.fake }).then(res=>{
        this.captureImage = res.data.data.base64;
        this.realValid = res.data.data.ansewr;
        console.log(this.realValid)
        console.log(res)
      })
    },
    submit (formName) {
      this.isLoading=true
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.get('/user/register', { params: this.regForm })
          console.log(res.status,'status is')
          if (res.status===200){

              // const jwt = res.data.id
              // console.log('this is data', res.data)
              // console.log('jwt:',jwt)
              // this.$store.commit('SET_LOGSTATUS',{name:'loginObj',idToken:jwt,lastTime:Date.now()})
              this.$message({message:"success registration!!!",type:"success"})
              await this.$router.push('login')
            }
          if(res.status===0){
              // alert('username has been used, pls change to another one')

              this.DialogVisible=true
            }


        } else {
          alert('fail submit!');
          console.log('error submit!!');
          this.isLoading = false
          return false;
        }
        this.isLoading = false
        this.DialogVisible = true
      });
    },
  },
  created() {
    this.getImage()
  }
}
</script>

<style lang="less" scoped>
    .login_container{
        background-color: #00428f;
        height: 100%;

    }
    .validationImage{
      float: left;
      margin-left: 15px;
      border-radius: 4px;

    }

    .login_box{
        width:500px;
        height:380px;
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
            padding:5px;
            border-radius: 80%;
            background-color: #6253FF;
            position: absolute;
            left:52%;
            transform: translate(-50%,-60%);
            img{
                padding:10%;
                height:80%;
                width:80%;
                border-radius: 100%;
            }

        }
        .btns{
            display: flex;
            justify-content: flex-end;
            padding-left: 40%;

        }
        .register{
            display: flex;
            position: relative;
            top:80%;
            left:5%;
        }
        .login_form{
            position: absolute;
            bottom: -5%;
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

<template>
  <el-container>
    <el-header height="150px"></el-header>
    <el-main>
      <p>11111111111111111111</p>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xl="6" :lg="7">
            <h2>Welcome to PuCall</h2>
          <el-image style="width: 60%; height: 60%" :src="require('../assets/lin.jpg')"  fit="scale-down"></el-image>
          <p>哈哈哈哈鸡汤来了</p>
          <p>喝, 都给我喝啊啊啊啊啊啊啊啊啊啊啊啊</p>
        </el-col>
        <el-col :span="2">
          <el-divider  direction="vertical"  ></el-divider>
        </el-col>

        <el-col :xl="6" :lg="7" style="padding-top: 30px">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="username" prop="username" style="width: 380px">
              <el-input  v-model="loginForm.username" placeholder="please input username"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password" style="width: 380px">
              <el-input placeholder="please input the password" v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="validation" prop="validation" style="width: 380px">
                <el-input v-model="loginForm.validation" style="width: 100px; float: left" ></el-input>
                <el-image @click="getImage" :src="captureImage" class="validationImage" fit="scale-down"  ></el-image>
            </el-form-item>

            <el-form-item>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6" >
                  <el-button size="small" class="signIN" type="primary" @click="submitForm('loginForm')">SIGN IN</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button size="small" class="reset" @click="resetForm('loginForm')">Reset</el-button>
                </el-col>
                <el-col :span="6">
<!--                  <router-link to="/gorigister">-->
                  <el-popover
                      placement="bottom"
                      title="标题"
                      width="200"
                      trigger="manual"
                      content="别瞎输密码了, 点这里来注册, 开箱即玩"
                      v-model="visible">
                  <el-button class="signUpButton" slot="reference" size="small" @click="change" type="success" :loading="isLoading" >SIGN UP!</el-button>
                    </el-popover>
<!--                  </router-link>-->
                </el-col>
                <el-col :span="6">
                </el-col>
              </el-row>

            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {

    let isPassword = (rule,value,callback) => {
      // let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      //实现密码校验数字和字母
      let Reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,9}$/;
      if (!value) {
        //如果为空就回调错误的信息
        return callback(new Error("密码不能为空"));
      }
      if (!Reg.test(value)) {
        callback(new Error('please input legal password'));
      }
      else{
        callback();
      }
    };
    return {

      loginForm: {
        username: '',
        password: '',
        validation: '',
        //token 随机码, 用来确认是某一个用户多次访问
        token:'',
      },
      isLoading:false,
      captureImage: null,
      visible: false,

      rules: {
        username: [
          { required: true, message: 'please input your username', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'pls input your password', trigger: 'blur' },
          { min: 5, max: 100, message: '长度在 5 到 9 个字符', trigger: 'blur' },
          { validator: isPassword,  trigger: 'blur' }
        ],
        validation: [
          { required: true, message: 'pls input your ', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }

        ],

      }
    };
  },
  methods: {
    change:function (){
      this.isLoading = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login' ,this.loginForm).then(res=>{
            console.log(res.data)
            if (res.data.code===200){

              const jwt = res.data.data.id
              console.log('this is data', res.data.data)
              console.log('jwt:',jwt)
              this.$store.commit('SET_LOGSTATUS',{name:'loginObj',idToken:jwt,lastTime:Date.now()})
              this.$router.push('/home')
            }
            else if(res.data.code===409){
              // alert('username has been used, pls change to another one')
              alert('Wrong password or username')
              this.visible = true;
            }
          })

        } else {
          alert('fail submit!');
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getImage:function (){
      this.$axios.get('/getImage').then(res=>{
        this.captureImage = res.data.data.captureImage;
      })

    }

  },

  created() {
    this.getImage()
  }
}
</script>
<style scoped>
.el-row{
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

.el-divider{
  height: 200px;
}
.validationImage{
  float: left;
  margin-left: 15px;
  border-radius: 4px;

}
.signUpButton{
  margin-left: 8px;
}
.reset{
  margin-left: 8px;
}


</style>

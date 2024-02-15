<template>
    <div class="common-layout">
        <!--第一次提交校验用户名与问题答案返回的对话框-->
        <el-dialog
                title="Wrong User or Answer"
                :visible.sync="phase1DialogVisible"
                width="20%"
                height ="20%"
        >
            <div style = "text-align:center">
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="phase1DialogVisible = false">close</el-button>
              </span>
            </div>
        </el-dialog>

        <!--最后提交返回的对话框-->
        <el-dialog
                title="Reset Failure"
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
            <el-header>Reset password</el-header>
            <el-main><div style = "transform:rotate(6deg)">   //Bonding//</div></el-main>
            <el-footer>May the joy and happiness around you today and always!</el-footer>
        </el-container>

        <div class="login_container">
            <div class="login_box">
                <!--头像区域-->
                <div class="avatar_box">
                    <img src="../assets/reimu.jpg" alt="">
                </div>
                <!--登陆表单区-->
                <div>
                    <el-form ref="resForm" :model="resForm" :rules="resetFormRules" label-width="0px" class="login_form">
                        <!--用户名-->
                        <el-form-item prop="username">
                            <el-input placeholder="your name" v-model="resForm.username" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <!--密码-->
                        <el-form-item prop="answer">
                            <el-input placeholder="Where is your hometown?" v-model="resForm.answer" ></el-input>
                        </el-form-item>
                        <div class = "password" v-show="ifphase2">
                            <el-form-item prop="password" >
                                <el-input placeholder="enter your new password" v-model="resForm.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                            </el-form-item>
                            <el-form-item prop="confirmPassword">
                                <el-input placeholder="confirm your new password" v-model="resForm.confirmPassword" prefix-icon="el-icon-lock" type="password" show-password></el-input>
                            </el-form-item>
                        </div>
                        <!--按钮-->
                        <el-form-item style="width: 450px">
                            <!--最终提交按钮-->
                            <el-button v-show = "ifphase2" type="Next" round @click = "submit('resForm')" :loading="isLoading">Submit!</el-button>
                            <!--第一次提交按钮-->
                            <el-button v-show = "!ifphase2" type="Next" round @click = "next()" :loading="isLoading">Next!</el-button>
                        </el-form-item>
                    </el-form>
                    <div class = "progress" >
                        <el-steps  align-center="true" :active="active"  finish-status="success">
                            <el-step title="Step 1"></el-step>
                            <el-step title="Step 2"></el-step>
                        </el-steps>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name:'resetPassword',
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
                    if (this.resForm.confirmPassword !== '') {
                        this.$refs.resForm.validateField('confirmPassword');

                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                //控制对话框
                phase1DialogVisible: false,
                DialogVisible: false,
                //控制下一步
                ResetVisible: false,
                //控制进度条
                active: 0,
                //控制显示新密码输入表单
                ifphase2: false,
                isLoading:false,
                captureImage:'',

                // 这是登陆表单的数据绑定对象
                resForm: {
                  id:0,
                    username: '',
                    password: '',
                    confirmPassword: '',
                    answer: '',
                },
                // 表单验证规则
                resetFormRules: {
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

                }
            }
        },

        methods: {
          delay:function(fn,time){return new Promise(resolve=>{setTimeout(()=>{resolve(fn())},time)})},
            login () {
                this.$router.push('/home')
            },

            //第一次提交成功后，操作进度条，同时调整phase
            next() {
                // // this.phase1DialogVisible = true;
                // // 给上面加上if条件把下面用else包裹住即可以实现条件拦截第一次提交
                // // 返回对话框
                // if (this.active++ > 2) this.active = 0;
                // if (this.active === 1) this.ifphase2 = true;
                this.resForm.id = localStorage.getItem('idToken')
                this.$http.get('/user/answerCheck',{params:this.resForm}).then(res=>{

                  if(res.data.status===200){
                    if (this.active++ > 2) this.active = 0;
                    if (this.active === 1) this.ifphase2 = true;
                  }else if(res.data.status===0){
                    this.phase1DialogVisible = true;
                  }
                })
            },
            //假设第二次提交失败
            submit (formName) {
                // 先让按钮变加载
                this.isLoading=true
              //再去验证表单规则
              console.log("开始验证")
                this.$refs[formName].validate(async (valid)=>{
                  if(valid){
                    console.log("通过了")
                    //过了之后发送
                    await this.$http.get('/user/updatePassword',
                        {params:this.resForm}).then(async res=>{
                      //返回的成功就进一步条, 然后跳回登录
                      if(res.data.status===200){
                        this.active++
                        await this.delay(()=>this.$message({message:"Successfully Reset!!",type: 'success'}),500)
                        await this.$router.push('/login')
                      }
                      //失败了就弹出
                      else if(res.data.status===3){
                        //显示错误
                        this.DialogVisible = true
                      }
                    })
                  }
                  // 连表单规则都没过就直接弹出错误框
                  else {
                    this.DialogVisible = true
                  }
                  //加载结束
                  this.isLoading = false
                })

            },
        },
        created() {

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
    .progress{
        padding: 2%;
        position: absolute;
        justify-content: center;
        text-align: center;
        top: 85%;
        width: 90%;
    }

    .login_box{
        width:500px;
        height:460px;
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
            top: 12%;
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

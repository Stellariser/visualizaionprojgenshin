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
            <el-header>
              <el-col :span="5" class="header-row">

                <div style="float: left; margin-top: 18px" >
                    <i class="el-icon-s-home" ></i>
              <h1 class="text"style="display: inline"><strong>XJTLU</strong><em>Bonding</em></h1>

                </div>
              </el-col>
              <el-col  :span="24">
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
            </el-header>
        </el-container>
      <div class="middle" :style="backgroundDiv"></div><!--背景部分-->
        <div class="login_container">
            <div class="login_box">
                <div>
                    <el-form ref="postForm" :model="postForm" :rules="postFormRules" label-width="0px" class="login_form">
                        <!--用户名-->
                        <el-form-item prop="title">
                            <el-input placeholder="Post title here" v-model="postForm.title" prefix-icon="el-icon-chat-round"></el-input>
                        </el-form-item>
                        <el-form-item prop="content">
                            <el-input :rows = 12 placeholder="Post content here..." type="textarea" v-model="postForm.content"></el-input>
                        </el-form-item>
                        <!--按钮-->
                        <el-form-item class="btns">
                            <el-button class = "submit"type="primary" @click="submit()" :loading="isLoading">Submit</el-button>
                            <el-button class = "cancel"type="info" round @click = "cancel()" :loading="isLoading">Cancel</el-button>
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
            return {
              //这里不知道为什么我电脑只能识别绝对路径，还得辛苦你改一下了
              backgroundDiv: {
                backgroundImage: "url(" + require("D:\\CPT202\\XJTLUbonding-master\\XJTLUbonding-master\\src\\assets\\xjtlu.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "2500px auto",
                marginTop: "10px",
              },
                DialogVisible: false,
                isLoading:false,
                captureImage:'',
                realValid: '',
              userInfo:{
                id:'DefaultAdmin',
                avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
              },
                // 这是登陆表单的数据绑定对象
                postForm: {
                    title: '',
                    content: '',
                },
                // 表单验证规则
                postFormRules: {
                    title: [
                        { required: true, message: 'Title', trigger: 'blur' },
                        { min: 3, max: 12, message: 'length: 3-12', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: 'Content', trigger: 'blur' },
                    ],
                }
            }
        },

        methods: {
            submit () {
                const token = localStorage.getItem('idTolen')
                this.$axios.post('/addPost',this.postForm,{headers:{'token':token}})
                this.$router.push('/home')
            },
            cancel () {
                this.$router.push('/home')
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container{
        height: 100%;
    }
    //背景部分的css
    .middle {
      width:100%;
      height:100%;
      position:absolute;
      background-size:cover;
      object-fit: cover;
      -webkit-filter: blur(10px);
    }

    .login_box{
        width:600px;
        height:450px;
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
    }
    .btns{
        display: flex;
        justify-content: flex-end;
        padding-left: 40%;
        position: relative;
        top:80%;
        right:30%;
    }
    //顺便加了两个按钮的鼠标动效，后续可以再添加其他效果
    .submit:hover {
      border-radius: 50px 10px 50px 10px;
    }
    .cancel:hover{
      border-radius: 10px 50px 10px 50px;
    }

    .register{
        display: flex;
        position: relative;
        top:80%;
        left:5%;
    }
    .login_form{
        position: absolute;
        top: 5%;
        width: 100%;
        padding: 20px ;
        box-sizing: border-box;
    }
    .header-row{
      text-decoration: none;
      color: blue;
      font-size: 18px;
    }
      .el-header {
        padding-top: 0;
        padding-bottom: 0;
        background-image: linear-gradient(to right, #A7BFE8, #6190E8, #6253FF, #6190E8, #A7BFE8);
        color: #333;
        border-radius: 3px;
      }
      .el-dropdown-link{
        position: relative;
        top: -45px;
      }
    .text{
      position: relative;
      background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
      -webkit-background-clip: text; /*截取背景区域为文字*/
      color: transparent;
      background-size: 300% 100%; /*扩大背景区域*/
      animation: text 4s infinite linear;
      padding-top: 10px;
    }
    @keyframes text{
      0%  { background-position: 0 0;}
      100% { background-position: -150% 0;}
    }
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
        line-height: 1000px;
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

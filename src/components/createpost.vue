<template>
    <div class="common-layout" v-loading.fullscreen.lock="fullscreenLoading">
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
        <div class="login_container">
            <div class="create_box ">
                <el-header> Write Post </el-header>
                <div class = "inputs">
                    <el-form style=" position: relative" ref="postForm" :model="postForm" :rules="postFormRules" label-width="0px" class="login_form">
                        <!--用户名-->
                        <el-form-item prop="title">
                            <el-input placeholder="Post title here" v-model="postForm.title" prefix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                      <el-form-item prop="type">
                        <el-select v-model="addInfo.valueS" @focus="getScene" @change="sendScene(addInfo.valueS)" multiple filterable remote style="margin-top: 0px;margin-right: 400px" placeholder="Select category">
                          <el-option
                              v-for="item in optionsS"
                              :key="item.id"
                              :label="item.typeName"
                              :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                        <el-form-item prop="content">
                            <el-input :rows = 12 placeholder="Post content here..." type="textarea" v-model="postForm.content"></el-input>
                        </el-form-item>
                        <!--按钮-->
                        <el-form-item class="btns">
                            <el-button type="primary" @click="submit('postForm')" :loading="isLoading">Submit</el-button>
                            <el-button type="info" round @click = "cancel()" :loading="isLoading">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name:'createPost',
        data () {
            return {
              addInfo:{
                valueS:''
              },

              optionsS:[],
                DialogVisible: false,
                isLoading:false,
                fullscreenLoading:false,
                captureImage:'',
                realValid: '',
                // 这是登陆表单的数据绑定对象
                postForm: {
                    title: '',
                    content: '',
                    id:0,
                    typeString:''
                },
                // 表单验证规则
                postFormRules: {
                    title: [
                        { required: true, message: 'Title', trigger: 'blur' },
                        { min: 3, max: 24, message: 'length: 3-24', trigger: 'blur' }
                    ],

                    content: [
                        { required: true, message: 'Content', trigger: 'blur' },
                        { min: 1, max: 255, message: 'length: not more than 255', trigger: 'blur' }
                    ],
                }
            }
        },

        methods: {
          delay:function(fn,time){return new Promise(resolve=>{setTimeout(()=>{resolve(fn())},time)})},
          submit (formName) {
              this.$refs[formName].validate(async (valid)=>{
                if(valid){
                  const token = localStorage.getItem('idToken')
                  this.postForm.id=token
                  this.$http.get('/post/write', {params:this.postForm}).then(async res=>{
                    if(res.data.status===200){
                      this.$message({message:'add post success!! congratulations',type: 'success'});
                    }
                  })
                  await this.delay(()=>console.log("waiting"),600)
                  await this.$router.push('/home/')
                }
              })

            },
          async getScene () {
            const { data: res } = await this.$http.get('post/querytype')
            if (res.status === 200) {
              this.optionsS = res.data // 把获取到的数据赋给this.data
            }
          },
          sendScene () {
            this.postForm.typeString = JSON.stringify(this.addInfo.valueS)
          },
            cancel () {
                this.$router.push('/home/')
            },
        }
    }
</script>

<style lang="less" scoped>



    .login_container{
        height: 100%;
    }
    .inputs{
        position: relative;
        top: 1%;
    }


    .create_box{
        width:600px;

        background-color: #E0E0DF;
        border-radius:3px;
        position: absolute;
        left:50%;
        top:60%;
        opacity: 80%;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow:2px 2px 8px #aaaaaa;
        transform: translate(-50%,-50%);

    }
    //顺便加了两个按钮的鼠标动效，后续可以再添加其他效果
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    .btns{
      display: flex;
      justify-content: flex-end;
      padding-left: 30%;
      position: relative;
      top:80%;
      right: 33.3%;
    }
    .submit:hover {
      border-radius: 50px 10px 50px 10px;
    }
    .cancel:hover{
      border-radius: 10px 50px 10px 50px;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        color: #6253FF;
        text-align: center;
        opacity: 70%;
        filter: blur(20px);
        transition: all 1s;
    }

    .el-main:hover {
        filter: blur(6px);
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
    .login_box{
      height: 60%;
    }
</style>

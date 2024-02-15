<template>

  <div  v-loading.fullscreen.lock="fullscreenLoading" style="margin-top: 60px">

    <el-row class="card2">
<!--
       <el-col :span = "3">
        &lt;!&ndash; 占位，不要删。&ndash;&gt;
         .
       </el-col>
-->


      <el-col :span="18" :offset = "3" style="line-height: 10px">

        <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
        <div class="grid-content bg-purple" v-for="post in postList.slice((pageNumber-1)*pageSize, pageNumber * pageSize)" style="margin-bottom: 30px" >
          <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
          <div>
            <!--row内居中-->
            <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

              <!--头像-->
              <el-col :span="5" class="pic-name" style="text-align: right" >
                <!--                 上方设置右对齐 -->
                <el-badge is-dot class="item" type="primary">
                  <el-avatar  :src= "post.avatarurl" ></el-avatar>
                </el-badge>
              </el-col>
              <!-- 名字-->
              <el-col :span="12" style="text-align: left; margin-left: 2px">
                <div class = "username">
                  <h4>
                    {{post.writerName}}
                  </h4>
                </div>
              </el-col>
              <el-col :span="8" style="margin-left: 2px">
                <div class = "date">
                  <h4>
                    {{post.date}}
                  </h4>
                </div>
              </el-col>
            </el-row>

          </div>
          <div class="card" >
            <el-row type="flex" align="middle">
              <el-col :span="18" style="text-align: left">
                <div class = "title" style="font-size: 20px; font-family: Microsoft YaHei;"> <strong>Title:</strong>  {{post.title}}
                  <el-tag  v-show="typeof post.typeContent!=='undefined'" v-if="postType!=='none'" v-for="postType in (post.typeContent+',none').split(',') "  style = "margin-left: 10px;" :type = "displayType(postType)" effect="plain">
                    {{postType}}</el-tag>
                  <!---->
                </div>
              </el-col>
              <el-col :span='5'>
                <!--                    这里就是最方便的地方了， 直接绑定postid，  可以通过router to 直接传参post,id到detail 虽然还没实现  作为实验， 点击即可在控制台打印id-->
                <div class="detailbtn">
                  <el-button type="success" size="medium" round @click="SendToDetail(post.id)">See Detail</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>

    </el-row>
    <!--这个vif先写死了，不知道为什么判断会出问题， 详见底下-->
    <div v-if = "isAdmin" >
      <el-container>
        <el-header>Block words manager</el-header>
          <el-main>
            <el-table
                    :data="blockWords"
                    max-height = "300px"
                    style="width: 100%">
              <el-table-column
                      prop="word"
                      label="Word"
                      width="180">
              </el-table-column>
                <el-table-column label="operation">
                <!--删掉-->
                <template slot-scope="scope">
                  <el-button type = "danger" size="mini" @click="deleteBlockWords(scope.$index, scope.row)">delete</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class = "addBlockBar">
              <!--加-->
              <el-input type="textarea" v-model="newBlock" placeholder="Enter new block words here"
                        minlength="1" maxlength="30"
                        show-word-limit></el-input>
              <el-button type = "success" @click="addBlockWords(newBlock)">add</el-button>
            </div>
          </el-main>
      </el-container>
    </div>

    <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="queryInfo.pageNumber"
            :page-size= "queryInfo.pagesize"
            :page-sizes="[4]"
            layout="total, sizes, prev, pager, next"
            :total="total"
    >
    </el-pagination>

    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
  import home from '../components/home'
  import riden from '@/assets/riden.jpg'
  import kkn from '@/Lv2D/KKN/normal/model.json'
  export default {
    comments:{
      'home':home,
    },
    /*    filters: {
          statusFilter(status) {
            const statusMap = {
              1: 'success',
              2: 'danger'
            }
          },*/
    data(){
      return{
        newBlock:'',
        blockWords:[
        ],
        // 获取用户列表的参数对象
        queryInfo: {
          query: '',
          pageNumber: 1,
          pageSize: 4,
          typeList: [],
          typeListString: ''
        },
        avatarList:[{id:0,url:require('../assets/avatar/man1.png')},
          {id:1,url:require('../assets/avatar/man2.png')},
          {id:2,url:require('../assets/avatar/woman1.png')},
          {id:3,url:require('../assets/avatar/woman2.png')}],
        kkn:kkn,
        riden:riden,
        Avatar1:'',
        Avatar2:'',
        Avatar3:'',
        Avatar4:'',

        //判断是否为管理员，跨组件传值
        //default value has been changed to false
        isAdmin: false,
        // isAdmin: home.PersonId === 0,
        circleUrl: "../assets/riden.jpg",
        total:0,
        pageNumber: 1, //初始页
        pageSize: 4,    // 每页的数据
        input2:'',
        disabled:false,
        fullscreenLoading: false,
        postList:[],
      }
    },
    mounted() {
      this.queryevent.$on('query',(data)=>{
        this.queryInfo.query=data
        this.getPostList()
      })
      this.queryevent.$on('queryType',(data)=>{
        this.queryInfo.typeList=data
        this.getPostList()
      })
    },
    methods:{
      checkAdmin:function (){
          const admin = 52;
          const userId = localStorage.getItem('idToken')
          this.isAdmin = userId.toString()=== admin.toString();
      },
      addBlockWords:function (){
        if(this.newBlock.length<=0){
          const h = this.$createElement;

          return this.$notify({
            title: 'Notification',
            message: h('i', { style: 'color: teal'}, 'Please input something'),
            duration:1500,
            type:"info",
            position:"bottom-left"
          });
        }
        this.$http.get('/admin/addBlockWords',{params:{"blockWords": this.newBlock}}).then(async res=>{
          if(res.data.status===200){
            this.$message({message:":)"+res.data.msg,type:"success"})
            // 因为这里可以一次性输入多个数据， 所以最终应该是从后端接受
            // this.blockWords=this.blockWords.concat([{
            //   word: this.newBlock,
            // }])
            // this.blockWords=this.blockWords.concat(JSON.parse(res.data.data.newBlockWords))
            this.blockWords=this.blockWords.concat(res.data.data.newBlockWords)
            // console.log("this is new data",res.data.data)
            // console.log("this is new json block",res.data.data.newBlockWords)
            // console.log("this is new dejson block",JSON.parse(res.data.data.newBlockWords))
            console.log(this.blockWords)
            this.newBlock=''
          }
        }).catch(()=>{
          this.$message.error("Add words: can not fetch data")
        })
      },
      deleteBlockWords:function (index,row){
        console.log(index)
        console.log("this is",row)
        // console.log("3",this.blockWords[index].word="deleted successfully")
        this.$http.get('/admin/deleteBlockWords',{params:{"blockWords": this.blockWords[index].word}}).then(res=>{
          if(res.data.status===200){
            this.$message({message:":)"+res.data.msg,type:"success"})
            this.blockWords[index].word="deleted successfully"
          }
        }).catch(()=>{
          this.$message.error("delete words:can not fetch data")
        })
      },
      getBlockWords:function(){
        //获取一下blockwords
        this.$http.get('admin/getAllBlockWords',).then(res=>{
            if(res.data.status===200){
              console.log("success enter getAllBlockWords function")
              // this.blockWords=JSON.parse(res.data.data.blockWords)
              this.blockWords=res.data.data.blockWords
            }
        }).catch(()=>{
          this.$message({message:'can not fetch words from backend',type:'warning'})
        })
      },

      displayType(type) {
        if(type === "Friendship"){
          return "success";
        }
        else if(type === "Love"){
          return "danger";
        }
        else if(type === "Tweets"){
          return "info";
        }
        else if(type === "Share the joy" ){
          return "warning";
        }
        else{
          return "";
        }
      },
      print:function (id){
        console.log(id)
      },
      SendToDetail:function (id){
        console.log(id)
        this.$router.push({name:'postDetail',query:{id}  || this.redirect})
      },
      handleCurrentChange: function(newPage){
        this.queryInfo.pageNumber = newPage
        this.getPostList()
      },
      open() {
        const h = this.$createElement;
        this.$notify.info({
          title: 'Rules',
          duration: 6000,
          position: 'top-left',
          dangerouslyUseHTMLString: true,
          message: '<ul><li>1. This forum is an online community focusing on exchanging campus life.</li> <li>2. Members of this forum are independently responsible for the content they publish. The forum does not involve any political topics. Please understand.</li> <li>3. Advertising in any form is prohibited in this forum</li></ul>',
          offset: 0,
        });

        this.$notify({
          title: 'Welcome',
          duration: 500,
          position: 'bottom-right',
          offset: 250,
          message: h('i', { style: 'color: teal'}, 'This is XJTLU Bonding, a web forum for XJTLUers!')
        });

      },
      handleSizeChange: function(newSize){
        this.queryInfo.pageSize = newSize
        this.getPostList()
      },
      getPostList: async function (){
        //this.$refs.
        this.queryInfo.typeListString = JSON.stringify(this.queryInfo.typeList)
        const { data: res } = await this.$http.get('/post/queryPost',{ params: this.queryInfo })
        if (res.meta.status !== 200) {
          return this.$message.error('数据获取失败')
        }

        for(let i=0,len=Math.min(this.pageSize,res.data.postList.length);i<len;i++){

          res.data.postList[i].avatarurl=this.avatarList[res.data.postList[i].avatar].url
        }
        this.postList = res.data.postList
        this.total = res.data.totalpage
        console.log(this.postList,"aaaaaaaaaaaaaaaaa")
      }
    },
    created() {
      this.checkAdmin()
      //磨洋工加载条，给钱加速
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 500);
      this.getPostList()
      //磨洋工对话条
      setTimeout(() =>{
        this.open()}, 1500)
      this.getBlockWords()
    },

    // handleSizeChange(newSize) {
    //   this.queryInfo.pageSize = newSize
    //   this.getPostList()
    // },
    // handleCurrentChange(newPage) {
    //   this.queryInfo.pageNumber = newPage
    //   this.getPostList()
    // },
  }
</script>

<style lang="less" scoped>
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
  //see detail按钮效果*//
  .seedetail{
    background-color: #7DC4CC;
  }
  .contact {
    position: absolute;
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
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
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
  .date{
    text-align: left;
    font-style: italic;
    padding-left: 5px;
  }
  .detailbtn{
    position: relative;
    right:0px;
    bottom:-20px;
    color: #A7BFE8;
  }
  .card{
    width:65%;
    opacity: 80%;
    line-height: 30px;
    color: black;
    //border: 1px solid #999
    margin: 5px auto;
    padding: 0;
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    box-shadow: 10px 10px 5px gray;
    transition: all 500ms;
    border-radius: 15px;
    background-color: white;
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
  //这里是添加了浮动效果和边框形状改变的效果
  .card:hover{
    color: #6253FF;
    box-shadow: 20px 15px 5px gray;
    background-color: #f1f8ff;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  .router-link-active {
    text-decoration: none;
    color: #A7BFE8;
  }
  .addBlockBar{
    line-height: 40px;
    margin: 10px;
  }
  .el-container{
    padding: 0;
    margin: 0;
    bottom: 20%;
    height: auto;
    width: 20%;
    position: absolute;
  }
  .el-header {
    background-color: #6253FF;
    color: white;
    text-align: center;
    justify-content: center;
    font-size: large;
    opacity: 80%;
    width: auto;
    font-style: italic;
    font-family: "UD Digi Kyokasho N-B";
    font-weight: bold;
    fill-opacity: 80%;
    line-height: 60px;
    border-radius: 7px;
    position: page;
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
    line-height: 15px;
    background-color: #E9EEF3;
    color: #333;
    border-radius: 7px;
    opacity: 80%;
    text-align: center;
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
    overflow-x: hidden;
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
      overflow-x: hidden;
    }
  }
</style>

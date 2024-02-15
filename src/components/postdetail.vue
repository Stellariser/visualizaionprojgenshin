<template>

  <el-container v-loading.fullscreen.lock="fsLoading" style="height: 100%; border: 1px solid #eee">

    <el-container>
      <el-header style="text-align: center; font-size: 18px">
        <el-row :gutter="24" style="margin: 0;padding: 0">
          <el-col :span="6"  style="text-align: left">
            <span style="alignment: left">
              <el-button @click="toHome()"><i class="el-icon-s-home" ></i><strong>BackHome!!!</strong>></el-button>
            </span>
          </el-col>
          <el-col :span="12" style="text-align: center">
            <strong><em>Welcome to see detail!</em></strong>
          </el-col>

          <el-col :span="6" style="text-align: right">
              <div class="delete">
                <el-button v-if="isAdmin" @click="deletion" type="danger" icon="el-icon-delete-solid" size="medium" round>(艹皿艹 )Delete!</el-button>
              </div>
          </el-col>


        </el-row>
      </el-header>
      <el-main>
        <div class = "post"> <!--post info-->
          <el-table :data="postData">
            <el-table-column prop="avatar" label="Avatar" width="200">
              <!--avatar links here 绑定后端来的头像链接，暂时写死-->
              <div>
                <el-avatar :src="aurl"></el-avatar>
              </div>
            </el-table-column>
            <el-table-column prop="author" label="Author" width="200">
            </el-table-column>
            <el-table-column prop="post_title" label="title">
            </el-table-column>
          </el-table>
          <div class = "content">
            <el-table :data="postData"><!--post content-->
              <el-table-column prop="post_content" label="Content">
              </el-table-column>
            </el-table>
          </div>

        </div>

        <div class = "comment_button"><!--comment button-->
          <el-button type="success" @click="dialog = true">Comment!</el-button>
        </div>

        <el-col :span = "22" style="text-align: right">
          <div class = "star">
            <el-badge :value= "collectNum" class="item" type = "primary">
              <el-button type="warning" :icon= "collectIcon" circle @click="changeCollect()"></el-button>
            </el-badge>
          </div>
        </el-col>
        <el-col :span = "1" style="text-align: center; font-size: large">
        /
      </el-col>
        <el-col :span = "1">
          <div class = "heart" style = "text-align: left">
            <el-badge :value= "likeNum" class="item" type = "primary">
              <el-button type="danger" :icon="likeIcon" circle @click="changeLike()"></el-button>
            </el-badge>
          </div>
        </el-col>


        <div class = "comment">
          <el-table :data="commentList" stripe><!--Comments-->
            <el-table-column prop="writername" label="User" width="140">
            </el-table-column>
            <el-table-column prop="content" label="comment">
            </el-table-column>
          </el-table>
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
        </div>
      </el-main>
      <el-drawer
              title="Create Comment!"
              :before-close="handleClose"
              :visible.sync="dialog"
              direction="btt"
              custom-class="demo-drawer"
              ref="drawer"
      ><!--抽屉-->
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-col :span="16">
              <el-form-item label="Comment" :label-width="formLabelWidth">
                <el-input :rows="4" type="textarea" v-model="form.content" style="height: 90%" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-footer>
            <div class="demo-drawer__footer">
              <el-button @click="$refs.drawer.closeDrawer()">Cancel</el-button>
              <!--提交按钮-->
              <el-button type="primary" @click="submitComment(form)" :loading="loading">{{ loading ? 'Submitting...' : 'Submit!' }}</el-button>
            </div>
          </el-footer>
        </div>
      </el-drawer>
    </el-container>
  </el-container>

</template>

<style scoped>
  ::v-deep .heart.star{
    padding: 5px;
    position: absolute;
  }
  .el-header {
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
    color: #333;
  }
  .el-main{
    height: 100%;
  }
  .post{
    height: auto;
    border-color: #9F02FF;
    border-width: 3px;
    border-bottom-style: dashed;
  }
  .comment{
    height: 60%;
  }
  ::v-deep .el-table .cell {
    font-size: medium;
    white-space: pre-line;
  }
  ::v-deep .content .el-table .cell{
    line-height: 35px;
    padding: 10px;
    font-size: 20px;
    font-style: italic;
  }
  .comment_button{
    padding: 2%;
    position: relative;

  }
  ::v-deep .comment .el-table .cell{
    line-height: 20px;
    padding: 20px;
  }
</style>

<script>
  export default {
    name:'postDetail',

    data() {

      const comments = [];
      // const post = {
      //   author: 'Default',
      //   post_title: 'I fucked up today',
      //   post_content: "Sing praises of her heavenly descent!\nSpread the word of her heavenly descent!\nSing praises of her heavenly descent!\nAll be in awe of her heavenly descent!"
      // };
      return {
        deleteTarget:{
          id:0
        },
        isAdmin:false,
        collectIcon: "el-icon-star-off",
        likeIcon: "el-icon-plus",
        fsLoading: false,
        isLiked:false,
        isCollected:false,
        likeNum:0,
        collectNum:0,
        //临时 上
        queryInfo: {
          postId:0,
          pageNumber: 1,
          pageSize: 4,
        },
        total:0,
        pageNumber: 1, //初始页
        pageSize: 4,
        post: {
          id:0,
          author: '',
          post_title: '',
          post_content: '',
          commentNum:0,
          avatar:'',
          comments:''
        },
        postData:[],
        dialog: false,
        form: {
          content: ''
        },
        postAddForm:{
          posterId:0,
          postId:0,
          content:''
        },
        viewerPost:{
          viewerId:0,
          postId:0,
          like:0,
          collect:0,
          likeopt:0,
          collectopt:0
        },
        avatarList:[{id:0,url:require('../assets/avatar/man1.png')},
          {id:1,url:require('../assets/avatar/man2.png')},
          {id:2,url:require('../assets/avatar/woman1.png')},
          {id:3,url:require('../assets/avatar/woman2.png')}
        ],
        aurl:'',
        formLabelWidth: '160px',
        timer: null,
        //假数据，暂时这样写死
        commentNum:0,
        avatar:'',
        //postData: Array(1).fill(post),
        commentData: Array(this.commentNum).fill(comments),
        commentList:[]
      }
    },
    methods:{
      delay:function(fn,time){return new Promise(resolve=>{setTimeout(()=>{resolve(fn())},time)})},
      deletion: async function (){
        this.deleteTarget.id=this.post.id;
        const { data: res } = await this.$http.get('/post/delete',{ params: this.deleteTarget })
        //对target进行删除
        if (res.status !== 200) {
          this.$message.error('Delete failed')

        }else {
          this.$message.success("Delete successfully")
          await this.delay(()=>console.log("waiting"),600)
          await this.$router.push('/home')
        }
        //置空，防止潜在bug

      },
      checkAdmin:function (){
        const admin = 52;
        const userId = localStorage.getItem('idToken')
        this.isAdmin = userId.toString()=== admin.toString();
      },

      opendetail() {
        const h = this.$createElement;

        this.$notify({
          title: 'Post page',
          duration: 6000,
          position: 'bottom-right',
          offset: 250,
          message: h('i', { style: 'color: teal'}, 'You are currently looking at a post.\n You can comment anything if you want!\n')
        });
      },

      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!like
      ifLikedAndCollected:function (){
        const token = localStorage.getItem('idToken')
        this.viewerPost.viewerId=token
        this.viewerPost.postId=this.post.id
        this.$http.get('/post/checkLikeCollect',{params:this.viewerPost}).then(async res=>{
          console.log(res)
          if(res.data.status===200){
            this.isLiked = res.data.likeCheck
            this.isCollected = res.data.collectCheck
            this.viewerPost.like = this.isLiked
            this.viewerPost.collect = this.isCollected
            if(this.viewerPost.like!==1){
              this.likeIcon = "el-icon-check"
            }else {
              this.likeIcon = "el-icon-plus"
            }
            if(this.viewerPost.collect!==1){
              this.collectIcon = "el-icon-star-on"
            }else {
              this.collectIcon = "el-icon-star-off"
            }
          }
        }).catch(() => {
          console.log()
          this.$message({
            type: "warning",
            message: "can not fetch data"
          });
        });
      },
      changeLike:function (){
        const token = localStorage.getItem('idToken')
        // this.isLiked= !this.isLiked
        // this.viewerPost.like=this.isLiked
        if(this.viewerPost.like===0){
          this.viewerPost.likeopt=1
        }else {
          this.viewerPost.likeopt=0
        }
        this.viewerPost.viewerId=token
        this.viewerPost.postId=this.post.id
        //这里我写成这样就跟b站类似， 点赞和取消都只是加一减一
        if(this.isLiked){
          this.likeIcon = "el-icon-check"
          this.likeNum+=1
        }else {
          this.likeIcon = "el-icon-plus"
          this.likeNum-=1
        }
        this.$http.get('/post/likePost',{params:this.viewerPost}).then( async res=>{
          if(res.data.status===200){
            if(res.data.opt===0){
              this.$message({
                type:"success",
                message:"like success"
              })
            }
            if(res.data.opt===1){
              this.$message({
                type:"warning",
                message:"cancel like"
              })
            }
            this.ifLikedAndCollected()
          }
        }).catch(()=>{
          this.$message({
            type: "warning",
            message: "can not fetch data/change like"
          });
        })
      },
      changeCollect:function (){
        const token = localStorage.getItem('idToken')
        // this.isCollected= !this.isCollected
        // this.viewerPost.collect =  this.isCollected
        if(this.viewerPost.collect===0){
          this.viewerPost.collectopt=1
        }else {
          this.viewerPost.collectopt=0
        }

        this.viewerPost.viewerId=token
        this.viewerPost.postId=this.post.id
        //这里我写成这样就跟b站类似， 点赞和取消都只是加一减一
        if(this.isCollected){
          this.collectIcon = "el-icon-star-on"
          this.collectNum+=1
        }else {
          this.collectIcon = "el-icon-star-off"
          this.collectNum-=1
        }
        this.$http.get('/post/collectPost',{params:this.viewerPost}).then( async res=>{
          if(res.data.status===200){
            if(res.data.opt===0){
              this.$message({
                type:"success",
                message:"collect success"
              })
            }
            if(res.data.opt===1){
              this.$message({
                type:"warning",
                message:"cancel collect"
              })
            }
            this.ifLikedAndCollected()
          }
        }).catch(()=>{
          this.$message({
            type: "warning",
            message: "can not fetch data/change collect"
          });
        })
      },



      submitComment(form,id) {
        if(this.form.content===''){
          alert("pls do not input empty content")
        }else if(this.form.content.length>=255){
          alert("Maximum is 255")
        }else{
          const token = localStorage.getItem('idToken')
          this.postAddForm.posterId=token
          this.postAddForm.postId=this.post.id
          this.postAddForm.content = this.form.content
          this.$http.get('/post/replyWrite', {params:this.postAddForm}).then(async res=>{
            console.log(res)
            if(res.data.status===200){
              this.$message({message:'success!! congratulations',type: 'success'});
            }
            await this.delay(()=>console.log("waiting"),400)
            await this.$router.go(0)
          })
        }
      },
      getCommentList: async function (){
        this.queryInfo.postId=this.post.id
        const { data: res } = await this.$http.get('/comment/getPostComment',{ params: this.queryInfo })
        if (res.status !== 200) {
          return this.$message.error('数据获取失败')
        }

        this.commentList = res.data.commentInfo.list
        console.log(this.commentList)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        this.total = res.data.totalpage
        console.log("totoalis",this.total)
      },
      handleCurrentChange:function (newPage) {
        this.queryInfo.pageNumber = newPage
        this.getCommentList()
      },
      handleSizeChange:function (newPage){
        this.queryInfo.pageSize = newSize
        this.getCommentList()
      },
      getPostDetail:function (id){

        this.$http.get('/post/getPostDetail',{params:{'id':this.post.id}}).then(res=>{
          this.post.author = res.data.writer
          this.post.post_title = res.data.title
          this.post.post_content = res.data.content
          this.aurl = this.avatarList[res.data.avatar].url

          this.post.avatar =  res.data.data.avatar
          console.log(this.post)
          this.postData.push(this.post)
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!4/26 like pbi
          // this.likeNum = 100
          this.likeNum = res.data.likeTotal
          this.collectNum=res.data.collectTotal
          // this.collectNum=10000
          // this.post.commentNum = res.data.data.commentAmount
          // this.post.comments = res.data.data.comment
        })
      },
      toHome:function (){
        this.$router.push('/home')
      }
    },
    created() {
      this.checkAdmin();
      this.fsLoading = true;
      setTimeout(() => {
        this.fsLoading = false;
      }, 1000);

      this.post.id = parseInt(this.$route.query.id)
      this.getPostDetail(this.post.id)
      this.getCommentList()
      setTimeout(() =>{
      this.opendetail()}, 2000)
      this.ifLikedAndCollected()
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('Commit comment?')
              .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);
              })
              .catch(_ => {});
    },
    submitForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },


  }
</script>

<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: center; font-size: 18px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Post</span>
      </el-header>
      <el-main>
        <div class = "post"> <!--post info-->
          <el-table :data="postData">
            <el-table-column prop="avatar" label="Avatar" width="200">
              <!--avatar links here 绑定后端来的头像链接，暂时写死-->
              <div>
                <el-avatar src="https://pic.imgdb.cn/item/615426352ab3f51d9133f071.jpg"></el-avatar>
              </div>
            </el-table-column>
            <el-table-column prop="author" label="Author" width="200">
            </el-table-column>
            <el-table-column prop="post_title" label="title">
            </el-table-column>
          </el-table>
          <div class = "content">
            <el-table :data="contentData"><!--post content-->
              <el-table-column prop="post_content" label="Content">
              </el-table-column>
            </el-table>
          </div>
          <div class = "pic">
            <el-table empty-text = "No pictures!" :data="picture">
              <el-table-column prop="post_pic" label="Pic">
                <div class="demo-image__preview">
                  <el-image
                          style="width: 200px; height: 200px"
                          :src="picture"
                          :preview-src-list="picture">
                  </el-image>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class = "comment_button"><!--comment button-->
          <el-button type="success" plain>Comment!</el-button>
        </div>

        <div class = "comment">
          <el-table :data="commentData" stripe><!--Comments-->
            <el-table-column prop="user" label="User" width="140">
            </el-table-column>
            <el-table-column prop="comment" label="comment">
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<style scoped>

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
    height: 80%;
  }
  .comment{
    height: 80%;
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
    padding: 50px;
  }

  ::v-deep .comment .el-table .cell{
    line-height: 20px;
    padding: 20px;
  }
  ::v-deep .pic .el-table .cell{
    text-align: center;
    padding: 20px;
  }

</style>

<script>
  export default {
    data() {

      const comments = {
        user: 'Default',
        comment: 'Put your comments here.\n MahoramaniMahoramaniMahoramani\n'
      };
      const post = {
        author: 'Default',
        post_title: 'I fucked up today'
      };
      const content = {
        post_content: "Sing praises of her heavenly descent!\nSpread the word of her heavenly descent!\nSing praises of her heavenly descent!\nAll be in awe of her heavenly descent!"
      };
      return {
        //假数据，暂时这样写死
        postData: Array(1).fill(post),
        //图片链接，多张图片有bug
        picture: Array(1).fill('https://pic.imgdb.cn/item/623d6cdd27f86abb2ab9e2b4.jpg'),
        contentData: Array(1).fill(content),
        commentData: Array(10).fill(comments)
      }
    }
  };
</script>

<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5" class="header-row">

          <div style="float: left; margin-top: 18px">
            <router-link to="/404">
              <i class="el-icon-s-home"></i>
              <!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
            </router-link>
            <h1 style="display: inline"><strong>XJTLU</strong><em>Blonding</em></h1>

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
          <router-link to="Send">
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
                <h4 style="display: inline; margin-left: 2px">{{ userInfo.id }}</h4>
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
      </el-row>
    </el-header>

    <el-main>
      <router-view>
      </router-view>

      <div class="post"> <!--post info-->
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
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
          <el-table-column prop="post_abstract" label="abstract">
          </el-table-column>
          <el-table-column label="operation">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">view detail
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="1000">
        </el-pagination>
      </div>

    </el-main>
    <p>123456</p>
  </el-container>
</template>
<script>
export default {
  name: 'home',
  data() {

    return {
      tableData: [
        {
          author: "dandan1",
          post_title: "i am post title1",
          post_abstract: "i am post abstract1"
        },
        {
          author: "dandan2",
          post_title: "i am post title2",
          post_abstract: "i am post abstract2"
        },
        {
          author: "dandan3",
          post_title: "i am post title3",
          post_abstract: "i am post abstract3"
        },
        {
          author: "dandan4",
          post_title: "i am post title4",
          post_abstract: "i am post abstract4"
        },
        {
          author: "dandan5",
          post_title: "i am post title5",
          post_abstract: "i am post abstract5"
        },
        {
          author: "dandan6",
          post_title: "i am post title6",
          post_abstract: "i am post abstract6"
        },
        {
          author: "dandan2",
          post_title: "i am post title2",
          post_abstract: "i am post abstract2"
        },
        {
          author: "dandan7",
          post_title: "i am post title7",
          post_abstract: "i am post abstract7"
        },
        {
          author: "dandan8",
          post_title: "i am post title2",
          post_abstract: "i am post abstract2"
        },
        {
          author: "dandan9",
          post_title: "i am post title8",
          post_abstract: "i am post abstract8"
        },
        {
          author: "dandan10",
          post_title: "i am post title9",
          post_abstract: "i am post abstract9"
        },
        {
          author: "dandan11",
          post_title: "i am post title10",
          post_abstract: "i am post abstract10"
        },
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      input2: '',
      disabled: false,
      userInfo: {
        id: 'DefaultAdmin',
        avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }

}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
}

a {
  text-decoration: none;
  color: #d3dce6;
}

.router-link-active {
  text-decoration: none;
  color: #42b983;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.el-header {
  padding-top: 0;
  padding-bottom: 0;
  background-color: #B3C0D1;
  color: #333;

}

.el-col {
  height: 100%;
  margin-top: 0;
  padding-top: 0;
}

.el-row {
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
}
</style>

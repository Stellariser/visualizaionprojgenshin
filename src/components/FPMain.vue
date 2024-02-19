<template>
  <el-container class="home-cointainer">
    <!--头部区域-->
    <el-header>
      <div>
        <span>Genshin Teaming Assistant</span>
      </div>
      <el-button type="info" @click="logout">Exit</el-button>
    </el-header>
    <!--页面主体-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="250px">
        <!--侧边栏菜单区域-->
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#10173f"
            text-color="#fff"
            active-text-color="#409EFF"
            router>
          <!--一级菜单1-->
          <el-menu-item index="/Characters">
            <i class="el-icon-s-data"></i>
            <span slot="title">Characters</span>
          </el-menu-item>
          <el-menu-item index="/recommend-teams">
            <i class="el-icon-s-data"></i>
            <span slot="title">Recommend Teams</span>
          </el-menu-item>
          <el-menu-item index="/homework">
            <i class="el-icon-s-data"></i>
            <span slot="title">Test</span>
          </el-menu-item>
          <!--          &lt;!&ndash;一级菜单2&ndash;&gt;-->
          <!--          <el-submenu index="/dataset">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-location"></i>-->
          <!--              <span>数据集管理</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="/datasetlist"><i class="el-icon-menu"></i>数据集列表</el-menu-item>-->
          <!--              <el-menu-item index="/datasetinfo"><i class="el-icon-menu"></i>数据集详情</el-menu-item>-->
          <!--              <el-menu-item index="/FrameInfo"><i class="el-icon-menu"></i>帧详情</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--          </el-submenu>-->
          <!--          &lt;!&ndash;一级菜单3&ndash;&gt;-->
          <!--          <el-submenu index="/categories">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-location"></i>-->
          <!--              <span>分类管理</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="/scene"><i class="el-icon-menu"></i>场景</el-menu-item>-->
          <!--              <el-menu-item index="/classcification"><i class="el-icon-menu"></i>分类</el-menu-item>-->
          <!--              <el-menu-item index="/Tag"><i class="el-icon-menu"></i>标签</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--          </el-submenu>-->
          <!--          &lt;!&ndash;一级菜单4&ndash;&gt;-->
          <!--          <el-menu-item index="/search">-->
          <!--            <i class="el-icon-document"></i>-->
          <!--            <span slot="title">数据查找</span>-->
          <!--          </el-menu-item>-->
          <!--          &lt;!&ndash;一级菜单5&ndash;&gt;-->
          <!--          <el-menu-item index="/record">-->
          <!--            <i class="el-icon-setting"></i>-->
          <!--            <span slot="title">数据记录</span>-->
          <!--          </el-menu-item>-->
          <!--          &lt;!&ndash;一级菜单6&ndash;&gt;-->
          <!--          <el-menu-item index="user">-->
          <!--            <i class="el-icon-document"></i>-->
          <!--            <span slot="title">角色管理</span>-->
          <!--          </el-menu-item>-->
          <!--          &lt;!&ndash;一级菜单7&ndash;&gt;-->
          <!--          <el-submenu index="supervice">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-location"></i>-->
          <!--              <span>审核管理</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="/supervice"><i class="el-icon-menu"></i>数据集审核</el-menu-item>-->
          <!--              <el-menu-item index="/FrameSupervice"><i class="el-icon-menu"></i>帧审核</el-menu-item>-->
          <!--              <el-menu-item index="/LabelSupervice"><i class="el-icon-menu"></i>标签审核</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--          </el-submenu>-->
          <!--          &lt;!&ndash;一级菜单8&ndash;&gt;-->
          <!--          <el-submenu index="other">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-location"></i>-->
          <!--              <span>其他</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="7-1"><i class="el-icon-menu"></i>选项1</el-menu-item>-->
          <!--              <el-menu-item index="7-2"><i class="el-icon-menu"></i>选项2</el-menu-item>-->
          <!--              <el-menu-item index="7-3"><i class="el-icon-menu"></i>选项3</el-menu-item>-->
          <!--              <el-menu-item index="7-4"><i class="el-icon-menu"></i>选项4</el-menu-item>-->
          <!--              <el-menu-item index="1-5"><i class="el-icon-menu"></i>选项5</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--          </el-submenu>-->
        </el-menu>
      </el-aside>
      <!--右侧主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: #091534;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside{
  background-color: #091534;
}
.el-main{
  background-color: #e6e6e6;
}
.home-cointainer{
  height: 100%
}
</style>

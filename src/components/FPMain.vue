<template>
  <el-container class="home-cointainer">
    <!--头部区域-->
    <el-header>
      <div>
        <!-- <span>Genshin Teaming Assistant</span> -->
        <img src="../assets/GenSynergy_ba-style.png" alt="Genshin Teaming Assistant"> 
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
          <el-menu-item index="/team">
            <i class="el-icon-s-data"></i>
            <span slot="title">Team</span>
          </el-menu-item>
          <el-menu-item index="/homework">
            <i class="el-icon-s-data"></i>
            <span slot="title">Test</span>
          </el-menu-item>
          <div class="avatars-container">
            <!-- 遍历selectedRoles数组，为每个角色渲染一个头像 -->
            <vs-avatar v-for="(roleId, index) in $store.state.selectedRoles" :key="index" square class="vsavatar" @click="removeRole(index)" >
              <!-- 使用getAvatarSrc方法获取头像路径 -->
              <img :src="getAvatarSrc(roleId)" class="avatar" alt="avatar">
            </vs-avatar>
          </div>
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
    removeRole(index) {
      // 调用 Vuex 的 mutation 来将指定位置的角色 ID 设置为 0
      this.$store.commit('REMOVE_ROLE', index);
    },

    getAvatarSrc(id) {
      if (!isNaN(id)) { // 确保 id 是一个数字
        try {
          const numericId = Number(id);
          // 当 id 为 0 时，直接使用 0.png，否则使用 id+1 的图片
          const imageName = numericId;
          // const imageName = numericId === 0 ? 0 : numericId + 1;
          console.log(`Rendering image for ID: ${id}, using image: ${imageName}.png`);
          return require(`@/assets/genshinava/${imageName}.png`);
        } catch (e) {
          console.error(e);
          // 如果导入失败，返回默认头像图片的路径
          console.log(`Fallback due to error for ID: ${id}`);
          return require('@/assets/genshinava/0.png'); // 选择一个作为默认头像的路径，可能需要根据你的项目调整
        }
      } else {
        // 对于无效的 id，返回默认头像
        console.log(`Fallback due to invalid ID: ${id}`);
        return require('@/assets/genshinava/0.png');
      }
    },
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
    },

    getAvatarUrlById(roleId) {
      // 根据roleId返回对应的头像URL
      // 这里是一个示例路径，你需要根据实际情况来返回正确的路径
      return `@/assets/genshinava/${roleId}.png`;
    }
  },
  computed: {
    roleAvatars() {
      return this.$store.state.selectedRoles.map(roleId => {
        if (roleId === 0) {
          return '/path/to/default/avatar.png'; // 默认头像的路径
        } else {
          // 假设你有一个方法getAvatarUrlById来根据角色ID获取头像URL
          return this.getAvatarUrlById(roleId);
        }
      });
    }
  },

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
.vsavatar {
  width: 70px; /* 或其他固定大小 */
  height: 90px; /* 或其他固定大小 */
  margin: 10px; /* 根据需要调整间距 */
}
.avatars-container {
  display: grid;
  margin-left: 55px;
  gap: 10px;
  justify-content: start; /* 默认值，可更改为center, end, 或者space-between等 */
  padding-left: 20px; /* 或者使用这种方式来向右移动，根据需要调整 */
  margin-top: 80px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片按比例填充而不变形 */
}
</style>

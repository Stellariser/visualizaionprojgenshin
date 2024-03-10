<template>
  <div class="recommend-groups">
    <el-row :gutter="20" v-for="group in groups" :key="group.id">
      <el-col :span="24">
        <el-card class="group-card">
          <div class="team-header">
            <img :src="group.image" class="team-image" alt="Team Image">
            <div class="team-description">
              <h2>{{ group.name }}</h2>
              <p><strong>Characters:</strong> {{ group.characters.map(c => c.name).join(', ') }}</p>
              <p><strong>Pros:</strong> {{ group.pros }}</p>
              <p><strong>Cons:</strong> {{ group.cons }}</p>
            </div>
          </div>
          <div class="team-characters">
            <el-row :gutter="10">
              <el-col :span="6" v-for="character in group.characters" :key="character.id">
                <el-card>
                    <div>{{ character.name }}</div>
                    <div :class="`${character.role.toLowerCase()}-role`">{{ character.role }}</div>

                </el-card>
              </el-col>
            </el-row>
          <el-col :span="4" class="bot">
                <vs-button gradient :active="active == 1" @click="handleButtonClick2(group.id)">
                  Add All to Team
                </vs-button>
              </el-col>
              <el-col :span="10" class="bot">
                <vs-button type="danger" @click="deleteAllFromTeam">
                  Delete All
                </vs-button>
              </el-col>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RecommendGroups',
  data() {
    return {
      groups: [
        {
          id: 1,
          name: 'Rocks',
          image: require('@/assets/recommend_teams/1.png'),
          pros: 'The burst strength of the Three Rocks is definitely one of the best, and the output strength of the Three Rocks is the highest among all the station main C-type playstyles.',
          cons: 'It relies heavily on Ichidou to open his moves, and if he cant maintain a high intensity output after opening his moves and cant eat the balls, then the whole teams cycle will be out of whack ',
          characters: [
            { id: 15, name: 'Gorou', role: 'DPS' },
            { id: 1, name: 'Albedo', role: 'Support'},
            { id: 42, name: 'Lumine', role: 'Healer'},
            { id: 4, name: 'Arataki', role: 'Tank'}
          ]
        },

        {
          id: 2,
          name: 'Thunder Nation',
          image: require('@/assets/recommend_teams/2.png'),
          pros: 'Explosive output strength, wide range of attribute strikes, and high degree of fault tolerance are the optimal solutions for the current lineups',
          cons: 'Almost no shortcomings',
          characters: [
            { id: 46, name: 'Xingqiu', role: 'DPS' },
            { id: 7, name: 'Bennet', role: 'Support'},
            { id: 31, name: 'Raiden', role: 'Healer'},
            { id: 44, name: 'Xiangling', role: 'Tank'}
          ]
        },

        {
          id: 3,
          name: 'Team Yura',
          image: require('@/assets/recommend_teams/3.png'),
          pros: 'The output strength of is very high and can reach the level of a tier 1 lineup',
          cons: 'Poor stability, the main problem focuses on the fact that Yuras moves are timed rather than instant, and tend to suffer when encountering certain mechanic monsters, especially the kind that locks up the blood, or the kind that likes to run around',
          characters: [
            { id: 42, name: 'Lumine', role: 'DPS' },
            { id: 53, name: 'Zhongli', role: 'Support'},
            { id: 33, name: 'Rosiara', role: 'Healer'},
            { id: 12, name: 'Yura', role: 'Tank'}
          ]
        },
      ]
    };
  },
  methods: {
  handleButtonClick2(groupId) {
    // 根据groupId找到对应的group
    const group = this.groups.find(g => g.id === groupId);
    if (!group) {
      console.error('Group not found');
      return;
    }

    // 获取group中所有角色的ID
    const characterIds = group.characters.map(character => character.id);

    // 检查队伍是否有空位并添加角色
    characterIds.forEach(roleId => {
      if (!this.$store.state.selectedRoles.includes(roleId)) {
        if (this.$store.state.selectedRoles.includes(0)) {
          // 有空位，添加角色
          this.$store.commit('ADD_ROLE', roleId);
        } else {
          // 队伍已满，显示错误消息
          if (!this.fullTeamNotified) { // 防止重复通知
            this.$notify.error({
              title: 'Ouch...',
              message: 'The team is full.'
            });
            this.fullTeamNotified = true; 
          }
        }
      } else {
        // 角色已在队伍中，显示错误消息
        this.$notify.error({
          title: 'Ouch...',
          message: `${group.characters.find(c => c.id === roleId).name} is already in the team.`
        });
      }
    });

    this.fullTeamNotified = false;
  },
  deleteAllFromTeam() {
    // 确认操作
    this.$confirm('Are you sure you want to delete all characters from the team?', 'Caution', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }).then(() => {
      this.$store.commit('REMOVE_ROLE',0);
      this.$store.commit('REMOVE_ROLE',1);
      this.$store.commit('REMOVE_ROLE',2);
      this.$store.commit('REMOVE_ROLE',3);
      // 显示操作成功
      this.$notify({
        title: 'Success',
        message: 'All characters have been removed.',
        type: 'success',
        duration: 2000
      });
    }).catch(() => {
      // 用户取消操作
    });
  },
},

handleButtonClick(index){
      console.log(index,"点击了确实是有用的");
      this.dialogid = index;
      console.log(this.dialogid,"this.dialogid!!!!!!!!");
      this.activeIndex = index;
      const numericId = Number(index)+1;
      console.log(`@/assets/genshinava/${numericId}.png`, "zenmegeshi");
      this.avatarSrc = require(`@/assets/genshinava/${numericId}.png`);




      console.log(this.centerDialogVisible,"this.centerDialogVisible");
      this.centerDialogVisible = !this.centerDialogVisible;
      console.log(this.centerDialogVisible,"this.centerDialogVisible");
      // let xDatastats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      // let yDatastats = [2, 5, 11, 1, 10, 8, 1, 2, 2, 0]
      // let optionstats = {
      //   title: {
      //     text: 'Stats'
      //   },
      //   tooltip: {},
      //   legend: {
      //     data: ['rate']
      //   },
      //   xAxis: {
      //     data: xDatastats
      //   },
      //   yAxis: {},
      //   series: [{
      //     name: 'rate',
      //     type: 'bar',
      //     data: yDatastats,
      //     itemStyle: {
      //       color: '#c23531' // 将颜色设置为蓝色
      //     }
      //   }]
      // };
      // let mychart2 = echarts.init(this.$refs.myChart2)
      // mychart2.setOption(optionstats)


    },

};
</script>


<style scoped>
.recommend-groups {
  margin: 20px;
}

.group-card {
  margin-bottom: 20px;
  overflow: hidden;
}

.team-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.team-image {
  width: 650px;
  margin-right: 20px;
}

.team-description h2 {
  margin: 0;
  font-size: 1.5em;
}

.team-characters {
  margin-top: 20px;
}

.character-avatar {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}

.dps-role {
  color: #e63946;
}

.support-role {
  color: #f4a261; 
}

.healer-role {
  color: #2a9d8f;
}

.tank-role {
  color: #ccd2d4;
}

.details-button-container {
  display: flex;
  justify-content: center; /* This will center the button horizontally */
  align-items: center; /* This will center the button vertically if needed */
  margin-top: 10px; /* Add some space at the top if desired */
}
</style>

<!--
  <style scoped>
.recommend-groups {
  padding: 20px;
  background-color: #f5f5f5; /* Light grey background for contrast */
}

.group-card {
  margin-bottom: 20px;
  border: 1px solid #ebebeb; /* Light border for the card */
  box-shadow: 0 2px 8px rgba(0,0,0,0.10); /* Subtle shadow for depth */
  border-radius: 10px; /* Rounded corners for a softer look */
}

.team-actions {
  display: flex;
  justify-content: space-between; /* Space between the buttons */
  padding: 15px; /* Padding inside the buttons container */
}

.team-actions > .el-button {
  margin-right: 10px; /* Spacing between buttons */
}

.team-image {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  border-top-left-radius: 10px; /* Rounded top corners */
  border-top-right-radius: 10px;
}

.team-description {
  padding: 15px; /* Padding inside the description */
  background-color: #ffffff; /* White background for the content */
  border-bottom-left-radius: 10px; /* Rounded bottom corners */
  border-bottom-right-radius: 10px;
}

.team-description h2 {
  color: #333; /* Darker text for better readability */
  font-size: 1.5rem; /* Larger font size for headings */
  margin-bottom: 10px; /* Spacing after the heading */
}

.team-description p {
  color: #666; /* Lighter text for less important info */
  line-height: 1.5; /* More readable line height */
}

.character-avatar {
  border-radius: 5px; /* Rounded corners for avatars */
  box-shadow: 0 1px 4px rgba(0,0,0,0.16); /* Shadow for depth */
}

.dps-role, .support-role, .healer-role, .tank-role {
  display: inline-block; /* So they don't take up the full width */
  padding: 3px 6px; /* A little bit of padding */
  border-radius: 4px; /* Rounded corners for the role tags */
  color: #fff; /* White text */
  margin-right: 5px; /* Spacing between tags and text */
}

.dps-role {
  background-color: #e63946; /* A red shade for DPS */
}

.support-role {
  background-color: #f4a261; /* An orange shade for support */
}

.healer-role {
  background-color: #2a9d8f; /* A teal shade for healers */
}

.tank-role {
  background-color: #ccd2d4; /* A grey shade for tanks */
}
</style>
-->
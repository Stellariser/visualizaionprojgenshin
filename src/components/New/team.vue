<template>
  <el-container>
    <el-row :gutter="40" >
      <el-col :span="6" v-for="(roleId, index) in selectedRoles" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span :class="RoleType(roleId)">{{ RoleInTeam(roleId) }}</span>
            <!-- <span> roleId </span> -->
          </div>
          <div style="text-align: center;">
            <img :src="getAvatarSrc(Number(roleId)-1)" alt="角色头像" style="height: 200px; width: auto;">
          </div>
          <el-button type="primary" @click="openDialog(index)" style="margin-top: 5px">详情</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div ref="TeamScore" style="height:300px;width:100%;"></div>
      </el-col>
      <!-- <el-col :span="16">
        <div ref="DamageCycle" style="height:300px;width:100%;"></div>
      </el-col> -->
    </el-row>

    <!-- <el-col :span="20"><div class="grid-content bg-purple-dark">
        <div ref="radar" id="radar" style="height:800px;width:100%;"></div>
      </div></el-col> -->


    <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="card-container" ref="scrollContainer">
        <el-row :gutter="20">
          <el-col :span="11" v-for="(character, index) in characters" :key="character.id" v-if="index !== 0">
            <el-card class="card">
              <div>
                <!-- 角色头像 -->
                <img :src="getAvatarSrc(character.id)" class="avatar" alt="avatar">
              </div>
              <div>
                <!-- 操作按钮 -->
                <el-button type="primary" @click="addToTeam(Number(character.id)+1), TeamScoreCalc()">Add to team</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-container>


</template>

<script>
import Papa from "papaparse";
import * as echarts from "echarts";


export default {
  
  // beforeRouteEnter(to, from, next) {
  //   // 在路由切换开始之前触发
  //   console.log('路由即将切换')
  //   next() // 继续路由切换
  // },

  mounted() {
    
    this.loadCSVData().then(() => {
      this.TeamScoreCalc()
      // 确保此时数据已加载
      // this.sortedAndFilteredCharacters();
      this.$nextTick(() => {
        // for (let index = 0; index < this.characters.length; index++) {
        //   // 注意：这里假设你有一个 characters 数组已经被填充
        //   this.initRadarChart('radar-' + index,index );
        // }
        console.log('在动吗')
        this.DCchart = echarts.init(this.$refs.DamageCycle);
        this.DCchart.setOption(this.DCoption);
        this.TSchart = echarts.init(this.$refs.TeamScore);
        this.TSchart.setOption(this.TSoption);
        // this.getTS();

      });
    });

    console.log(this.characters, 'characters');  
  },
  name: "team",

  computed: {
    // 从 Vuex 获取 selectedRoles 数组
    selectedRoles() {
      return this.$store.state.selectedRoles;
    },



  },

  watch: {
    selectedRoles(newValue, oldValue) {
    console.log('数组变化了!!!!!');
    this.TeamScoreCalc()
    }
  },

  data() {
    return {
      dialogVisible: false,
      currentRoleIndex: null,
      characters: [],
      /**
       * 队伍分数，供队伍能力可视化使用
       * (侧边栏removeRole)
       * */ 
      teamScore: [
        0,  // 队伍ATK得分，大约在[0, 1500]
        0,  // 队伍DEF得分，大约在[0，4000]
        0,  // 队伍HP得分，回血能力，一般情况下在[0，150]，但选四个奶妈能达到550
        20, // 队伍伤害轴长度，一般都是20s，数据集里也没有，索性写死了
        0,  // 队伍COST，[0, 20]，是队伍的总星级，评判队伍是否昂贵的标准
      ],
      TSchart: null,
      TSoption : {
        title: {
          text: 'Team Score'
        },
        tooltip: {
          show: true,
        },
        legend: {
          // data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          center: ['50%','60%'],
          // shape: 'circle',
          indicator: [
            { name: 'ATK', max: 2000 },
            { name: 'DEF', max: 4000 },
            { name: 'HP', max: 200 },
            { name: 'DMG Cycle', max: 25 },
            { name: 'COST', max: 20 },
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
                {
                    value: [0, 0, 0, 0, 0],

                    symbol: 'rect',
                    symbolSize: 12,
                    lineStyle: {
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                      formatter: function (params) {
                        return params.value;
                      }
                    }
                }
            ]
          }
        ]
      },



      DCchart: null,
      DCoption : {
        visualMap: {
          show: false,
          min: 0,
          max: 10000
        },
        calendar: {
          range: '2017'
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.getVirtualData('2017')
        }
      }
    }
  },
  methods: {

    getTS() {
      return this.teamScore;
    },

    getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    },

    RoleType(roleId) {
      return {
        'Style_Vice_DamageDealer': this.characters[Number(roleId)].stats.tag1 === 'Vice_DamageDealer',
        'Style_Damage_Dealer': this.characters[Number(roleId)].stats.tag1 === 'Damage_Dealer',
        'Style_Healer': this.characters[Number(roleId)].stats.tag1 === 'Healer',
        'Style_Support': this.characters[Number(roleId)].stats.tag1 === 'Support',
      }
    },

    RoleInTeam(roleId) {
      let role = '';
      if (this.characters[Number(roleId)].stats.tag2.length === 0){
        return this.characters[Number(roleId)].stats.tag1;
      }
      else {
        role = this.characters[Number(roleId)].stats.tag1 + ' / ' + this.characters[Number(roleId)].stats.tag2;
        return role;
      }
      
    },

  /**.
   * 团队能力值算法：
   * TEAM atk score = sum(.score_atk_tag1 + .score_atk_tag2) * max(.coef_atkspt);
   * TEAM def score = sum(.def) * max(.coef_defspt);
   * TEAM hp score  = sum(.score_hlr_tag1 + .score_hlr_tag2) * max(.coef_hpspt);
   */
    teamATKscore() {  // 计算团队ATK得分
      let score=0;
      let atkcoef=1;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag2) + Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag1);
      }
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_atkspt) > atkcoef){
            atkcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_atkspt)
          }
      }
      score*=atkcoef;
      score=Number(score.toFixed(2));
      this.teamScore[0]=score;
      console.log("团队atk得分: ",score)
    },

    teamDEFscore() {  // 计算团队DEF得分
      let score=0;
      let defcoef=1;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.def_90_90_ac);
      }
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_defspt) > defcoef){
            defcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_defspt)
          }
      }
      score*=defcoef;
      score=Number(score.toFixed(2));
      this.teamScore[1]=score;
      console.log("团队def得分: ",score)
    },

    teamHPscore() { // 计算团队HP得分
      let score=0;
      let hlrcoef=1;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.score_hlr_tag2) + Number(this.characters[Number(this.selectedRoles[index])].stats.score_hlr_tag1);
      }
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_hpspt) > hlrcoef){
            hlrcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_hpspt)
          }
      }
      score*=hlrcoef;
      score=Number(score.toFixed(2));
      this.teamScore[2]=score;
      console.log("团队hp得分: ",score)
    },

    teamCost() { // 计算团队cost，就是所有队员星级加起来，让用户知道这队的造价是否昂贵
      let score=0;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          score += Number(this.characters[Number(this.selectedRoles[index])].rarity);
      }
      this.teamScore[4]=score;
      console.log("团队cost: ",score)
    },

    TeamScoreCalc() {  // 计算团队所有需要计算的项
      this.teamScore = [0, 0, 0, 20, 0];
      this.teamATKscore();
      this.teamDEFscore();
      this.teamHPscore();
      this.teamCost();
      console.log("当前团队值: [ATK, DEF, HP, PRD, COST]", this.teamScore)
      console.log(this.getTS(),"getts")
      this.TSoption.series[0].data[0].value = this.teamScore;
      console.log(this.TSoption.series[0].data[0].value,"radarval") // byd要加[0]
      this.TSchart = echarts.init(this.$refs.TeamScore);
      this.TSchart.setOption(this.TSoption);
      console.log("图表更新")
    },



    openDialog(index) {
      this.currentRoleIndex = index; // 保存当前操作的角色位置
      this.dialogVisible = true;
    },
    addToTeam(id) {
      // 替换指定位置的角色ID
  
      this.$set(this.selectedRoles, this.currentRoleIndex, id);

      // 关闭对话框
      this.dialogVisible = false;
    },
    getAvatarSrc(id) {
      if (!isNaN(id)) { // 确保 id 是一个数字
        try {
          const numericId = Number(id) + 1;
          // console.log(id)
          // 当 id 为 0 时，直接使用 0.png，否则使用 id+1 的图片
          const imageName = numericId;
          // const imageName = numericId === 0 ? 0 : numericId + 1;
          // console.log(`Rendering image for ID: ${id}, using image: ${imageName}.png`);
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
    parsePercentage(percentageString) {

      // 如果值是 undefined 或 'NA'，则直接返回 null
      if (percentageString === undefined || percentageString === 'NA') {
        return null;
      }
      // 只有值既不是 undefined 也不是 'NA' 时，才继续尝试转换
      if (percentageString.endsWith('%')) {
        return parseFloat(percentageString.slice(0, -1)) / 100;
      }
      return null;
    },




    loadCSVData() {
      return new Promise((resolve, reject) => {
        fetch('./data/genshinv1.csv')
            .then(response => response.text())
            .then(csvData => {
              Papa.parse(csvData, {
                header: true,
                complete: (results) => {
                  this.characters = results.data.map(character => {
                    return {
                      name: character.character_name !== 'NA' ? character.character_name : null,
                      playable: character.playable !== 'NA' ? character.playable : null,
                      rarity: character.rarity !== 'NA' ? character.rarity : null,
                      vision: character.vision !== 'NA' ? character.vision : null,
                      region: character.region !== 'NA' ? character.region : null,
                      model: character.model !== 'NA' ? character.model : null,
                      constellation: character.constellation !== 'NA' ? character.constellation : null,
                      birthday: character.birthday !== 'NA' ? character.birthday : null,
                      specialDish: character.special_dish !== 'NA' ? character.special_dish : null,
                      voice: {
                        eng: character.voice_eng !== 'NA' ? character.voice_eng : null,
                        cn: character.voice_cn !== 'NA' ? character.voice_cn : null,
                        jp: character.voice_jp !== 'NA' ? character.voice_jp : null,
                        kr: character.voice_kr !== 'NA' ? character.voice_kr : null,
                      },
                      stats: {
                        spsecial_0: character.spsecial_0 !== 'NA' ? this.parsePercentage(character.spsecial_0) : null,
                        special_1: character.special_1 !== 'NA' ? this.parsePercentage(character.special_1) : null,
                        special_2: character.special_2 !== 'NA' ? this.parsePercentage(character.special_2) : null,
                        special_3: character.special_3 !== 'NA' ? this.parsePercentage(character.special_3) : null,
                        special_4: character.special_4 !== 'NA' ? this.parsePercentage(character.special_4) : null,
                        special_5: character.special_5 !== 'NA' ? this.parsePercentage(character.special_5) : null,
                        special_6: character.special_6 !== 'NA' ? this.parsePercentage(character.special_6) : null,
                        arm: character.arm !== 'NA' ? character.arm : null,
                        hp_90_90_ac: character.hp_90_90_ac !== 'NA' ? character.hp_90_90_ac : null,
                        atk_90_90_ac: character.atk_90_90_ac !== 'NA' ? character.atk_90_90_ac : null,
                        def_90_90_ac: character.def_90_90_ac !== 'NA' ? character.def_90_90_ac : null,
                        hp_90_90: character.hp_90_90 !== 'NA' ? character.hp_90_90 : null,
                        atk_90_90: character.atk_90_90 !== 'NA' ? character.atk_90_90 : null,
                        def_90_90: character.def_90_90 !== 'NA' ? character.def_90_90 : null,
                        hp_80_90: character.hp_80_90 !== 'NA' ? character.hp_80_90 : null,
                        atk_80_90: character.atk_80_90 !== 'NA' ? character.atk_80_90 : null,
                        def_80_90: character.def_80_90 !== 'NA' ? character.def_80_90 : null,
                        hp_80_80: character.hp_80_80 !== 'NA' ? character.hp_80_80 : null,
                        atk_80_80: character.atk_80_80 !== 'NA' ? character.atk_80_80 : null,
                        def_80_80: character.def_80_80 !== 'NA' ? character.def_80_80 : null,
                        hp_70_80: character.hp_70_80 !== 'NA' ? character.hp_70_80 : null,
                        atk_70_80: character.atk_70_80 !== 'NA' ? character.atk_70_80 : null,
                        def_70_80: character.def_70_80 !== 'NA' ? character.def_70_80 : null,
                        hp_70_70: character.hp_70_70 !== 'NA' ? character.hp_70_70 : null,
                        atk_70_70: character.atk_70_70 !== 'NA' ? character.atk_70_70 : null,
                        def_70_70: character.def_70_70 !== 'NA' ? character.def_70_70 : null,
                        hp_60_70: character.hp_60_70 !== 'NA' ? character.hp_60_70 : null,
                        atk_60_70: character.atk_60_70 !== 'NA' ? character.atk_60_70 : null,
                        def_60_70: character.def_60_70 !== 'NA' ? character.def_60_70 : null,
                        hp_60_60: character.hp_60_60 !== 'NA' ? character.hp_60_60 : null,
                        atk_60_60: character.atk_60_60 !== 'NA' ? character.atk_60_60 : null,
                        def_60_60: character.def_60_60 !== 'NA' ? character.def_60_60 : null,
                        hp_50_60: character.hp_50_60 !== 'NA' ? character.hp_50_60 : null,
                        atk_50_60: character.atk_50_60 !== 'NA' ? character.atk_50_60 : null,
                        def_50_60: character.def_50_60 !== 'NA' ? character.def_50_60 : null,
                        hp_50_50: character.hp_50_50 !== 'NA' ? character.hp_50_50 : null,
                        atk_50_50: character.atk_50_50 !== 'NA' ? character.atk_50_50 : null,
                        def_50_50: character.def_50_50 !== 'NA' ? character.def_50_50 : null,
                        hp_40_50: character.hp_40_50 !== 'NA' ? character.hp_40_50 : null,
                        atk_40_50: character.atk_40_50 !== 'NA' ? character.atk_40_50 : null,
                        def_40_50: character.def_40_50 !== 'NA' ? character.def_40_50 : null,
                        hp_40_40: character.hp_40_40 !== 'NA' ? character.hp_40_40 : null,
                        atk_40_40: character.atk_40_40 !== 'NA' ? character.atk_40_40 : null,
                        def_40_40: character.def_40_40 !== 'NA' ? character.def_40_40 : null,
                        hp_20_40: character.hp_20_40 !== 'NA' ? character.hp_20_40 : null,
                        atk_20_40: character.atk_20_40 !== 'NA' ? character.atk_20_40 : null,
                        def_20_40: character.def_20_40 !== 'NA' ? character.def_20_40 : null,
                        hp_20_20: character.hp_20_20 !== 'NA' ? character.hp_20_20 : null,
                        atk_20_20: character.atk_20_20 !== 'NA' ? character.atk_20_20 : null,
                        def_20_20: character.def_20_20 !== 'NA' ? character.def_20_20 : null,
                        hp_1_20: character.hp_1_20 !== 'NA' ? character.hp_1_20 : null,
                        atk_1_20: character.atk_1_20 !== 'NA' ? character.atk_1_20 : null,
                        def_1_20: character.def_1_20 !== 'NA' ? character.def_1_20 : null,
                        elemental_mastery: character.elem_mastery_ac !== 'NA' ? character.elem_mastery_ac : null,
                        energy_recharge: character.elem_recharge_ac !== 'NA' ? character.elem_recharge_ac : null,
                        healing_bonus: character.heal_bns_ac !== 'NA' ? character.heal_bns_ac : null,
                        // team metric
                        /**.
                         * TEAM atk score = sum(.score_atk_tag1 + .score_atk_tag2) * max(.coef_atkspt);
                         * TEAM def score = sum(.def) * max(.coef_defspt);
                         * TEAM hp score  = sum(.score_hlr_tag1 + .score_hlr_tag2) * max(.coef_hpspt);
                         */
                        score_atk_tag1: character.score_atk_tag1 !== 'NA' ? character.score_atk_tag1 : null,
                        score_atk_tag2: character.score_atk_tag2 !== 'NA' ? character.score_atk_tag2 : null,
                        score_hlr_tag1: character.score_hlr_tag1 !== 'NA' ? character.score_hlr_tag1 : null,
                        score_hlr_tag2: character.score_hlr_tag1 !== 'NA' ? character.score_hlr_tag2 : null,
                        coef_atkspt: character.coef_atkspt !== 'NA' ? character.coef_atkspt : null,
                        coef_defspt: character.coef_defspt !== 'NA' ? character.coef_defspt : null,
                        coef_hpspt: character.coef_hpspt !== 'NA' ? character.coef_hpspt : null,

                        tag1: character.tag1 !== 'NA' ? character.tag1 : null,
                        tag2: character.tag2 !== 'NA' ? character.tag2 : null,
                      },
                      releaseDate: character.release_date !== 'NA' ? character.release_date : null,
                      weaponType: character.weapon_type !== 'NA' ? character.weapon_type : null,
                      ascension: character.ascension !== 'NA' ? character.ascension : null,
                      id: character.id !== 'NA' ? character.id : null,
                      // Add other properties as needed
                    };
                  });
                  console.log(this.characters, 'Characters');
                  this.characters.pop()
                  this.currentlengh = this.characters.length;
                  resolve(); // 数据处理完成，解决Promise

                }
              });
            })
            .catch(error => {
              console.error('Error loading the CSV file:', error);
              reject(error); // 处理错误
            });
      });
    },
}

}
</script>

<style scoped>
.box-card {
  width: 100%;
  margin: 20px 0;
}
.el-container, .el-row {
  width: 100%;
}

.radar {
  z-index: 1000;
}

.Style_Vice_DamageDealer {
  color: rgb(201, 159, 21);
  font-weight: bold;
}
.Style_Damage_Dealer {
  color: rgb(189, 14, 14);
  font-weight: bold;
}
.Style_Healer {
  color: rgb(12, 172, 71);
  font-weight: bold;
}
.Style_Support {
  color: rgb(24, 24, 161);
  font-weight: bold;
}

</style>
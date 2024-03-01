<template>
  <el-container>
    <el-row :gutter="40" >
      <el-col :span="6" v-for="(roleId, index) in selectedRoles" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Role Type</span>
          </div>
          <div style="text-align: center;">
            <img :src="getAvatarSrc(Number(roleId)-1)" alt="角色头像" style="height: 200px; width: auto;">
          </div>
          <el-button type="primary" @click="openDialog(index)" style="margin-top: 5px">详情</el-button>
        </el-card>
      </el-col>
    <!-- </el-row>
      
    <el-row> -->
      <el-col :span="20"><div class="grid-content bg-purple-dark">
        <div ref="tmradar" id="tmradar" style="height:800px;width:100%;"></div>
        <!-- <div ref="chart" style="width:50%;height:376px"></div> -->
      </div></el-col> 
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
                <el-button type="primary" @click="addToTeam(Number(character.id)+1), updateTeamRadarChart()">Add to team</el-button>
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


  mounted() {

    this.loadCSVData().then(() => {
      // 确保此时数据已加载
      // this.sortedAndFilteredCharacters();
      // this.initTeamRadarChart(114);
      this.TeamRadarChart = echarts.init(this.$refs.tmradar) //thisnashi
      this.TeamRadarChart.setOption(this.optionradarall);
      this.$nextTick(() => {
        // for (let index = 0; index < this.characters.length; index++) {
        //   // 注意：这里假设你有一个 characters 数组已经被填充
        //   this.initRadarChart('radar-' + index,index );
        // }
        console.log('在动吗')
        // this.CalculateRadarValues();


      });
    });
    // this.CalculateRadarValues();
    // this.updateTeamRadarChart();
    console.log(this.characters, 'characters');
  },
  name: "team",

  computed: {
    // 从 Vuex 获取 selectedRoles 数组
    selectedRoles() {
      return this.$store.state.selectedRoles;
    },


  },

  data() {
    return {
      dialogVisible: false,
      currentRoleIndex: null,
      characters: [],
      TeamRadarChart: null,
      radarValues: [0, 0, 0, 20, 20],
      optionradarall : {
          color: ['#67F9D8', '#f65353', '#56A3F1', '#FF917C'],
          
          title: {

          },
          tooltip: {
            show: true
          },
          legend: {

          },
          TeamRadar: [
            {
              // 第一个雷达图的配置
              indicator: [
                {name: 'ATK SCORE', max: 500},
                {name: 'DEF SCORE', max: 1000},
                {name: 'HP SCORE', max: 20000},
                {name: 'PERIOD', max: 30},
                {name: 'COST', max: 20},
              ],
              center: ['50%', '50%'], // 根据需要调整位置
              radius: 120,
              splitNumber: 4,
              shape: 'circle',
              startAngle: 90,
              axisName: {
                formatter: '【{value}】',
                color: '#000000'
              },
              splitArea: {
                areaStyle: {
                  color: ['#8ee5db', '#5ddbd8', '#7ab1e7', '#aec7ea'],
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 10
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(211, 253, 250, 0.8)'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(211, 253, 250, 0.8)'
                }
              }
            }
          ],
              series: [
            {
              name: 'rate',
              type: 'radar',
              emphasis: {
                lineStyle: {
                  width: 4
                }
              },
              data: [
                {
                  value: this.radarValues,

                  areaStyle: {
                    color: 'rgba(255, 228, 52, 0.6)' // 根据需要调整颜色
                  }
                },
                // 根据需要添加或修改其他数据系列
              ]
            }
          ]
      }
    }
  },
  methods: {

    teamATKscore() {
      console.log("atk:")
      let score=0;
      let atkcoef=1;
      // console.log(this.selectedRoles,"var:")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          // console.log(Number(this.selectedRoles[index]),"for: mae")
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag2) + Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag1);
          console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag1),"for: ato1")
      }
      console.log(score,"score_raw")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_atkspt) > atkcoef){
            atkcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_atkspt)
          }
          console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.coef_atkspt),"各人倍率")
          console.log(atkcoef,"此时倍率")
          // score=this.selectedRoles[index].stats.coef_atkspt * score;
      }
      score*=atkcoef;
      console.log(score,"score_yaita")
      console.log(this.radarValues,"radar0")
      this.radarValues[0]=score;
      console.log(this.radarValues,"radar")
    },

    teamDEFscore() {
      console.log("def:")
      let score=0;
      let defcoef=1;
      // console.log(this.selectedRoles,"var:")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          // console.log(Number(this.selectedRoles[index]),"for: mae")
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.def_90_90_ac);
          // console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.def_90_90_ac),"for: ato1")
      }
      console.log(score,"score_raw")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_defspt) > defcoef){
            defcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_defspt)
          }
          console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.coef_defspt),"各人倍率")
          console.log(defcoef,"此时倍率")
          // score=this.selectedRoles[index].stats.coef_atkspt * score;
      }
      score*=defcoef;
      console.log(score,"score_yaita")
      console.log(this.radarValues,"radar1")
      this.radarValues[1]=score;
      console.log(this.radarValues,"radar")
    },

    teamHPscore() {
      console.log("hp:")
      let score=0;
      let hlrcoef=1;
      // console.log(this.selectedRoles,"var:")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          // console.log(Number(this.selectedRoles[index]),"for: mae")
          score += Number(this.characters[Number(this.selectedRoles[index])].stats.score_hlr_tag2) + Number(this.characters[Number(this.selectedRoles[index])].stats.score_hlr_tag1);
          // console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.score_atk_tag1),"for: ato1")
      }
      console.log(score,"score_raw")
      for (let index = 0; index < this.selectedRoles.length; index++) {
          if (Number(this.characters[Number(this.selectedRoles[index])].stats.coef_hpspt) > hlrcoef){
            hlrcoef = Number(this.characters[Number(this.selectedRoles[index])].stats.coef_hpspt)
          }
          console.log(Number(this.characters[Number(this.selectedRoles[index])].stats.coef_hpspt),"各人倍率")
          console.log(hlrcoef,"此时倍率")
          // score=this.selectedRoles[index].stats.coef_hpspt * score;
      }
      score*=hlrcoef;
      console.log(score,"score_yaita")
      console.log(this.radarValues,"radar2")
      this.radarValues[2]=score;
      console.log(this.radarValues,"radar")
    },

    CalculateRadarValues() {
      console.log("CRV: 计算雷达图值")
      this.teamATKscore();
      this.teamDEFscore();
      this.teamHPscore();
      console.log("CRV: 计算完")
    },

    updateTeamRadarChart() {
      const tmrd = this.$refs.tmradar;
      if (tmrd) {

        console.log("is updating");
        this.CalculateRadarValues();
        
        console.log("UTR: 计算雷达图值")
        this.radarValues[3] = 20;
        this.radarValues[4] = 20;
        console.log("radarvalues")
        console.log(this.radarValues,"radarvalues")

        console.log(this.selectedRoles,"selectedroles")

        // console.log("kokomade");
        this.TeamRadarChart = echarts.init(tmrd) //thisnashi
        this.TeamRadarChart.setOption(this.optionradarall);
        console.log("已经执行了");


      }
      
      
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
      console.log("add to team triggered")
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

    // initTeamRadarChart(id) {
    //   this.CalculateRadarValues();
    //   console.log(id,"is the id");
    //   this.TeamRadarChart = echarts.init(document.getElementById(id));
    //   this.TeamRadarChart.setOption(optionradarall);
    //   console.log("已经执行了");
    // },



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
                         * TEAM atk score = sum(selectedRoles.score_atk_tag1 + selectedRoles.score_atk_tag2) * coef_atkspt;
                         * TEAM def score = sum(selectedRoles.def) * coef_defspt;
                         * TEAM hp score  = sum(selectedRoles.score_hlr_tag1 + selectedRoles.score_hlr_tag2) *  coef_hpspt;
                         */
                        score_atk_tag1: character.score_atk_tag1 !== 'NA' ? character.score_atk_tag1 : null,
                        score_atk_tag2: character.score_atk_tag2 !== 'NA' ? character.score_atk_tag2 : null,
                        score_hlr_tag1: character.score_hlr_tag1 !== 'NA' ? character.score_hlr_tag1 : null,
                        score_hlr_tag2: character.score_hlr_tag1 !== 'NA' ? character.score_hlr_tag2 : null,
                        coef_atkspt: character.coef_atkspt !== 'NA' ? character.coef_atkspt : null,
                        coef_defspt: character.coef_defspt !== 'NA' ? character.coef_defspt : null,
                        coef_hpspt: character.coef_hpspt !== 'NA' ? character.coef_hpspt : null,
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


</style>
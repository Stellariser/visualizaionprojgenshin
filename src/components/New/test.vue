<template>
  <el-container>

    <el-row :span="20">

      <!-- 条状图列 -->
      <el-col :span="20"><div class="grid-content bg-purple-dark">
        <div ref="radar" class="radar" id="radar" style="height:800px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart2" id="bar2" style="height:400px;width:100%;"></div>
      </div></el-col>

    </el-row>




  </el-container>
</template>

<script>
import Papa from 'papaparse';
import * as echarts from "echarts";
export default {
  mounted() {
    this.loadCSVData();
    this.radarChart = echarts.init(this.$refs.radar)
    this.radarChart.setOption(this.optionradarall);
    let mychart2 = echarts.init(this.$refs.myChart2)
    mychart2.setOption(optionstats)
    let xDatastats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatastats = [2, 5, 11, 1, 10, 8, 1, 2, 2, 0]
    let optionstats = {
      title: {
        text: 'Stats'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatastats
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatastats,
        itemStyle: {
          color: '#c23531' // 将颜色设置为蓝色
        }
      }]
    };
  },
  name: 'CardLayout',
  data() {
    return {
      radarChart: null,
      characters: [],
      avatarList: {
        // 示例头像列表
        'user1': { url:require('/public/avatars/ganyu.jpg') },
      },

      optionradarall : {
        title: {
          text: 'Group capacity'
        },
        tooltip: {},
        legend: {
          data: ['individual','average']
        },
        splitArea: {
          areaStyle: {
            color: [
              '#c23531', '#2f4554', '#ca8622',
              '#bda29a'] // 为每个区域定义颜色
          }
        },
        radar: {
          // 雷达图的指标，12个维度
          indicator: [

            {name: 'Stats', max: 50},
            {name: 'math', max: 50},
            {name: 'art', max: 50},
            {name: 'ui', max: 50},
            {name: 'code', max: 50},
            {name: 'graph', max: 50},
            {name: 'git', max: 50},
            {name: 'VIZ', max: 50},
            {name: 'hci', max: 50},
            {name: 'eval', max: 50},
            {name: 'comm', max: 50},
            {name: 'collab', max: 50},

          ]
        },
        series: [{
          name: 'rate',
          type: 'radar',
          data: [
            {
              value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              name: 'individual'
            }
            // 可以添加更多组的数据
          ]
        },
          {
            name: 'average',
            type: 'radar',
            data: [
              {
                value: [22.38, 25.59, 26.42, 35.238, 27.85,19.25, 30, 20.47, 23.925, 21.75, 36, 36.4],
                name: 'average',
                // ... 可以添加更多样式设置
              }
            ]
          }


        ]
      },
    };
  },
  methods: {
    loadCSVData() {
      fetch('./data/genshin.csv')
          .then(response => response.text())
          .then(csvData => {
            Papa.parse(csvData, {
              header: true,
              complete: (results) => {
                this.characters = results.data.map(character => {
                  return {
                    name: character.character_name,
                    playable: character.playable,
                    rarity: character.rarity,
                    vision: character.vision,
                    region: character.region,
                    model: character.model,
                    constellation: character.constellation,
                    birthday: character.birthday,
                    specialDish: character.special_dish,
                    voice: {
                      eng: character.voice_eng,
                      cn: character.voice_cn,
                      jp: character.voice_jp,
                      kr: character.voice_kr,
                    },
                    stats: {
                      hp_90_90: character.hp_90_90,
                      atk_90_90: character.atk_90_90,
                      def_90_90: character.def_90_90,
                      hp_80_90: character.hp_80_90,
                      atk_80_90:character.atk_80_90,
                      def_80_90:character.def_80_90,
                      hp_80_80:character.hp_80_80,
                      atk_80_80:character.atk_80_80,
                      def_80_80:character.def_80_80,
                      hp_70_80:character.hp_70_80,
                      atk_70_80:character.atk_70_80,
                      def_70_80:character.def_70_80,
                      hp_70_70:character.hp_70_70,
                      atk_70_70:character.atk_70_70,
                      def_70_70:character.def_70_70,
                      hp_60_70:character.hp_60_70,
                      atk_60_70:character.atk_60_70,
                      def_60_70:character.def_60_70,
                      hp_60_60:character.hp_60_60,
                      atk_60_60:character.atk_60_60,
                      def_60_60:character.def_60_60,
                      hp_50_60:character.hp_50_60,
                      atk_50_60:character.atk_50_60,
                      def_50_60:character.def_50_60,
                      hp_50_50:character.hp_50_50,
                      atk_50_50:character.atk_50_50,
                      def_50_50:character.def_50_50,
                      hp_40_50:character.hp_40_50,
                      atk_40_50:character.atk_40_50,
                      def_40_50:character.def_40_50,
                      hp_40_40:character.hp_40_40,
                      atk_40_40:character.atk_40_40,
                      def_40_40:character.def_40_40,
                      hp_20_40:character.hp_20_40,
                      atk_20_40:character.atk_20_40,
                      def_20_40:character.def_20_40,
                      hp_20_20:character.hp_20_20,
                      atk_20_20:character.atk_20_20,
                      def_20_20:character.def_20_20,
                      hp_1_20:character.hp_1_20,
                      atk_1_20:character.atk_1_20,
                      def_1_20:character.def_1_20,
                    },
                    releaseDate: character.release_date,
                    weaponType: character.weapon_type,
                    ascension: character.ascension,
                    // Add other properties as needed
                  };
                });
                console.log(this.characters, 'Characters');
              }
            });
          })
          .catch(error => console.error('Error loading the CSV file:', error));
    },
  },







}
</script>

<style scoped>

</style>
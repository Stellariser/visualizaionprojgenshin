<template>
  <el-container>
    <el-dialog
        title="Character Details"
        v-model:visible="centerDialogVisible"
        :visible.sync="centerDialogVisible"
        width="80%"
        @opened="initChartLine"
        center>
      <el-row>

        <el-col :span="6">
          <!-- 头像位置 -->
          <div style="text-align:center;">
            <vs-avatar square class="vsavatar" badge writing badge-color="success">
              <img :src="avatarSrc" class="avatar" alt="avatar">
            </vs-avatar>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart2" style="height:200px;width:100%;"></div>
        </div>
          </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart3" style="height:200px;width:100%;"></div>
        </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart4" style="height:200px;width:100%;"></div>
        </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
    <div class="card-container" ref="scrollContainer">
      <el-row :gutter="40">
        <!-- 循环生成30个卡片 -->
        <el-col :span="12" v-for="(character, index) in this.rendercharacter" :key="character.id">
          <el-card class="card">
            <el-row :span="20">
              <!-- 头像列 -->
              <el-col :span="8">
<!--                <img :src="require('@/assets/avatar/ganyu.jpg')" class="avatar" alt="avatar">-->
                <vs-avatar square class="vsavatar" badge writing badge-color="success">
                  <img :src="getAvatarSrc(character.id)" class="avatar" alt="avatar">
                </vs-avatar>
              </el-col>
              <!-- 条状图列 -->
              <el-col :span="16"><div class="grid-content bg-purple-dark">
                <div ref="radar" :id="'radar-' + index" style="height:300px;width:100%;"></div>
              </div></el-col>


            </el-row>
            <el-row :span="4">
              <el-col :span="4" class="bot">
                <vs-button
                    gradient
                    :active="active == 1"
                    @click="handleButtonClick(character.id)"
                >
                  Detail
                </vs-button>
              </el-col>

            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-container>

</template>

<script>
import Papa from 'papaparse';
import * as echarts from "echarts";
export default {
  mounted() {

    // this.$nextTick(() => {
    //
    //   for (let index = 1; index <= this.currentlengh; index++) {
    //     this.initRadarChart('radar-' + index, index);
    //   }
    //
    // });


    this.loadCSVData().then(() => {
      // 确保此时数据已加载
      this.sortedAndFilteredCharacters();
      this.$nextTick(() => {
        for (let index = 0; index < this.characters.length; index++) {
          // 注意：这里假设你有一个 characters 数组已经被填充
          this.initRadarChart('radar-' + index,index );
        }

      });
    });

    this.radarChart = echarts.init(this.$refs.radar)
    this.radarChart.setOption(this.optionradarall);

  },
  name: 'CardLayout',
  data() {
    return {
      currentlengh: 0,

      dialogid: 0,
      ATKdata: [],
      optionlineatk : {
        title: {
          text: 'ATK'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#fc005c'
            }
          }
        },
        legend: {
          data: ['ATK']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1-20', '20-20', '20-40', '40-40','40-50','50-50','50-60','60-60','60-70','70-70', '70-80','80-80','80-90','90-90']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Attack',
            type: 'line',
            stack: 'value',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true, // 这会让线条变得光滑
            areaStyle: {
              normal: {
                color: '#f15b5b' // 默认填充颜色
              }

            },
            emphasis: {
              focus: 'series'

            },
            lineStyle: {
              width: 3,
              shadowColor: '#fc0000',
              shadowBlur: 10,
              shadowOffsetY: 8
            }
          }
        ]
      },
      optionlinedef : {
        title: {
          text: 'DEF'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#50cdf1'
            }
          }
        },
        legend: {
          data: ['DEF']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1-20', '20-20', '20-40', '40-40','40-50','50-50','50-60','60-60','60-70','70-70', '70-80','80-80','80-90','90-90']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'DEF',
            type: 'line',
            stack: 'value',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true, // 这会让线条变得光滑
            areaStyle: {
              normal: {
                color: '#58d7f5' // 默认填充颜色
              }

            },
            emphasis: {
              focus: 'series'

            },
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 10,
              shadowOffsetY: 8
            }
          }
        ]
      },
      optionlinehp : {
        title: {
          text: 'HP'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#82ee69'
            }
          }
        },
        legend: {
          data: ['HP']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1-20', '20-20', '20-40', '40-40','40-50','50-50','50-60','60-60','60-70','70-70', '70-80','80-80','80-90','90-90']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'HP',
            type: 'line',
            stack: 'value',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true, // 这会让线条变得光滑
            areaStyle: {
              normal: {
                color: '#75f353' // 默认填充颜色
              }

            },
            emphasis: {
              focus: 'series'

            },
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 10,
              shadowOffsetY: 8
            }
          }
        ]
      },

      chartInstance: null,
      chartData: [],
      radarCharttest: null,

      avatarSrc : require('@/assets/avatar/albedo.png') ,
      centerDialogVisible: false,
      radarChart: null,
      detailavatat:'',

      characters: [],         // 角色列表

      rendercharacter: [],   // 渲染角色列表

      avatarList: {
        // 示例头像列表
        'user1': { url:require('/public/avatars/ganyu.jpg') },
      },

      optionradarall : {
        color: ['#67F9D8', '#f65353', '#56A3F1', '#FF917C'],
        title: {

        },
        tooltip: {
          // 启用提示框
          show: true,
          // 定制提示框内容
          // formatter: function (params) {
          //   let result = params.name + '<br/>';
          //   params.value.forEach((value, i) => {
          //     // 这里假设所有雷达图的指标都是统一的，根据实际情况调整
          //     result += option.radar[0].indicator[i].name + ' : ' + value + '<br/>';
          //   });
          //   return result;
          // }
        },
        legend: {

        },
        radar: [
          {
            // 第一个雷达图的配置
            indicator: [
              {name: 'ATK', max: 500},
              {name: 'DEF', max: 1000},
              {name: 'HP', max: 20000},
              {name: 'Elemental Mastery', max: 50},
              {name: 'Healing Bonus', max: 50},
              {name: 'Energy Recharge', max: 50},
              {name: 'Shield', max: 50},
              {name: 'Ancillary', max: 50},
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
                value: [22.38, 25.59, 26.42, 35.238, 27.85, 19.25, 30, 20.47],

                areaStyle: {
                  color: 'rgba(255, 228, 52, 0.6)' // 根据需要调整颜色
                }
              },
              // 根据需要添加或修改其他数据系列
            ]
          }
        ]
      }
    };
  },
  methods: {
    getAvatarSrc(id) {
      console.log(id,"现在是啥id");
      try {
        // 动态导入图片，注意路径要正确匹配你的文件结构
        const numericId = Number(id)+1;

        console.log(`@/assets/genshinava/${numericId}.png`);
        return require(`@/assets/genshinava/${numericId}.png`);
      } catch (e) {
        console.error(e);
        // 可以返回一个默认图片路径
        return require('@/assets/avatar/albedo.png');
      }
    },

    sortedAndFilteredCharacters() {
      // 复制原始数组以避免直接修改
      let result = this.characters.slice();
      // 应用筛选逻辑
      // 例如，只显示某个条件满足的项
      // result = result.filter(character => {
      //   // 返回true或false来决定是否保留这个character
      //   return character.meetsSomeCriteria;
      // });
      //
      // // 应用排序逻辑
      // // 例如，根据某个属性进行排序
      // result.sort((a, b) => {
      //   // 返回-1, 0, 或1来决定排序
      //   return a.someAttribute - b.someAttribute;
      // });

      this.rendercharacter = result;
      console.log(this.rendercharacter, 'rendercharacter');
    },
    initChartLine() {
      this.$nextTick(() => {
        if (this.$refs.myChart2) {
          let mychart2 = echarts.init(this.$refs.myChart2)
          let mychart3 = echarts.init(this.$refs.myChart3)
          let mychart4 = echarts.init(this.$refs.myChart4)

          let statsListatk = [];
          let statsListdef = [];
          let statsListhp = [];
          const properties = ['atk_1_20',
            'atk_20_20',
            'atk_20_40',
            'atk_40_40',
            'atk_40_50',
            'atk_50_50',
            'atk_50_60',
            'atk_60_60',
            'atk_60_70',
            'atk_70_70',
            'atk_70_80',
            'atk_80_80',
            'atk_80_90',
            'atk_90_90',
            ];
          console.log(this.dialogid,"zhunbeikaishicha");
          const characterStats = this.characters[Number(this.dialogid)].stats;
          console.log(characterStats,"chahaole");

          for (let prop in characterStats){
            if (prop.startsWith('atk_')) {
              statsListatk.push(characterStats[prop]);
            }
            if (prop.startsWith('def_')) {
              statsListdef.push(characterStats[prop]);
            }
            if (prop.startsWith('hp_')) {
              statsListhp.push(characterStats[prop]);
            }
          }
          console.log(statsListdef,"statsListdef");

          this.optionlineatk.series[0].data = statsListatk.reverse()
          this.optionlinedef.series[0].data = statsListdef.reverse()
          this.optionlinehp.series[0].data = statsListhp.reverse()
          mychart2.setOption(this.optionlineatk)
          mychart3.setOption(this.optionlinedef)
          mychart4.setOption(this.optionlinehp)
        }
      });
    },

    updateAvatarSrc(newSrc) {
      // 更新图片链接
      this.avatarSrc = newSrc;
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
    initRadarChart(id,index) {
      console.log(id,"id!!!!!");
      this.radarChart = echarts.init(document.getElementById(id));
      console.log(index,"index!!!!!");
      console.log(this.characters,"name!!!!!");
      console.log(this.characters[index ],"name!!!!!");
      let radarValues = [
        this.characters[index].stats.atk_90_90, // 假设这是ATK的值
        this.characters[index].stats.def_90_90, // 假设这是DEF的值
        this.characters[index].stats.hp_90_90, // 假设这是HP的值
        // this.character.stats.elemental_mastery, // 假设这是Elemental Mastery的值
        // this.character.stats.healing_bonus, // 假设这是Healing Bonus的值
        // this.character.stats.energy_recharge, // 假设这是Energy Recharge的值
        // this.character.stats.shield_strength, // 假设这是Shield Strength的值
        // this.character.stats.ancillary_stats, // 假设这是Ancillary Stats的值
        // 确保顺序与radar.indicator中定义的指标相匹配
        35.238, 27.85, 19.25, 30, 20.47
      ];
      let optionradarnow = {
        color: ['#67F9D8', '#f65353', '#56A3F1', '#FF917C'],
            title: {

        },
        tooltip: {
          // 启用提示框
          show: true,
          // 定制提示框内容
          // formatter: function (params) {
          //   let result = params.name + '<br/>';
          //   params.value.forEach((value, i) => {
          //     // 这里假设所有雷达图的指标都是统一的，根据实际情况调整
          //     result += option.radar[0].indicator[i].name + ' : ' + value + '<br/>';
          //   });
          //   return result;
          // }
        },
        legend: {

        },
        radar: [
          {
            // 第一个雷达图的配置
            indicator: [
              {name: 'ATK', max: 500},
              {name: 'DEF', max: 1000},
              {name: 'HP', max: 20000},
              {name: 'Elemental Mastery', max: 50},
              {name: 'Healing Bonus', max: 50},
              {name: 'Energy Recharge', max: 50},
              {name: 'Shield', max: 50},
              {name: 'Ancillary', max: 50},
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
                value: radarValues,

                areaStyle: {
                  color: 'rgba(255, 228, 52, 0.6)' // 根据需要调整颜色
                }
              },
              // 根据需要添加或修改其他数据系列
            ]
          }
        ]
      }
      this.radarChart.setOption(optionradarnow);
    },


    loadCSVData() {
      return new Promise((resolve, reject) => {
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
                      id: character.id,
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

  //   loadCSVData() {
  //     return new Promise((resolve, reject) => {
  //     fetch('./data/genshin.csv')
  //         .then(response => response.text())
  //         .then(csvData => {
  //           Papa.parse(csvData, {
  //             header: true,
  //             complete: (results) => {
  //               this.characters = results.data.map(character => {
  //                 return {
  //                   name: character.character_name,
  //                   playable: character.playable,
  //                   rarity: character.rarity,
  //                   vision: character.vision,
  //                   region: character.region,
  //                   model: character.model,
  //                   constellation: character.constellation,
  //                   birthday: character.birthday,
  //                   specialDish: character.special_dish,
  //                   voice: {
  //                     eng: character.voice_eng,
  //                     cn: character.voice_cn,
  //                     jp: character.voice_jp,
  //                     kr: character.voice_kr,
  //                   },
  //                   stats: {
  //                     hp_90_90: character.hp_90_90,
  //                     atk_90_90: character.atk_90_90,
  //                     def_90_90: character.def_90_90,
  //                     hp_80_90: character.hp_80_90,
  //                     atk_80_90:character.atk_80_90,
  //                     def_80_90:character.def_80_90,
  //                     hp_80_80:character.hp_80_80,
  //                     atk_80_80:character.atk_80_80,
  //                     def_80_80:character.def_80_80,
  //                     hp_70_80:character.hp_70_80,
  //                     atk_70_80:character.atk_70_80,
  //                     def_70_80:character.def_70_80,
  //                     hp_70_70:character.hp_70_70,
  //                     atk_70_70:character.atk_70_70,
  //                     def_70_70:character.def_70_70,
  //                     hp_60_70:character.hp_60_70,
  //                     atk_60_70:character.atk_60_70,
  //                     def_60_70:character.def_60_70,
  //                     hp_60_60:character.hp_60_60,
  //                     atk_60_60:character.atk_60_60,
  //                     def_60_60:character.def_60_60,
  //                     hp_50_60:character.hp_50_60,
  //                     atk_50_60:character.atk_50_60,
  //                     def_50_60:character.def_50_60,
  //                     hp_50_50:character.hp_50_50,
  //                     atk_50_50:character.atk_50_50,
  //                     def_50_50:character.def_50_50,
  //                     hp_40_50:character.hp_40_50,
  //                     atk_40_50:character.atk_40_50,
  //                     def_40_50:character.def_40_50,
  //                     hp_40_40:character.hp_40_40,
  //                     atk_40_40:character.atk_40_40,
  //                     def_40_40:character.def_40_40,
  //                     hp_20_40:character.hp_20_40,
  //                     atk_20_40:character.atk_20_40,
  //                     def_20_40:character.def_20_40,
  //                     hp_20_20:character.hp_20_20,
  //                     atk_20_20:character.atk_20_20,
  //                     def_20_20:character.def_20_20,
  //                     hp_1_20:character.hp_1_20,
  //                     atk_1_20:character.atk_1_20,
  //                     def_1_20:character.def_1_20,
  //                   },
  //                   releaseDate: character.release_date,
  //                   weaponType: character.weapon_type,
  //                   ascension: character.ascension,
  //                   // Add other properties as needed
  //                 };
  //               });
  //               console.log(this.characters, 'Characters');
  //             }
  //           });
  //         })
  //         .catch(error => console.error('Error loading the CSV file:', error)
  //
  //         );
  //     });
  // },







},
  computed: {


  }
}
</script>

<style scoped>
.card-container {
  margin: 20px;
  height: 80vh;
  overflow-y: auto;
}

.avatar {
  width: 100%; /* 使头像填充整个列宽 */
   /* 使图片呈圆形 */
}

.bar-chart-container {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.bar-chart {
  height: 20px;
  background-color: #409EFF; /* Element UI 主题蓝色 */
  border-radius: 5px;
}

.card {
  margin-bottom: 20px;
  transition: transform 0.3s ease;

}
.card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大5% */
}

.vsavatar {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.vsavatar:hover {
  transform: scale(1.04);
}

.radar {
  z-index: 1000;
}

.bot {
  margin-left: 100px;
}
</style>
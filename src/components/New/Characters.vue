<template>
  <el-container>
   <el-header>
    <el-select v-model="selectedSort" placeholder="请选择排序方式" @change="sortCharacters">
      <el-option label="ordered by ID" value=""></el-option>
      <el-option label="ordered by ATK" value="atk_90_90_ac"></el-option>
      <el-option label="ordered by DEF" value="def_90_90_ac"></el-option>
      <el-option label="ordered by HP" value="hp_90_90_ac"></el-option>

    </el-select>
  </el-header>
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
          <div style="text-align:center;">
            <vs-avatar square class="vsavatar2" badge writing badge-color="success">
              <img :src="armSrc" class="avatar" alt="avatar">
            </vs-avatar>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart2" style="height:200px;width:100%;"></div>
        </div>
          <el-col :span="12"><div class="grid-content bg-purple-dark">
            <div ref="myChart5" style="height:300px;width:240%;"></div>
          </div>
          </el-col>
          </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart3" style="height:200px;width:100%;"></div>
        </div>
<!--          <div style="text-align:center;">-->
<!--            <vs-avatar square class="vsavatar2" badge writing badge-color="success">-->
<!--              <img :src="armSrc" class="avatar" alt="avatar">-->
<!--            </vs-avatar>-->
<!--          </div>-->
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-dark">
          <div ref="myChart4" style="height:200px;width:100%;"></div>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
        </el-col>

<!--        <el-col :span="6"><div class="grid-content bg-purple-dark">-->
<!--          <div ref="myChart3" style="height:200px;width:100%;"></div>-->
<!--        </div>-->
<!--        </el-col>-->
<!--        <el-col :span="6"><div class="grid-content bg-purple-dark">-->
<!--          <div ref="myChart4" style="height:200px;width:100%;"></div>-->
<!--        </div>-->
<!--        </el-col>-->
      </el-row>

      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
    <div class="card-container" ref="scrollContainer">
      <el-row :gutter="40">
        <!-- 循环生成30个卡片 -->
        <el-col :span="12" v-for="(character, index) in this.rendercharacter.slice(0,this.rendercharacter.length-1)" :key="character.id" v-if="index !== 0">
          
          <!-- itemfilter -->
          <el-card class="card" style="height: 470px;">
            <el-row :span="16">
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
              <el-col :span="4" class="bot">
                <vs-button gradient :active="active == 1" @click="handleButtonClick2(character.id)">
                  Add to Team
                </vs-button>
              </el-col>
              <el-col :span="4">
                <el-tag type="success">{{ character.tag1 }}</el-tag>
              </el-col>
              <p v-if="character.tag2.length > 0">
                <el-col :span="4">
                  <el-tag type="info">{{ character.tag2 }}</el-tag>
                </el-col>
              </p>

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
        for (let index = 1; index < this.characters.length; index++) {
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

      optionpieper : {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Special0' },
              { value: 735, name: 'Special1' },
              { value: 580, name: 'Special2' },
              { value: 484, name: 'Special3' },
              { value: 300, name: 'Special4' },
              { value: 484, name: 'Special5' },
              { value: 300, name: 'Special6' }
            ]
          }
        ]
      },

      chartInstance: null,
      chartData: [],
      radarCharttest: null,

      avatarSrc : require('@/assets/avatar/albedo.png') ,
      armSrc : require('@/assets/arm/1.png') ,
      centerDialogVisible: false,
      radarChart: null,
      detailavatat:'',

      characters: [],         // 角色列表
      //selectedSort: null,     //
      selectedSort: (() => {
        const savedSort = localStorage.getItem('selectedSort');
        return savedSort ? savedSort : ''; // 如果 localStorage 中有值则使用，否则使用默认值
      })(),

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
        // radar: [
        //   {
        //     // 第一个雷达图的配置
        //     indicator: [
        //       {name: 'ATK', max: 500},
        //       {name: 'DEF', max: 1000},
        //       {name: 'HP', max: 20000},
        //       {name: 'Energy Recharge', max: 1.5},
        //       {name: 'Elemental Mastery', max: 100},
        //       {name: 'Healing Bonus', max: 0.3},
        //       {name: 'Shield', max: 50},
        //       {name: 'Ancillary', max: 50},
        //     ],
        //     center: ['50%', '50%'], // 根据需要调整位置
        //     radius: 120,
        //     splitNumber: 4,
        //     shape: 'circle',
        //     startAngle: 90,
        //     axisName: {
        //       formatter: '【{value}】',
        //       color: '#000000'
        //     },
        //     splitArea: {
        //       areaStyle: {
        //         color: ['#8ee5db', '#5ddbd8', '#7ab1e7', '#aec7ea'],
        //         shadowColor: 'rgba(0, 0, 0, 0.2)',
        //         shadowBlur: 10
        //       }
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: 'rgba(211, 253, 250, 0.8)'
        //       }
        //     },
        //     splitLine: {
        //       lineStyle: {
        //         color: 'rgba(211, 253, 250, 0.8)'
        //       }
        //     }
        //   }
        // ],
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
  computed: {
    itemfilter(){
      // <el-col :span="12" v-for="(character, index) in this.rendercharacter" :key="character.id">
      return this.rendercharacter.filter((character, index) => index < this.rendercharacter.length - 1);
    }
  },
  methods: {
    handleButtonClick2(roleId) {
      // 检查角色是否已经在队伍中
      roleId=Number(roleId)+1;
      if (this.$store.state.selectedRoles.includes(roleId)) {
        this.$notify.error({
          title: 'Ouch...',
          message: 'Characters are already in the queue'
        });
      } else if (!this.$store.state.selectedRoles.includes(0)) {
        // 检查队伍是否已满（没有空位）
        this.$notify.error({
          title: 'Ouch...',
          message: 'The queue is full.'
        });
      } else {
        // 调用 Vuex 的 mutation 来更新角色 ID
        this.$store.commit('ADD_ROLE', roleId);
      }
    },


    getAvatarSrc(id) {

    if (id && !isNaN(id)) {
  // 在这里调用 getAvatarSrc

      try {
        console.log(id,"现在是啥id");
        // 动态导入图片，注意路径要正确匹配你的文件结构
        const numericId = Number(id) + 1;

        console.log(`@/assets/genshinava/${numericId}.png`);
        return require(`@/assets/genshinava/${numericId}.png`);
      } catch (e) {
        console.error(e);
        // 可以返回一个默认图片路径
        return require('@/assets/avatar/albedo.png');
      }

    } else {
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
      if (this.selectedSort === 'atk_90_90_ac')
      {
      result.sort((a, b) => {
      // 返回-1, 0, 或1来决定排序
              // 如果a的id为空，则将a视为大于b
        if (!a.id) return 1; // 将a移动到数组末尾
        // 如果b的id为空，则将b视为大于a
        if (!b.id) return -1; // 将b移动到数组末尾
        if (!a.stats.atk_90_90_ac) return 1;
        if (!b.stats.atk_90_90_ac) return -1;

         return (a.stats.atk_90_90_ac - b.stats.atk_90_90_ac);
       });
      }
      else if (this.selectedSort === 'def_90_90_ac')
      {
      result.sort((a, b) => {
      // 返回-1, 0, 或1来决定排序
              // 如果a的id为空，则将a视为大于b
        if (!a.id) return 1; // 将a移动到数组末尾
        // 如果b的id为空，则将b视为大于a
        if (!b.id) return -1; // 将b移动到数组末尾
        if (!a.stats.def_90_90_ac) return 1;
        if (!b.stats.def_90_90_ac) return -1;

         return a.stats.def_90_90_ac - b.stats.def_90_90_ac;
       });
      }
      else if (this.selectedSort === 'hp_90_90_ac')
      {
      result.sort((a, b) => {
      // 返回-1, 0, 或1来决定排序
              // 如果a的id为空，则将a视为大于b
        if (!a.id) return 1; // 将a移动到数组末尾
        // 如果b的id为空，则将b视为大于a
        if (!b.id) return -1; // 将b移动到数组末尾
        if (!a.stats.hp_90_90_ac) return 1;
        if (!b.stats.hp_90_90_ac) return -1;

         return a.stats.hp_90_90_ac - b.stats.hp_90_90_ac;
       });
      }

      this.rendercharacter = result;
      console.log(this.rendercharacter, 'rendercharacter');
    },
    initChartLine() {
      this.$nextTick(() => {
        if (this.$refs.myChart2) {
          let mychart2 = echarts.init(this.$refs.myChart2)
          let mychart3 = echarts.init(this.$refs.myChart3)
          let mychart4 = echarts.init(this.$refs.myChart4)
          let mychart5 = echarts.init(this.$refs.myChart5)

          let statsListatk = [];
          let statsListdef = [];
          let statsListhp = [];
          let statsListsp = [];
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
            if (prop.startsWith('sp')) {
              statsListsp.push({value: characterStats[prop], name: prop});
            }
            if (prop.startsWith('arm')) {
              this.armSrc = require(`@/assets/arm/${Number(characterStats[prop])}.png`);

            }
          }
          console.log(statsListsp,"statsListsp");

          this.optionlineatk.series[0].data = statsListatk.reverse()
          this.optionlinedef.series[0].data = statsListdef.reverse()
          this.optionlinehp.series[0].data = statsListhp.reverse()
          this.optionpieper.series[0].data = statsListsp
          // this.armSrc = require(`@/assets/arm/${Number(characterStats[prop])}.png`);

          mychart2.setOption(this.optionlineatk)
          mychart3.setOption(this.optionlinedef)
          mychart4.setOption(this.optionlinehp)
          mychart5.setOption(this.optionpieper)
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
      console.log(this.rendercharacter,"name!!!!!");
      console.log(this.rendercharacter[index],"name!!!!!");
      let radarValues = [
        this.rendercharacter[index].stats.atk_90_90_ac, // 假设这是ATK的值
        this.rendercharacter[index].stats.def_90_90_ac, // 假设这是DEF的值
        this.rendercharacter[index].stats.hp_90_90_ac, // 假设这是HP的值
        this.rendercharacter[index].stats.energy_recharge, // 假设这是Energy Recharge的值
        this.rendercharacter[index].stats.elemental_mastery, // 假设这是Elemental Mastery的值
        this.rendercharacter[index].stats.healing_bonus, // 假设这是Healing Bonus的值
        // this.character.stats.shield_strength, // 假设这是Shield Strength的值
        0,
        // this.character.stats.ancillary_stats, // 假设这是Ancillary Stats的值
        0
        // 确保顺序与radar.indicator中定义的指标相匹配
        // 35.238, 27.85, 19.25, 30, 
        // 20.47
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
              {name: 'Energy Recharge', max: 1.5},
              {name: 'Elemental Mastery', max: 120},
              {name: 'Healing Bonus', max: 0.3},
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

    parsePercentage(percentageString) {
      console.log(percentageString,"percentageString!!!!!");
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
                      },
                  releaseDate: character.release_date !== 'NA' ? character.release_date : null,
                  weaponType: character.weapon_type !== 'NA' ? character.weapon_type : null,
                  ascension: character.ascension !== 'NA' ? character.ascension : null,
                  // chara recommendation & team evaluation
                  tag1: character.tag1 !== 'NA' ? character.tag1 : null,
                  tag2: character.tag2 !== 'NA' ? character.tag2 : null,
                  glbtier_tag1: character.glbtier_tag1 !== 'NA' ? character.glbtier_tag1 : null,
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


},
  // computed: {
  //
  //
  // },
  
  watch: {
  selectedSort(newVal, oldVal) {
    if (newVal !== oldVal) {
      console.log(oldVal,"oldVal");
      console.log(newVal,"newVal");

      localStorage.setItem('selectedSort', newVal);
      // 当selectedSort变化时，刷新页面
      window.location.reload();
    }
  }
},



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
  height: 50%;

}
.card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大5% */
}

.vsavatar {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.vsavatar2{
  width: 30%;
  height: 30%;
  margin-left: 140px;
  margin-top: 20px;
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
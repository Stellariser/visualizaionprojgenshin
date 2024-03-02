<template>
  <el-container>
    <el-row :gutter="40" >
      <el-col :span="6" v-for="(roleId, index) in selectedRoles" :key="index">
        <el-card class="box-card" style="height: 300px;">
          <div slot="header" class="clearfix">
            <span :class="RoleType(roleId)">{{ RoleInTeam(roleId) }}</span>
            <!-- <span> roleId </span> -->
          </div>
          <div @click="openDialog(index)" style="text-align: center;">
            <img :src="getAvatarSrc(Number(roleId)-1)" alt="角色头像" style="height: 200px; width: auto;">
          </div>
          <!-- <el-button type="primary" @click="openDialog(index)" style="margin-top: 5px">详情</el-button> -->
        </el-card>
      </el-col>
      <el-col :span="10">
        <div ref="TeamScore" style="height:600px;width:100%;"></div>
      </el-col>
      <el-col :span="14">
        <div ref="DamageCycle" style="height:600px;width:100%;"></div>
      </el-col>
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
  //   // console.log('路由即将切换')
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
        // console.log('在动吗')

        this.TSchart = echarts.init(this.$refs.TeamScore);
        this.TSchart.setOption(this.TSoption);
        this.DCchart = echarts.init(this.$refs.DamageCycle);
        this.DCchart.setOption(this.DCoption);
        // this.getTS();

      });
    });

    // console.log(this.characters, 'characters');  
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
    // console.log('数组变化了!!!!!');
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
            { name: 'ATK', max: 4000 },
            { name: 'DEF', max: 4000 },
            { name: 'HP', max: 400 },
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

      DCnamae: [],
      DCdata : [],
      DCxaxis: [],
      DCchart: null,
      DCoption : {
        
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   // Use axis to trigger tooltip
          //   type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          // }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          data: {
            value : Array.from({ length: 10 }, (value, index) => index + 1)
          }
        },
        yAxis: [ 
          {
            type: 'category',
            show: false,
            data: ['Member1', 'Member2', 'Member3', 'Member4', 'Member1', 'Member2', 'Member3', 'Member4']
          },
          {
            data: [1, 2, 3, 4],
            show: false,
          },
          {
            type: 'category',
            data: ['Member1', 'Member2', 'Member3', 'Member4'],
            position: 'left',
            axisLabel: {
                margin: 20,
                fontSize: 14 // 设置 Y 轴标签的字号为 14px
            }
          },
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              [320, 302, 301, 334],
              [320, 302, 301, 334],
              [320, 302, 301, 334],
              [320, 302, 301, 334],
              
            ]
          }
        ]
      
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
      // console.log("团队atk得分: ",score)
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
      // console.log("团队def得分: ",score)
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
      // console.log("团队hp得分: ",score)
    },

    teamCost() { // 计算团队cost，就是所有队员星级加起来，让用户知道这队的造价是否昂贵
      let score=0;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          score += Number(this.characters[Number(this.selectedRoles[index])].rarity);
      }
      this.teamScore[4]=score;
      // console.log("团队cost: ",score)
    },

    DCcalc() {

      let [i,j,k] = [0,0,0];
      let buffer0 = 0;
      // 初始化判断数组：人数*[人名，q技能cd，e技能cd，优先级]，4*4
      let cdpri = [];
      for (i = 0; i < 4; i++) {
        let row = [];
        for (j = 0; j < 4; j++) {
            row.push(0);
        }
        cdpri.push(row);
      }
      // this.characters.map(item => // console.log(item.stats.qskill_cd));

      // 遍历已选择角色，优先级：spt>dd>vdd>hlr，加上随机数防同职业相等优先级
      for (let index = 0; index < this.selectedRoles.length; index++) {
        buffer0 = Number(this.selectedRoles[index]);
        cdpri[index][0] = this.characters[buffer0].name;
        cdpri[index][1] = 0;
        // // console.log("q技能读到多少", this.characters[buffer0].stats.qskill_cd)
        // // console.log("赋值多少", cdpri[index][1])
        cdpri[index][2] = 0;
        // cdpri[index][1] = parseInt(this.characters[buffer0].stats.qskill_cd);
        // cdpri[index][2] = parseInt(this.characters[buffer0].stats.eskill_cd);

        switch (this.characters[buffer0].stats.tag1) {
          case 'Support':
            cdpri[index][3] = 4 + Math.random();
            break;
          case 'Damage_Dealer':
            cdpri[index][3] = 3 + Math.random();
            break;
          case 'Vice_DamageDealer':
            cdpri[index][3] = 2 + Math.random();
            break;
          case 'Healer':
            cdpri[index][3] = 1 + Math.random();
            break;
        }
      }
        
        // 按照优先级重排数组
        // console.log("排序之前的数组",cdpri)
        // console.log("赋值多少", cdpri[0][1], cdpri[1][1], cdpri[2][1], cdpri[3][1])
        let cdpri_s = this.sortByRow(cdpri, 3);
        // console.log("排序以后的数组",cdpri_s)
        this.DCnamae=cdpri_s.map(row => row[0]);
        console.log("名字",this.DCnamae)

        // 优先级从大到小

        /**
         * 行动逻辑：
         * - 谁CD好了谁上
         * - CD都好了谁优先级数字大谁上
         * - CD都没好就切主C平A（4以下优先级数字最大的）
         * - 同一人可以同时放Q和E，切人cd算1s
         */

        // 初始化行动数组，size=人数*轴长*【‘是否行动’，‘行动状态q’，‘行动状态e’】，4*20*3
        let koudou = [];
        for (i = 0; i < 4; i++) {
          let depthArray = []; 
          for (j = 0; j < 20; j++) {
              let rowArray = [];
              for (k = 0; k < 3; k++) {
                  rowArray.push(0);
              }
              depthArray.push(rowArray);
          }
          koudou.push(depthArray);
        }

        // 开始判断
        for (i = 0; i < 20; i++) {
          // // console.log(i,"s")
          let depthArray = []; 
          let buffer = 0;
          let maxturn = 0;

          for (k = 0; k < 4; k ++){
            koudou[k][i][0] = 0;  // 行动点数清零
          }

          for (j = 0; j < 4; j++) {
            buffer = this.characters.findIndex(item => item.name === cdpri_s[j][0]);
            // // // console.log(cdpri_s[j][0],this.characters[buffer].name)
            if(cdpri_s[j][1] == 0) {    // q技能
              // // console.log(this.characters[buffer].name,"，Q技能持续时间为",Number(this.characters[buffer].stats.qskill_lst))
              maxturn = this.getMin(Number(this.characters[buffer].stats.qskill_lst),20-i-1)
              for (k = 0; k < maxturn; k ++){             
                koudou[j][i+k][1] = 1;      // 接下来【q技能持续时间】内的状态: 放q技能中
              }
              koudou[j][i][0] = 1;      // 行动点数置1
              cdpri_s[j][1] = this.characters[buffer].stats.qskill_cd; // q技能进入cd
              if(cdpri_s[j][2] == 0) {  // q技能和e技能
                // // console.log(this.characters[buffer].name,"，Q-E技能持续时间为",Number(this.characters[buffer].stats.eskill_lst))
                maxturn = this.getMin(Number(this.characters[buffer].stats.eskill_lst),20-i-1)
                for (k = 0; k < maxturn; k ++){
                  koudou[j][i+k][2] = 1;      // 接下来【e技能持续时间】内的状态: 放e技能中
                }
                cdpri_s[j][2] = this.characters[buffer].stats.eskill_cd; // e技能进入cd
                // // console.log("[q&e]运行到",j,"跳出")
                break;
              }
              // // console.log("[q]运行到",j,"跳出")
              break;
            }
            else if(cdpri_s[j][2] == 0) {    // e技能
              // // console.log(this.characters[buffer].name,"，E技能持续时间为",Number(this.characters[buffer].stats.eskill_lst))
              maxturn = this.getMin(Number(this.characters[buffer].stats.eskill_lst),20-i-1)
              for (k = 0; k < maxturn; k ++){
                // // console.log(k,"这里还有")
                koudou[j][i+k][2] = 1;      // 接下来【e技能持续时间】内的状态: 放e技能中
              }
              // // // console.log("这里还有")
              koudou[j][i][0] = 1;      // 行动点数置1
              cdpri_s[j][2] = this.characters[buffer].stats.eskill_cd; // e技能进入cd
              // // console.log("[e]运行到",j,"跳出")
              break;
            }

            if (j == 3) {
              // 如果每个人的cd都没好，不会触发break，即切到主C平A
              for (k = 0; k < 4; k ++){
                if (cdpri_s[k][3] < 4){
                  koudou[k][i][0] = 1;    // 第一个优先级不大于4的是主C
                  break;
                }
                if(k == 3) {
                  koudou[k][i][0] = 1;      // 要是选了四个辅助那就最后一位打伤害吧
                }
                
              }
            }

          }

          for (k = 0; k < 4; k ++){
            
            cdpri_s[k][1] = cdpri_s[k][1] == 0 ? cdpri_s[k][1]:cdpri_s[k][1]-1;    // q技能cd-1
            cdpri_s[k][2] = cdpri_s[k][2] == 0 ? cdpri_s[k][2]:cdpri_s[k][2]-1;    // e技能cd-1
          }
          // // console.log("此时四人行动", koudou[0][i][0], koudou[1][i][0], koudou[2][i][0], koudou[3][i][0])
          // // console.log("四人Q技能轴 ", koudou[0][i][1], koudou[1][i][1], koudou[2][i][1], koudou[3][i][1])
          // // console.log("四人E技能轴 ", koudou[0][i][2], koudou[1][i][2], koudou[2][i][2], koudou[3][i][2])
          
        }
        // // console.log("行动矩阵", koudou)
        this.DCdata=koudou;
        // console.log("行动矩阵", this.DCdata)
    },

    getMin(a, b) {
      return a > b ? b : a;
    },
    sortByRow(array, rowIndex) {
        // 先根据指定行的值创建一个包含行索引和对应值的对象数组
        let rowWithValue = array.map((row, index) => ({ index, value: row[rowIndex] }));
        
        // 对对象数组按照值进行排序
        rowWithValue.sort((a, b) => b.value - a.value);
        
        // 根据排序后的行索引，重新排列原数组的顺序
        let sortedArray = rowWithValue.map(row => array[row.index]);
        
        return sortedArray;
    },

    // 从行动矩阵生成堆叠图数据
    // 行动数组，size=人数*轴长*【‘是否行动’，‘行动状态q’，‘行动状态e’】，4*20*3
    stackGen(){
      let [i,j,k] = [0,0,0];
      let len = 0;

      let stack = [];
      let stats = [];

      let stackeach = [];
      let statseach = [];
      let buffer0 = [];
      let buffer1 = [];
      let buffer2 = [];
      let koudouzu = [];
      for (k = 0; k < 8; k+=2) {

        stackeach=[];
        statseach=[];

        koudouzu = koudouzu.concat([this.getByIndexes(this.DCdata,k/2,0)])

        buffer0 = this.getByIndexes(this.DCdata,k/2,1)
        buffer1 = this.getColumn(this.countConsecutive(buffer0),0);
        buffer2 = this.getColumn(this.countConsecutive(buffer0),1);

        len = buffer1.length

        for (i = 0; i < 8; i++) {
          let row1 = [];
          for (j = 0; j < len; j++) {
              row1.push(0);
          }
          stackeach.push(row1);
        }

        len = buffer2.length

        for (i = 0; i < 8; i++) {
          let row2 = [];
          for (j = 0; j < len; j++) {
              row2.push(0);
          }
          statseach.push(row2);
        }
        

        stackeach[k]=[...buffer1]
        statseach[k]=[...buffer2]
        // console.log(k,"stackeach",stackeach)

        stack=stack.concat(stackeach)
        stats=stats.concat(statseach)

        stackeach=[];
        statseach=[];

        buffer0 = this.getByIndexes(this.DCdata,k/2,2)
        buffer1 = this.getColumn(this.countConsecutive(buffer0),0);
        buffer2 = this.getColumn(this.countConsecutive(buffer0),1);
        
        len = buffer1.length

        for (i = 0; i < 8; i++) {
          let row1 = [];
          for (j = 0; j < len; j++) {
              row1.push(0);
          }
          stackeach.push(row1);
        }

        len = buffer2.length

        for (i = 0; i < 8; i++) {
          let row2 = [];
          for (j = 0; j < len; j++) {
              row2.push(0);
          }
          statseach.push(row2);
        }

        

        stackeach[k+1]=[...buffer1]
        statseach[k+1]=[...buffer2]
        // console.log(k,"stackeach",stackeach)

        stack=stack.concat(stackeach)
        stats=stats.concat(statseach)
        
      }
      console.log("行动图",koudouzu)
      // 行动图处理

      let koudousen = [];
      let ele = 0
      for (i=0;i<koudouzu[0].length;i++) {
        for (j=0;j<koudouzu.length;j++) {
          if (koudouzu[j][i] == 1) {
            ele = j;
            break;
          }
          
        }
        koudousen.push([i+0.5,ele]) // i+0.5纯为视觉效果
      }

      console.log("行动线",koudousen)
      this.DCxaxis = koudousen


      // for (k = 0; k < 4; k++) {
      //   stackeach=[];
      //   statseach=[];
      //   buffer0 = this.getByIndexes(this.DCdata,k,1)
      //   buffer1 = this.getColumn(this.countConsecutive(buffer0),0);
      //   buffer2 = this.getColumn(this.countConsecutive(buffer0),1);
      //   len = buffer1.length
      //   // 初始化
      //   for (i = 0; i < 4; i++) {
      //     let row1 = [];
      //     for (j = 0; j < len; j++) {
      //         row1.push(0);
      //     }
      //     stackeach.push(row1);
      //   }
      //   // // console.log("check",stackeach)
      //   len = buffer2.length
      //   for (i = 0; i < 4; i++) {
      //     let row2 = [];
      //     for (j = 0; j < len; j++) {
      //         row2.push(0);
      //     }
      //     statseach.push(row2);
      //   }
      //   // // console.log("check",statseach)

      //   stackeach[k]=[...buffer1]
      //   statseach[k]=[...buffer2]
      //   stack=stack.concat(stackeach)
      //   stats=stats.concat(statseach)
        
      // }

      // for (k = 0; k < 4; k++) {
      //   stackeach=[];
      //   statseach=[];
      //   buffer0 = this.getByIndexes(this.DCdata,k,2)
      //   buffer1 = this.getColumn(this.countConsecutive(buffer0),0);
      //   buffer2 = this.getColumn(this.countConsecutive(buffer0),1);
      //   len = buffer1.length
      //   // 初始化
      //   for (i = 0; i < 4; i++) {
      //     let row1 = [];
      //     for (j = 0; j < len; j++) {
      //         row1.push(0);
      //     }
      //     stackeach.push(row1);
      //   }
      //   // // console.log("check",stackeach)
      //   len = buffer2.length
      //   for (i = 0; i < 4; i++) {
      //     let row2 = [];
      //     for (j = 0; j < len; j++) {
      //         row2.push(0);
      //     }
      //     statseach.push(row2);
      //   }
      //   // // console.log("check",statseach)

      //   stackeach[k]=[...buffer1]
      //   statseach[k]=[...buffer2]
      //   stack=stack.concat(stackeach)
      //   stats=stats.concat(statseach)
        
      // }

      // console.log("堆积图数组-q&e",stack)
      // console.log("堆积图数组-q&e状态",stats)

      // 分别转置
      let data = [];
      let statsTrans = [];
      let databuffer = [];
      let flag = [];
      for (k=0;k<8;k++) {
        databuffer = this.transposeArray(stack.slice(k*8, k*8+8))
        // console.log(k,"databuffer",databuffer)
        data=data.concat(databuffer);
        statsTrans=statsTrans.concat(this.transposeArray(stats.slice(k*8, k*8+8)));
      }
      // console.log("转置数据",data)
      console.log("转置状态",statsTrans)
      flag = this.sumRows(statsTrans)
      // console.log("flag",flag)

      // 准备option的series系列
      let localseries = [];
      let localseriesbuf = {
          name: '1',
          type: 'bar',
          barWidth: '20%',
          stack: 'total',
          label: {
            show: false
          },
          emphasis: {
            focus: 'series'
          },
          data: [],
          itemStyle: {
            color: 'green',
            opacity: 0.8,
            borderWidth: 1
          }
      };
      for (k=0;k<data.length;k++) {
        localseriesbuf = {
            name: '1',
            type: 'bar',
            barWidth: '20%',
            stack: 'total',
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [],
            itemStyle: {
              color: 'green',
              opacity: 0.5,
              borderWidth: 1
            }
        };
        localseriesbuf.data=data[k];
        // // console.log(k,data[k])

        localseriesbuf.type='bar';       
        localseriesbuf.stack='total';        
        // localseriesbuf.label.show=true;      
        if(flag[k]==1){         
           
          if (k % 2 == 1 ) { // 偶数行是Q技能
            localseriesbuf.itemStyle.color='red';
            localseriesbuf.name='Q skill'
          }
          else if (k!== 0) { // E技能
            localseriesbuf.itemStyle.color='yellow';
            localseriesbuf.name='E skill'
          }
          else {
            localseriesbuf.itemStyle.color='red';
            localseriesbuf.name='Q skill'
          }
          
        }
        else {
          localseriesbuf.name='idle'
          localseriesbuf.itemStyle.color='grey';
        }
        // // console.log("localseriesbuf",localseriesbuf.data)
        localseries=localseries.concat(localseriesbuf);
      }

      // 添加行动线 
      localseriesbuf = {
        name: 'Active Character ',
        yAxisIndex: 1,
        // symbolSize: 30,
        symbol: 'rect', // 设置散点形状为长方形
        symbolSize: [35, 40], // 设置长方形的长宽比
        itemStyle: {
          color: 'green',
          opacity: 0.2,
          borderColor: 'rgba(0, 0, 0, 0)'
        },
        type: 'scatter',
        data: this.DCxaxis,
      };
      localseries=localseries.concat(localseriesbuf);

      // console.log("localseries",localseries)
      this.DCoption.series = [];  
      this.DCoption.series = localseries;
      // console.log("dcseries",this.DCoption.series)

      // // console.log(this.TSoption.series[0].data[0].value,"radarval") // byd要加[0]

      // { 语法参考
      //   type: 'bar',
      //   data: [4, 3, 2, 1, 0],
      //   coordinateSystem: 'polar',
      //   name: 'With Round Cap',
      //   roundCap: true,
      //   itemStyle: {
      //     borderColor: 'green',
      //     opacity: 0.8,
      //     borderWidth: 1
      //   }
      // }





    },

    sumRows(array) {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let sum = 0;
            for (let j = 0; j < array[i].length; j++) {
                sum += array[i][j];
            }
            result.push(sum);
        }
        return result;
    },
    
    transposeArray(array) {
        let transposedArray = [];
        for (let i = 0; i < array[0].length; i++) {
            let newRow = [];
            for (let j = 0; j < array.length; j++) {
                newRow.push(array[j][i]);
            }
            transposedArray.push(newRow);
        }
        return transposedArray;
    },

    getColumn(array, columnIndex) {
        let column = [];
        for (let i = 0; i < array.length; i++) {
            column.push(array[i][columnIndex]);
        }
        return column;
    },

    getByIndexes(array, firstIndex, thirdIndex) {
        let result = [];
        for (let i = 0; i < array[firstIndex].length; i++) {
            result.push(array[firstIndex][i][thirdIndex]);
        }
        return result;
    },

    countConsecutive(array) {
        let counts = []; // 存放连续数字的个数
        let count = 0; // 记录当前连续数字的个数
        let num = 0;

        // 遍历输入数组
        for (let i = 0; i < array.length; i++) {
            // 如果当前元素与前一个元素相同，计数加1
            num = i > 0? array[i - 1]: array[i]
            if (i > 0 && array[i] === array[i - 1]) {
                count++;
            } else {
                // 如果当前元素与前一个元素不同，将之前的计数添加到 counts 数组中，并重新开始计数
                if (count > 0) {
                    
                    counts.push([count,num]);
                }
                count = 1; // 重新开始计数
            }
        }

        // 将最后一组连续数字的计数添加到 counts 数组中
        if (count > 0) {
            counts.push([count,num]);
        }

        return counts;
    },

    TeamScoreCalc() {  // 计算团队所有需要计算的项
      this.teamScore = [0, 0, 0, 20, 0];
      this.teamATKscore();
      this.teamDEFscore();
      this.teamHPscore();
      this.teamCost();
      this.DCcalc();
      this.stackGen();
      // console.log("当前团队值: [ATK, DEF, HP, PRD, COST]", this.teamScore)
      // // console.log(this.getTS(),"getts")
      this.TSoption.series[0].data[0].value = this.teamScore;
      // console.log(this.TSoption.series[0].data[0].value,"radarval") // byd要加[0]
      this.TSchart = echarts.init(this.$refs.TeamScore);
      this.TSchart.setOption(this.TSoption);

      let buf = 0;
      for (let index = 0; index < this.selectedRoles.length; index++) {
          buf = index*2;
          this.DCoption.yAxis[0].data[7-buf] = this.characters[Number(this.selectedRoles[index])].name;
          this.DCoption.yAxis[0].data[6-buf] = this.characters[Number(this.selectedRoles[index])].name;
          this.DCoption.yAxis[2].data[index] = this.DCnamae[index]
      }
      // console.log(this.DCoption.yAxis[0].data);
      this.DCchart = echarts.init(this.$refs.DamageCycle);
      this.DCchart.setOption(this.DCoption);

      // console.log("图表更新")
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
          // // console.log(id)
          // 当 id 为 0 时，直接使用 0.png，否则使用 id+1 的图片
          const imageName = numericId;
          // const imageName = numericId === 0 ? 0 : numericId + 1;
          // // console.log(`Rendering image for ID: ${id}, using image: ${imageName}.png`);
          return require(`@/assets/genshinava/${imageName}.png`);
        } catch (e) {
          console.error(e);
          // 如果导入失败，返回默认头像图片的路径
          // console.log(`Fallback due to error for ID: ${id}`);
          return require('@/assets/genshinava/0.png'); // 选择一个作为默认头像的路径，可能需要根据你的项目调整
        }
      } else {
        // 对于无效的 id，返回默认头像
        // console.log(`Fallback due to invalid ID: ${id}`);
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

                        // DamageCycle
                        /**
                         * 伤害轴计算用
                         */
                         eskill_lst: character.eskill_lst !== 'NA' ? character.eskill_lst : null,
                         eskill_cd: character.eskill_cd !== 'NA' ? character.eskill_cd : null,
                         eskill_ave: character.eskill_ave !== 'NA' ? character.eskill_ave : null,
                         qskill_lst: character.qskill_lst !== 'NA' ? character.qskill_lst : null,
                         qskill_cd: character.qskill_cd !== 'NA' ? character.qskill_cd : null,
                         qskill_ave: character.qskill_ave !== 'NA' ? character.qskill_ave : null,
                      },
                      releaseDate: character.release_date !== 'NA' ? character.release_date : null,
                      weaponType: character.weapon_type !== 'NA' ? character.weapon_type : null,
                      ascension: character.ascension !== 'NA' ? character.ascension : null,
                      id: character.id !== 'NA' ? character.id : null,
                      // Add other properties as needed
                    };
                  });
                  // console.log(this.characters, 'Characters');
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
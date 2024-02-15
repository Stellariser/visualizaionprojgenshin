<template>
  <div>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart" id="bar1" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart2" id="bar2" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart3" id="bar3" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart4" id="bar4" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart5" id="bar5" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart6" id="bar6" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart7" id="bar7" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart8" id="bar8" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart9" id="bar9" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart10" id="bar10" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart11" id="bar11" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div ref="myChart12" id="bar12" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <div ref="barStacked" id="barStacked" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <div ref="barStacked2" id="barStacked2" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <div ref="barStacked3" id="barStacked3" style="height:400px;width:100%;"></div>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <div ref="barStacked4" id="barStacked4" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <div ref="barStacked5" id="barStacked5" style="height:400px;width:100%;"></div>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="20"><div class="grid-content bg-purple-dark">
        <div ref="radar" id="radar" style="height:800px;width:100%;"></div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark">
        <div class="select_btn">
          <el-select v-model="select_value" multiple
                     placeholder="Please Select"
                     style="height:800px;width:100%;padding-right: 100px;"
                     @change="handleSelectChange(select_value)" >
            <el-option
                v-for="name in names"
                :key="name"
                :label="name"
                :value="name">
            </el-option>
          </el-select>
        </div>

      </div></el-col>

    </el-row>

  </div>




</template>

<script>
import * as echarts from 'echarts';
import Papa from 'papaparse';
import axios from 'axios';

export default {
  mounted() {

    this.loadCSVData();
    console.log(this.people,"hellp");
    this.radarChart = echarts.init(this.$refs.radar)


    this.radarChart.setOption(this.optionradarall);


    let barstack = echarts.init(this.$refs.barStacked)
    let optionBarStacked = {
      title: {
        text: 'Mathematics and statistics'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Math', 'Statistics']
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Math',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [0, 1, 8, 4, 11, 11, 5, 1, 1, 0],
          itemStyle: {
            color: '#ca8622' // 将颜色设置为蓝色
          }
        },
        {
          name: 'Statistics',
          type: 'bar',
          // stack: 'total',
          data: [2, 5, 11, 1, 10, 8, 1, 2, 2, 0],
          itemStyle: {
            color: '#c23531' // 将颜色设置为蓝色
          }
        },
      ]
    };
    barstack.setOption(optionBarStacked);

    let barstack2 = echarts.init(this.$refs.barStacked2)
    let optionBarStacked2 = {
      title: {
        text: 'Art and design skills'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Art', 'UI']
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Art',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [3, 3, 5, 8, 4, 4, 5, 6, 1, 3],
          itemStyle: {
            color: '#61a0a8' // 将颜色设置为蓝色
          }
        },
        {
          name: 'UI',
          type: 'bar',
          // stack: 'total',
          data: [0, 1, 1, 1, 3, 8, 5, 19, 3, 1],
          itemStyle: {
            color: '#d48265' // 将颜色设置为蓝色
          }
        },
      ]
    };
    barstack2.setOption(optionBarStacked2);

    let barstack3 = echarts.init(this.$refs.barStacked3)
    let optionBarStacked3 = {
      title: {
        text: 'Programming implementation'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['VIZ', 'Code', 'Graph', 'Git']
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'VIZ',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [3, 3, 15, 4, 5, 8, 3, 1, 0, 0],
          itemStyle: {
            color: '#2f4554' // 将颜色设置为蓝色
          }
        },
        {
          name: 'Code',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [0, 1, 6, 4, 10, 7, 6, 8, 0, 0],
          itemStyle: {
            color: '#91c7ae' // 将颜色设置为蓝色
          }
        },
        {
          name: 'Graph',
          type: 'bar',
          // stack: 'total',
          data: [7, 6, 7, 8, 4, 4, 3, 2, 1, 0],
          itemStyle: {
            color: '#749f83' // 将颜色设置为蓝色
          }
        },
        {
          name: 'Git',
          type: 'bar',
          // stack: 'total',
          data: [0, 4, 4, 2, 6, 4, 11, 7, 2, 2],
          itemStyle: {
            color: '#c4ccd3' // 将颜色设置为蓝色
          }
        },
      ]
    };
    barstack3.setOption(optionBarStacked3);

    let barstack4 = echarts.init(this.$refs.barStacked4)
    let optionBarStacked4 = {
      title: {
        text: 'User-oriented'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['HCI', 'UserEval']
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'HCI',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [3, 2, 11, 4, 8, 2, 6, 4, 1, 1],
          itemStyle: {
            color: '#ca8622' // 将颜色设置为蓝色
          }
        },
        {
          name: 'UserEval',
          type: 'bar',
          // stack: 'total',
          data: [3, 7, 6, 6, 8, 5, 4, 2, 0, 1],
          itemStyle: {
            color: '#bda29a' // 将颜色设置为蓝色
          }
        },
      ]
    };
    barstack4.setOption(optionBarStacked4);

    let barstack5 = echarts.init(this.$refs.barStacked5)
    let optionBarStacked5 = {
      title: {
        text: 'Teamwork skills'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Communication', 'Collaborative']
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Communication',
          type: 'bar',
          // stack: 'total', // 确保这个值在所有要堆叠的系列中相同
          data: [1, 0, 1, 3, 1, 8, 6, 10, 8, 4],
          itemStyle: {
            color: '#6e7074' // 将颜色设置为蓝色
          }
        },
        {
          name: 'Collaborative',
          type: 'bar',
          // stack: 'total',
          data: [1, 1, 1, 1, 4, 3, 8, 10, 8, 5],
          itemStyle: {
            color: '#546570' // 将颜色设置为蓝色
          }
        },
      ]
    };
    barstack5.setOption(optionBarStacked5);

    let mychart = echarts.init(this.$refs.myChart)
    let mychart2 = echarts.init(this.$refs.myChart2)
    let mychart3 = echarts.init(this.$refs.myChart3)
    let mychart4 = echarts.init(this.$refs.myChart4)
    let mychart5 = echarts.init(this.$refs.myChart5)
    let mychart6 = echarts.init(this.$refs.myChart6)
    let mychart7 = echarts.init(this.$refs.myChart7)
    let mychart8 = echarts.init(this.$refs.myChart8)
    let mychart9 = echarts.init(this.$refs.myChart9)
    let mychart10 = echarts.init(this.$refs.myChart10)
    let mychart11 = echarts.init(this.$refs.myChart11)
    let mychart12 = echarts.init(this.$refs.myChart12)
    let xData1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yData1 = [3, 3, 15, 4, 5, 8, 3, 1, 0, 0]
    let xDatastats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatastats = [2, 5, 11, 1, 10, 8, 1, 2, 2, 0]
    let xDatamath = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatamath = [0, 1, 8, 4, 11, 11, 5, 1, 1, 0]
    let xDataart = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDataart = [3, 3, 5, 8, 4, 4, 5, 6, 1, 3]
    let xDataui = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDataui = [0, 1, 1, 1, 3, 8, 5, 19, 3, 1]
    let xDatacode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatacode = [0, 1, 6, 4, 10, 7, 6, 8, 0, 0]
    let xDatagraph = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatagraph = [7, 6, 7, 8, 4, 4, 3, 2, 1, 0]
    let xDatahci = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatahci = [3, 2, 11, 4, 8, 2, 6, 4, 1, 1]
    let xDataeval = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDataeval = [3, 7, 6, 6, 8, 5, 4, 2, 0, 1]
    let xDatacomm = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatacomm = [1, 0, 1, 3, 1, 8, 6, 10, 8, 4]
    let xDatacollab = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatacollab = [1, 1, 1, 1, 4, 3, 8, 10, 8, 5]
    let xDatagit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    let yDatagit = [0, 4, 4, 2, 6, 4, 11, 7, 2, 2]
    let option1 = {
      title: {
        text: 'VIZ'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xData1
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yData1,
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '##ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        itemStyle: {
          color: '#2f4554' // 将颜色设置为蓝色
        }
      }]
    };
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
    let optionmath = {
      title: {
        text: 'math'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatamath
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatamath,
        itemStyle: {
          color: '#ca8622' // 将颜色设置为蓝色
        }
      }]
    };
    let optionart = {
      title: {
        text: 'art'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDataart
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDataart,
        itemStyle: {
          color: '#61a0a8' // 将颜色设置为蓝色
        }
      }]
    };
    let optionui = {
      title: {
        text: 'UI'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDataui
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDataui,
        itemStyle: {
          color: '#d48265' // 将颜色设置为蓝色
        }
      }]
    };
    let optioncode = {
      title: {
        text: 'Code'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatacode
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatacode,
        itemStyle: {
          color: '#91c7ae' // 将颜色设置为蓝色
        }
      }]
    };
    let optiongraph = {
      title: {
        text: 'Graph'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatagraph
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatagraph,
        itemStyle: {
          color: '#749f83' // 将颜色设置为蓝色
        }
      }]
    };
    let optionhci = {
      title: {
        text: 'HCI'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatahci
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatahci,
        itemStyle: {
          color: '#ca8622' // 将颜色设置为蓝色
        }
      }]
    };
    let optioneval = {
      title: {
        text: 'Eval'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDataeval
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDataeval,
        itemStyle: {
          color: '#bda29a' // 将颜色设置为蓝色
        }
      }]
    };
    let optioncomm = {
      title: {
        text: 'Comm'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatacomm
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatacomm,
        itemStyle: {
          color: '#6e7074' // 将颜色设置为蓝色
        }
      }]
    };
    let optioncollab = {
      title: {
        text: 'collab'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatacollab
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatacollab,
        itemStyle: {
          color: '#546570' // 将颜色设置为蓝色
        }
      }]
    };
    let optiongit = {
      title: {
        text: 'git'
      },
      tooltip: {},
      legend: {
        data: ['rate']
      },
      xAxis: {
        data: xDatagit
      },
      yAxis: {},
      series: [{
        name: 'rate',
        type: 'bar',
        data: yDatagit,
        itemStyle: {
          color: '#c4ccd3' // 将颜色设置为蓝色
        }
      }]
    };
    mychart.setOption(option1)
    mychart2.setOption(optionstats)
    mychart3.setOption(optionmath)
    mychart4.setOption(optionart)
    mychart5.setOption(optionui)
    mychart6.setOption(optioncode)
    mychart7.setOption(optiongraph)
    mychart8.setOption(optionhci)
    mychart9.setOption(optioneval)
    mychart10.setOption(optioncomm)
    mychart11.setOption(optioncollab)
    mychart12.setOption(optiongit)


  },


  data() {

    return {
      radarChart: null,
      names: [],
      attributes: [],
      selectedName: '', // 选中的人名
      selectedAttributes: [], // 选中人的属性
      select_value: [],
      OverallValue: [],
      OverallSelect:[],
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
    }

  },
  methods: {

    checkMaxSelection() {
      if (this.select_value.length > 5) {
        this.$message.warning('You can select up to 5 items.');
        return false;
      }
      return true;
    },

    updateChartData(newData) {
      this.optionradarall.series[0].data[0].value = newData;
      let radarChart = echarts.init(this.$refs.radar)
      this.radarChart.setOption(this.optionradarall, true); // true 参数确保图表不合并之前的配置
    },

    handleSelectChange(value) {
      this.selectedAttributes = value.map(name => {
        const index = this.names.indexOf(name);
        console.log(index, "index")
        console.log(this.select_value, "select_value")
        console.log(this.attributes[index], "attributes[index]");
        this.OverallValue = [0,0,0,0,0,0,0,0,0,0,0,0]
        const selectedIndices = this.select_value.map(name => this.names.indexOf(name));
        // 根据索引累加对应的属性值
        selectedIndices.forEach(index => {
          if (index !== -1 && this.attributes[index]) {
            this.attributes[index].forEach((value, attrIndex) => {
              this.OverallValue[attrIndex] += Number(value);
            });
          }
        });
        console.log(this.OverallValue,"adadadadasfgags")
        this.updateChartData(this.OverallValue)

      });
    },

    loadCSVData() {
      fetch('./data/data.csv')
          .then(response => response.text())
          .then(csvData => {
            Papa.parse(csvData, {
              header: true,
              complete: (results) => {
                this.names = [];
                this.attributes = [];
                results.data.forEach(person => {
                  this.names.push(person.ALIAS);
                  this.attributes.push([
                    person.viz,
                    person.stats,
                    person.math,
                    person.art,
                    person.ui,
                    person.code,
                    person.graph,
                    person.hci,
                    person.eval,
                    person.comm,
                    person.collab,
                    person.GIT,

                    // ... 其他属性
                  ]);
                });
                console.log(this.names, 'Names');
                console.log(this.attributes, 'Attributes');

              }
            });
          })
          .catch(error => console.error('Error loading the CSV file:', error));
    },
    initChart() {
      if (!this.chartData) {
        console.error('No data available for the chart.');
        return;
      }

      // Convert chartData to the format required by ECharts
      // ...

      const myChart = echarts.init(this.$refs.chart);
      const option = {
        // ECharts configuration
        // Use the converted data
      };

    }
  }
}
</script>

<style lang="less" scoped>
.select_btn{
  position: absolute;
  top: 5px;
  right: 100px;
  //下拉框
  .el-select-dropdown{
    border: none;
    background-color: rgba(1, 28, 82, 0.8);
  }
  //输入框
  .el-input__inner{
    color:#eee;
    border-color: #00fff6;
    background-color: rgba(1, 28, 82, 0.8);
  }
  //聚焦时的样式
  .el-select .el-input.is-focus .el-input__inner{
    border-color: #0B61AA;
    background-color: rgba(1, 28, 82, 0.8);
    color:#00D3E9;
  }
  //下拉框选中
  .el-select-dropdown__item{
    color: #eee;
  }
  //鼠标经过下拉框
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover{
    color:#00D3E9;
    background-color: #0F3360;
  }

}

</style>

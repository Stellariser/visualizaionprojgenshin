<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="6">
              <div>
                <el-card class="box-card">
                  <div class="avatar_box1">
                    <img src="../assets/class6.png" alt="">
                  </div>
                  <div class="card-panel-text">
                    总帧数
                    <count-to :start-val="0" :end-val="endValFrame" :duration="2600" class="card-panel-num" />
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                  <div class="avatar_box1">
                    <img src="../assets/class3.png" alt="">
                  </div>
                  <div class="card-panel-text">
                    总分类数
                    <count-to :start-val="0" :end-val="endValClass" :duration="2600" class="card-panel-num" />
                  </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                  <div class="avatar_box1">
                    <img src="../assets/class4.png" alt="">
                  </div>
                  <div class="card-panel-text">
                    总场景数
                    <count-to :start-val="0" :end-val="endValScene" :duration="2600" class="card-panel-num" />
                  </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                  <div class="avatar_box1">
                    <img src="../assets/class5.png" alt="">
                  </div>
                  <div class="card-panel-text">
                    总标签数
                    <count-to :start-val="0" :end-val="endValMark" :duration="2600" class="card-panel-num" />
                  </div>
                </el-card>
            </el-col>
        </el-row>
        <!--卡片视图区域-->
    <el-card class="box-card">
        <el-row :gutter="30">
            <el-col :span="24">
                <ve-line
                        :data="LineChartData">
                </ve-line>
            </el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="8">
              <ve-pie :data="chartData1"></ve-pie>
            </el-col>
            <el-col :span="8">
              <ve-ring :data="chartData2" :settings="chartSettings" ></ve-ring>
            </el-col>
            <el-col :span="8">
              <ve-liquidfill :data="chartData3" :settings="LiquidChartSettings"></ve-liquidfill>
            </el-col>
        </el-row>
    </el-card>
    </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: { countTo },
  data () {
    return {
      endValFrame: 2017,
      endValClass: 5000,
      endValScene: 10000,
      endValMark: 22200,
      LineChartData: {
        columns: ['日期', '分类', '场景', '标注'],
        rows: [
          {
            日期: '1/1',
            分类: 1393,
            场景: 2093,
            标注: 500
          },
          {
            日期: '1/2',
            分类: 3530,
            场景: 3230,
            标注: 400
          },
          {
            日期: '1/3',
            分类: 2923,
            场景: 2023,
            标注: 1000
          },
          {
            日期: '1/4',
            分类: 1723,
            场景: 1023,
            标注: 1500
          },
          {
            日期: '1/5',
            分类: 3792,
            场景: 2492,
            标注: 4000
          },
          {
            日期: '1/6',
            分类: 4593,
            场景: 4293,
            标注: 2000
          }
        ]
      },
      chartData1: {
        columns: ['class_name', 'class_count'],
        rows: []
      },
      chartData2: {
        columns: ['scene_name', 'scene_count'],
        rows: []
      },
      chartData3: {
        columns: ['mark', 'percent'],
        rows: [{
          mark: '已标记占比',
          percent: 0.53
        }]
      }
    }
  },
  created () {
    this.getGraphData()
  },
  methods: {
    async getGraphData () {
      const { data: res1 } = await this.$http.get('chart/getClassData')
      console.log(res1)
      this.chartData1.rows = res1.data
      const { data: res2 } = await this.$http.get('chart/getSceneData')
      console.log(res2)
      this.chartData2.rows = res2.data
      const { data: res3 } = await this.$http.get('chart/getAmountData')
      this.endValClass = res3.classAmount
      this.endValScene = res3.sceneCount
      this.endValMark = res3.labelAmount
      this.endValFrame = res3.frameAmount
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.el-row {
    margin-top: 20px;
    margin-bottom: 30px;
}
.info-card {
    height: 120px;
}
.avatar_box{
  height:90px;
  width:90px;
  border: 1px solid #ffffff;
  padding:10px;
  background-color: #ffffff;
  left:50%;
  margin-top: -10px;
  margin-left: -15px;
}
img{
  height:100%;
  width:100%;
}
.avatar_box1{
  float: left;
  height:90px;
  width:90px;
  border: 1px solid #ffffff;
  padding:10px;
  background-color: #ffffff;
  left:50%;
  margin-top: -10px;
  margin-left: -15px;
}
.avatar_box2{
  float: right;
  height:90px;
  width:90px;
  border: 1px solid #ffffff;
  padding:10px;
  background-color: #ffffff;
  left:50%;
  margin-top: -10px;
  margin-left: -15px;
}
.card-panel-text {
  line-height: 80px;
  color: rgb(6, 7, 7);
  font-size: 25px;
  margin-bottom: 12px;
}
</style>

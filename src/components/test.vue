<template>
  <div>
<ul>
  111
  <li v-for="item1 in jsonData">{{item1.direction}}+{{item1.posType}}+{{item1.address}}</li>
</ul>
    <P v-for="item in listData">{{item.id}}</P>
    <button @click="getHomepage">222</button>
    <button @click="getHomepage2">222</button>
  </div>
</template>

<script>
export default {
  name: "test",
  data(){
    return{
      listData:[],
      jsonData:[]
    }

  },
  methods:{
    getHomepage:function (){
      this.$axios.get('/homepage').then(res=>{
        console.log(res)
        this.listData=res.data.data
      })
    },
    getHomepage2:function (){
      this.$axios.get('/homepage2').then(res=>{
        console.log('1')
        console.log(res)
        if(typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length){
          this.jsonData = JSON.parse(res.data.dataMock.data)
        }else {
          this.jsonData = res.data.dataMock.data
        }


      })
    }
  },
  created() {
    this.getHomepage()
  }
}
</script>

<style scoped>

</style>

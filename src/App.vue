<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Canvas from '@/assets/css/canvas-nest.min.js'
export default {
  name: 'app',
  components:{
    Canvas
  }

  /*methods:{
    idle() {
      const h = this.$createElement;

      this.$notify({
        title: '???',
        duration: 6000,
        position: 'bottom-right',
        offset: 250,
        message: h('i', { style: 'color: teal'}, 'What are you looking at?')
      });
    },
    created() {
      setTimeout(() =>{
        this.idle()}, 3)
    },
}*/
}
</script>

<style scoped>

canvas{
  background: rgb(226, 106, 225);
  opacity: 100%;
}
html,body,#app{height: 100%}
body {
  margin: 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //0 by default
    idToken: 0,
    lastTime:0,
    passwordWrongTime:0,
  },
  getters: {
  },
  mutations: {
    SET_LOGSTATUS:(state,loginObj) =>{
      state.idToken = loginObj.idToken
      state.lastTime = loginObj.lastTime
      localStorage.setItem("idToken",state.idToken)
      localStorage.setItem("lastTime",state.lastTime)

},
    UPDATE_TIME:(state,updateTime)=>{
      state.lastTime=updateTime
      localStorage.setItem("lastTime",state.lastTime)
    },
    CLEAR_Login:(state) =>{
      state.idToken = 0
      state.lastTime = 0
      localStorage.setItem("idToken",state.idToken)
      localStorage.setItem("lastTime",state.lastTime)
    },
    ADD_PASS_W:(state) =>{
      state.passwordWrongTime+=1
        localStorage.setItem("passwordWrongTime",state.passwordWrongTime)
    },
    INIT_PASS_W:(state) =>{
      state.passwordWrongTime=0
        localStorage.setItem("passwordWrongTime",state.passwordWrongTime)
    },
  },


  actions: {
  },
  modules: {
  }
})

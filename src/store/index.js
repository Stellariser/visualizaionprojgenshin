import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //0 by default
    idToken: 0,
    lastTime:0,
    passwordWrongTime:0,
      selectedRoles: [0, 0, 0, 0], // 新增数组
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
      UPDATE_ROLE(state, {index, newRoleId}) {
          if (index >= 0 && index < state.selectedRoles.length) {
              Vue.set(state.selectedRoles, index, newRoleId); // 使用Vue.set确保响应性
          }
      },

      // 重置selectedRoles数组
      RESET_ROLES(state) {
          state.selectedRoles = [0, 0, 0, 0];
      },
      ADD_ROLE(state, roleId) {
          // 查找第一个值为0的索引
          const emptyIndex = state.selectedRoles.findIndex(role => role === 0);

          // 检查是否已经有这个 roleId
          if (state.selectedRoles.includes(roleId)) {
              // 如果已存在，就不再添加（错误处理将在组件中完成）
              console.error("Characters are already in the queue");
          } else if (emptyIndex !== -1) {
              // 如果有空位，添加角色 ID 到这个位置
              Vue.set(state.selectedRoles, emptyIndex, roleId);
          } else {
              // 如果没有空位，也不做任何事（错误处理将在组件中完成）
              console.error("The queue is full.");
          }
      },
      REMOVE_ROLE(state, index) {
          if (index >= 0 && index < state.selectedRoles.length) {
              // 使用Vue.set确保响应性
              Vue.set(state.selectedRoles, index, 0);
          }
      }

  },


  actions: {
  },
  modules: {
  }
})

import axios from 'axios';
import router from './router';
import Element from "element-ui";
import store from "@/store";

//定义url前半部分
axios.defaults.baseURL = 'http://localhost:8080'
//axios.defaults.baseURL = 'http://47.111.2.133:8080/demo-0.0.1-SNAPSHOT/'
//axios.defaults.baseURL = 'http://localhost:8080/demo_0_0_1_SNAPSHOT_wa r/'


//创建对象统一设置超时时间等等
const request = axios.create({
    //5000ms timeout
    timeout:5000,
    headers: {
        'Content-Type':'application/json; charset=utf-8'
    }

})


//拦截request
//每次发送都把这个idToken给送过去
request.interceptors.request.use(config=>{
    config.headers['idToken'] = localStorage.getItem("idToken")
    const nowTime = Date.now()
    const lastTime = localStorage.getItem('lastTime')
        if((nowTime-lastTime)>3600000){
            // console.log(nowTime)
            store.commit('CLEAR_Login')
        }else if((nowTime-lastTime)>0) {
            store.commit('UPDATE_TIME',nowTime)
            // console.log(nowTime)//test
            // console.log('localstorge', localStorage.getItem('lastTime'))
        }

    return config
})

// request.interceptors.response.use(response =>{
//     //409代表用户名已存在
//     console.log(response)
//     if (response.data.status===200||(response.data.status<5)){
//         return response
//     }
//     else {
//         Element.Message.error(response.data.msg?response.data.msg:'系统异常')
//         return Promise.reject(response.data.msg)
//     }
// },error => {
//     if(error.response.data){
//         error.message = error.response.data
//      }
//     if(error.response.status===401){
//         router.push("/login")
//     }
//     Element.Message.error(error.message,{duration:3000})
//     return Promise.reject(error)
// })

export default request

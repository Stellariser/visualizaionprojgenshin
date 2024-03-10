import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home'
import welcome from '../components/welcome'
import register from '../components/register'
import notfound from '../components/notFoundPage'
import store from '../store/index'
import detail from '../components/postdetail'
// import test from '../components/test'
import postList from'../components/postList'
import createPost from "@/components/createpost";
import mePage from '../components/personalInfo'
import resetPassword from "@/components/resetpassword";
import postDetail from "@/components/postdetail";
import myPostList from "@/components/myPostList";
import postCollection from "@/components/postCollection"
import notificationBoard from "@/components/notificationBoard";
import FPMain from "@/components/FPMain";
import Characters from "@/components/New/Characters";
import RecommendTeams from '@/components/New/RecommendTeams'
import team from '@/components/New/team'
Vue.use(VueRouter)

const routes = [

    { path: '/', redirect: '/home' },
    { path: '/login', component: FPMain },
    { path: '/register', component: register },
    { path: '/404', component: notfound },
    { path: '/reset', component: resetPassword },
    {
        path: '/postDetail/',
        name:'postDetail',
        component: detail,
        props:true,
    },
    {
        path: '/home',
        component: FPMain,
        children: [
            {
                path: '/recommend-teams',
                name: 'Recommendteams',
                component: RecommendTeams
            },
            { path: '/Characters', component: Characters },
            { path: '/team', component: team },
            { path: '/welcome', component: FPMain },
            { path: '/home/', component: Characters},
            { path: '/home/createPost', component: createPost},
            { path: '/home/myInfo', component: mePage},
            { path: '/home/myPost', component: myPostList},
            { path: '/home/postCollection', component: postCollection},
            { path: '/home/notificationBoard', component: notificationBoard},
        ]
    },
    { path: '/*', redirect: '/404' }
]

const router = new VueRouter({

    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//   // 如果用户访问的登录页, 直接放行
//   console.log(localStorage.getItem('idToken'))
//   console.log(to.path)
//   if(to.path ==='/404') return next();
//   if (to.path === '/Login'||to.path==='/register'||to.path==='/reset') return next();
//
//
//   // 从 lOCALStorage 中获取到保存的 token 值
//   const tokenstr = localStorage.getItem('idToken')
//   const lastTime = localStorage.getItem('lastTime')
//   console.log(typeof (tokenstr)=='undefined')
//   const nowTime = Date.now()
//   if(lastTime===0||!lastTime) return next('/Login')
//
//
//
//     if((nowTime-lastTime)>3600000){
//         // console.log(nowTime)
//         store.commit('CLEAR_Login')
//         return next('/Login')
//     }else {
//         store.commit('UPDATE_TIME',nowTime)
//         // console.log(nowTime)
//         // console.log('localstorge', localStorage.getItem('lastTime'))
//     }
//   //需要加入一个时间判断机制
//   // 没有 token，强制跳转到登录页
//   if (tokenstr===0||!tokenstr) return next('/Login')
//   next()
// })



export default router

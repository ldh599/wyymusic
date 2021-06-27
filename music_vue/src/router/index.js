import Vue from 'vue'
import Router from 'vue-router'


const UserList = () => import('../components/main/main_right/userList/userList')
const Recommend = () => import('../components/main/main_right/recommend/recommend')
const UserLikeSongs = () => import('../components/main/main_right/userLikeSongs/userLikeSongs')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/userList/:userListId',
      name:'userList',
      component: UserList
    },
    {
      path:'/',
      name:'recommed',
      component:Recommend
    },
    {
      path:'/likeSongs',
      name:'userLikeSongs',
      component:UserLikeSongs
    }
  ],
  mode:'history'
})

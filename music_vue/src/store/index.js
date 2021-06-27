import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo:{
      userId:null,
      userName:null
    },
    imgUrl:"music.jpg",
    playURL:null,
    audioState:false,
    continuePlayFlag:true
  },
  mutations: {
    updateUserInfo(state,userInfo){
      state.userInfo.userId = userInfo[0]
      state.userInfo.userName = userInfo[1]
    },
    updateImgUrl(state,newImgUrl){
      state.imgUrl = newImgUrl
    },
    updatePlayUrl(state,newPlayURL){
      state.playURL = newPlayURL
    },
    updateAudioState(state){
      state.audioState = !state.audioState
    },
    updateContinuePlayFlag(state){
      state.continuePlayFlag = !state.continuePlayFlag
    }
  },
  actions:{},
  modules:{}
})

export default store
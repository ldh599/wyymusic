<template>
  <div id="addSongToListWindow" v-if="true">
    <slot></slot>
    <ul>
      <li v-for="(info, index) in userSongList" :key="index">
        <button
          @click="
            requestAddSongToList(info.userListId, songId);
            showAddSongToListWindow();
          "
        >
          {{ info.userListName }}
        </button>
        {{ info.userListId }}
      </li>
      <!-- <li>{{userSongList}}</li> -->
      <li>{{ songId }}</li>
    </ul>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "addSongToListWindow",
  props: {
    // userSongList: Array,
    songId: String,
    show: Boolean,
  },
  data(){
    return {
      userSongList:[]
    }
  },
  created(){
    this.requestUserListData(this.$store.state.userInfo.userId)
  },
  methods: {
     requestUserListData(userId) {
      const that = this;
      axios({
        url: "http://localhost:8081/selectUserAllList/" + userId,
      })
        .then((res) => {
          // console.log(res.data);
          that.userSongList = res.data;
          // console.log(that.userSongList);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(that.userSongList);
    },
    showAddSongToListWindow() {
      this.$emit("showAddSongToListWindowFun");
    },
    requestAddSongToList(userListId, songId) {
      // const that = this
      axios({
        url: "http://localhost:8081/addSongToList",
        params: {
          userListId: userListId,
          songId: songId,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if(res.data === false){
            alert("这个歌单已经有这首歌了哦")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#addSongToListWindow {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
  border-radius: 10px;
}
</style>
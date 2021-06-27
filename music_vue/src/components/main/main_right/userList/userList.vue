<template>
  <div id="userList_father">
    <div class="list_info">
      <img :src="getImgUrl" alt="" />

      <div class="list_info_text">
        <!-- <h1>{{ ListInfo.userListName }}</h1> -->
        <input
          type="text"
          v-model="ListInfo.userListName"
          id="updateListNameInput"
        />
        <button id="updateListNameBtn" @click="requestUpdateListName"></button>
        <p>
          <img src="../../../../assets/img/top/user.png" alt="" />
          {{ $store.state.userInfo.userName }}
        </p>
        <!-- 用户歌单的简介 -->
        <textarea
          style="margin-top: 10px"
          v-model="ListInfo.userListText"
          class="userSongListText"
        ></textarea>
        <button id="updateTextBtn" class="none" @click="requestUpdateListText">
          
        </button>

        <p class="list_info_btn">
          <button>全部播放</button>
          <button>下载</button>
          <button>批量操作</button>
          <button>分享</button>
        </p>
      </div>
    </div>
    <div class="list_btn">
      <button class="list_btn_songs">歌曲{{ songList.length }}</button>
    </div>
    <div class="list_song_top">
      <div>
        <div class="songName">歌曲</div>
        <div class="singerName">歌手</div>
        <div class="specialName">专辑</div>
      </div>
    </div>
    <div class="list_songs">
      <ul>
        <!-- 循环出来的音乐 -->
        <li v-for="(info, index) in songList" :key="index">
          <div class="songName">
            <button
              title="喜欢"
              style="font-size: 25px"
              v-show="!showUserLikeSongBtn(index)"
              class="noLike"
              @click="requestAddLike(userId, info.songId)"
            >
              
            </button>
            <button
              title="不喜欢了"
              style="font-size: 25px; color: rgb(194, 0, 0)"
              v-show="showUserLikeSongBtn(index)"
              class="like"
              @click="requestDelLikeSong(userId, info.songId)"
            >
              
            </button>

            <button
              name="歌曲名称"
              :title="'播放' + info.songName"
              @click="
                updatePlayUrl(info.songUrl,index);
                showPlayStateBtn(index);
              "
              class="playSongBtn"
            >
              {{ info.songName }}
            </button>
            <div class="songName_btn">
              <button></button>
              <button
                title="添加到"
                @click="
                  showAddSongToListWindowFun();
                  getSongId(info.songId);
                "
              >
                
              </button>
              <button
                class="pauseSongBtn none"
                @click="showPlayStateBtn(index);"
                :title="'暂停' + info.songName"
              >
                
              </button>
              <button
                @click="
                  updatePlayUrl(info.songUrl);
                  showPlayStateBtn(index);
                "
                class="playSongBtn"
                :title="'播放' + info.songName"
              >
                
              </button>
            </div>
          </div>
          <div class="singerName">
            <button>{{ info.singerName }}</button>
          </div>
          <div class="specialName">
            <button>{{ info.specialName }}</button>
            <button
              style="float: right"
              @click="requestDelSongFromList(userListId, info.songId)"
            >
              
            </button>
          </div>
        </li>
      </ul>
    </div>
    <!-- <button @click="test1">111111</button> -->
    <add-song-to-list-window
      :userSongList="getAddSongToListWindowData.userSongList"
      :songId="getAddSongToListWindowData.songId"
      v-if="showAddSongToListWindow"
      v-on:showAddSongToListWindowFun="showAddSongToListWindowFun"
    >
      <button
        style="margin-right: 10px; float: right"
        id="showAddSongToListWindowBtn"
        @click="showAddSongToListWindowFun()"
      >
        X
      </button>
    </add-song-to-list-window>
  </div>
</template>

<script>
const axios = require("axios");
import AddSongToListWindow from "../../../popupWindews/addSongToListWindow";
export default {
  name: "userList",
  data() {
    return {
      userId: "",
      userListId: "",
      ListSongSun: 1,
      songList: [],
      ListInfo: {},
      userLikeSongsInfo: [],
      imgUrl: "",
      showAddSongToListWindow: false,
      getAddSongToListWindowData: { userSongList: [], songId: "123" },
    };
  },
  components: {
    AddSongToListWindow,
  },
  beforeCreate() {
    // this.getUserListInfo()
  },
  created() {
    this.getUserId();
    this.getUserListId();
    this.requestUserListInfo(this.userListId);
    this.requestListSongInfo(this.userListId);
    this.getDataByimgUrl();
    this.requestUserLikeSongsInfo(this.userId);
    // this.showUserLikeSongBtn();
    // this.getDataByimgUrl()
    // this.test1()
  },
  mounted() {
    // this.getUserId()
    // this.getUserListSongInfo()
    this.getDataByimgUrl();
    this.showUpdateTextBtn();
    this.showUpdateListNameBtn();
    this.initTextarea();
    this.initRequestInput();
  },
  methods: {
    requestDelSongFromList(userListId, songId) {
      const that = this;
      axios({
        url: "http://localhost:8081/delSongFromList",
        params: {
          userListId: userListId,
          songId: songId,
        },
      })
        .then((res) => {
          // console.log(res.data);
          that.songList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSongId(songId) {
      this.getAddSongToListWindowData.songId = songId;
    },
    showAddSongToListWindowFun() {
      this.showAddSongToListWindow
        ? (this.showAddSongToListWindow = false)
        : (this.showAddSongToListWindow = true);
    },
    //多个页面使用
    requestDelLikeSong(userId, songId) {
      const that = this;
      axios({
        url: "http://localhost:8081/delLikeSong",
        params: {
          userId: userId,
          songId: songId,
        },
      })
        .then((res) => {
          // console.log(res.data);
          that.userLikeSongsInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserId() {
      // console.log(this.$store.state.userInfo.userId);
      this.userId = this.$store.state.userInfo.userId;
    },
    requestAddLike(userId, songId) {
      const that = this;
      axios({
        url: "http://localhost:8081/addLikeSong",
        params: {
          userId: userId,
          songId: songId,
        },
      })
        .then((res) => {
          that.userLikeSongsInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //多个页面使用
    requestUserLikeSongsInfo(userId) {
      const that = this;
      axios({
        url: "http://localhost:8081/selectUserLikeSongs",
        params: {
          userId: userId,
        },
      }).then((res) => {
        // console.log(res.data);
        that.userLikeSongsInfo = res.data;
      });
    },
    showUserLikeSongBtn(index) {
      for (let i = 0; i < this.userLikeSongsInfo.length; i++) {
        // this.songList[index].songId
        if (this.songList[index].songId === this.userLikeSongsInfo[i].songId) {
          return true;
        }
      }
      return false;
    },
    requestUpdateListName() {
      const that = this;
      axios({
        url: "http://localhost:8081/updateUserListName",
        params: {
          newUserListName: that.ListInfo.userListName,
          userListId: that.userListId,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    requestUpdateListText() {
      const that = this;
      axios({
        url: "http://localhost:8081/updateUserListText",
        params: {
          newUserListText: that.ListInfo.userListText,
          userListId: that.userListId,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserListId() {
      this.userListId = this.$route.params.userListId;
      // console.log(this.userListId);
    },
    requestUserListInfo(userListId) {
      // alert("getUserListInfo()")
      const that = this;
      axios({
        url: "http://localhost:8081/selectUserListByListId",
        params: {
          userListId: userListId,
        },
      })
        .then((res) => {
          that.ListInfo = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    requestListSongInfo(userListId) {
      let that = this;

      if (this.userListId !== "") {
        axios({
          url: "http://localhost:8081/LookListSong" + "/" + userListId,
        })
          .then((res) => {
            that.songList = res.data;
            // console.log(res);
            // console.log(that.songList);
          })
          .catch((err) => {
            console.log("错误" + err);
          });
      } else {
        alert("请先登录");
      }
    },
    test1() {
      console.log(this.$route.params.userListId);
    },
    getDataByimgUrl() {
      this.imgUrl = this.$store.state.imgUrl;
      // console.log(this.$store.state.imgUrl);
    },
    updateImgUrl() {
      // console.log(this.ListInfo);
      // this.$store.commit("updateImgUrl",this.ListInfo.userListImgUrl)
    },
    initTextarea() {
      let updateTextBtn = document.querySelector("#updateTextBtn");
      let textarea = document.querySelector("textarea");
      textarea.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
          updateTextBtn.click();
          textarea.blur();
          updateTextBtn.className = "none";
        }
      });
    },
    initRequestInput() {
      let updateListNameBtn = document.querySelector("#updateListNameBtn");
      let input = document.querySelector("#updateListNameInput");
      input.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
          updateListNameBtn.click();
          input.blur();
          updateListNameBtn.className = "none";
        }
      });
    },
    showUpdateListNameBtn() {
      // const updateTextBtn = document.getElementById("updateTextBtn")
      const updateListNameBtn = document.querySelector("#updateListNameBtn");
      // console.log(updateTextBtn);
      const input = document.querySelector("#updateListNameInput");
      // console.log(textarea);
      input.onfocus = () => {
        console.log("获得焦点");
        updateListNameBtn.className = "inline_block";
      };
    },
    showUpdateTextBtn() {
      // const updateTextBtn = document.getElementById("updateTextBtn")
      const updateTextBtn = document.querySelector("#updateTextBtn");
      // console.log(updateTextBtn);
      const textarea = document.querySelector("textarea");
      // console.log(textarea);
      textarea.onfocus = () => {
        console.log("获得焦点");
        updateTextBtn.className = "inline_block";
      };
    },
    updatePlayUrl(newPlayUrl) {
      // console.log(this.$store.state.playURL);
      // console.log(newPlayUrl);
      if(this.$store.state.playURL == newPlayUrl){
        return null
      }
      this.$store.commit("updatePlayUrl", newPlayUrl);
      if(this.$store.state.audioState === true){
        this.stateAudio();
      }
      console.log("Vuex更新完成，playUrl:" + this.$store.state.playURL);
      // this.showPlayStateBtn(index)
    },
    showPlayStateBtn(index) {
      this.stateAudio();
      console.log("播放状态："+this.$store.state.audioState);
      let pauseBtn = document.querySelectorAll(".songName_btn>.pauseSongBtn")[
        index
      ];
      // console.log(pauseBtn);
      let playBtn = document.querySelectorAll(".songName_btn>.playSongBtn")[
        index
      ];
      // console.log(playBtn);
      for(index in this.songList){
        // console.log(index);
        document.querySelectorAll(".songName_btn>.playSongBtn")[index].className = "playSongBtn"
        document.querySelectorAll(".songName_btn>.pauseSongBtn")[index].className = "pauseSongBtn none"
      }
      if (this.$store.state.audioState !== true) {
        
        playBtn.className = "playSongBtn";
        pauseBtn.className = "pauseSongBtn none";
      } else {
        pauseBtn.className = "pauseSongBtn";
        playBtn.className = "playSongBtn none";
        // this.$store.commit("updateContinuePlayFlag")
      }

    },
    stateAudio() {
      this.$store.commit("updateAudioState");
    },
  },
  computed: {
    getImgUrl() {
      return require("../../../../assets/img/main/" + this.imgUrl);
    },
  },
};
</script>
<style scoped>
.userList_father {
  float: left;
}
* {
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  padding: 0;
  list-style: none;
}
@font-face {
  font-family: "icomoon";
  src: url("../../../../assets/fonts/icomoon.eot?9c4za7");
  src: url("../../../../assets/fonts/icomoon.eot?9c4za7#iefix")
      format("embedded-opentype"),
    url("../../../../assets/fonts/icomoon.ttf?9c4za7") format("truetype"),
    url("../../../../assets/fonts/icomoon.woff?9c4za7") format("woff"),
    url("../../../../assets/fonts/icomoon.svg?9c4za7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
#userList_father {
  width: 82%;
  height: 500px;
  /* background: rgba(0, 0, 0, 0.05); */
  float: right;
  /* margin-left: 2; */
}
.list_info_text > input {
  border: none;
  background: none;
  outline: none;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
}
.list_songs::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  scrollbar-arrow-color: red;
}
.list_songs::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
  scrollbar-arrow-color: red;
}
.list_songs::-webkit-scrollbar-track {
  background: none;
  border-radius: 0;
}
.list_info {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  /* background: sandybrown; */
}
.list_info > img {
  width: 200px;
  height: 200px;
  display: block;
  margin-left: 50px;
  float: left;
  border-radius: 10px;
}
.list_info > .list_info_text {
  height: 200px;
  float: left;
  margin-left: 50px;
}
#updateTextBtn,
#updateListNameBtn {
  background: none;
  border: none;
  font-size: 15px;
  font-family: "icomoon";
}
#updateTextBtn:hover,
#updateListNameBtn:hover {
  background: rgba(0, 0, 0, 0.2);
}
.userSongListText {
  border: none;
  background: none;
  outline: none;
  font-size: 18px;
  width: 500px;
  height: 50px;
  overflow: auto;
  overflow-x: none;
  resize: none;
}
.userSongListText::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  scrollbar-arrow-color: red;
}
.userSongListText::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
  scrollbar-arrow-color: red;
}
.userSongListText::-webkit-scrollbar-track {
  background: none;
  border-radius: 0;
}
.list_info_btn {
  margin-top: 50px;
}
.list_btn {
  margin-top: 20px;
}
.list_btn_songs {
  border: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: 50px;
}
.list_song_top {
  width: 95%;
  /* height: 50px; */
  margin: 0 auto;
  margin-top: 10px;
}
.list_songs {
  width: 95%;
  height: 240px;
  margin: 0 auto;
  /* background-color: salmon; */
  overflow-y: auto;
}
.list_songs > ul > li {
  height: 40px;
}
.list_songs > ul > li > div > button {
  /* display: inline-block; */
  font-family: "icomoon";
  background: none;
  border: none;
  font-size: 15px;
  padding: 10px 0;
  margin-left: 10px;
  float: left;
}
.songName {
  width: 40%;
  height: 100%;
  float: left;
  /* padding-left: 20px; */
}
.singerName {
  width: 30%;
  height: 100%;
  float: left;
}
.specialName {
  width: 30%;
  height: 100%;
  float: left;
}
.songName_btn {
  float: right;
  padding-right: 10px;
}
.songName_btn > button {
  float: right;
  font-family: "icomoon";
  font-size: 20px;
  background: none;
  border: none;
  font-size: 20px;
  margin-top: 12px;
  margin-right: 15px;
  color: rgba(0, 0, 0, 0.6);
}
.list_info_btn > button {
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  padding: 5px 10px;
  border-radius: 2.5px;
}
.list_info_btn > button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.none {
  display: none;
}
.block {
  display: block;
}
.inline_block {
  display: inline-block;
}
</style>
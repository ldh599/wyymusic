<template>
  <div id="userLikeSongs">
    <h1>我喜欢</h1>
    <div id="btnBox" style="margin-left: 50px; margin-top: 20px">
      <button>歌曲 {{ userLikeSongsInfo.length }}</button>
      <button>歌单</button>
      <button>专辑</button>
      <button>视频</button>
    </div>

    <div class="list_songs">
      <ul>
        <li>
          <div class="songName">歌曲</div>
          <div class="singerName">歌手</div>
          <div class="specialName">专辑</div>
        </li>
        <li v-for="(info, index) in userLikeSongsInfo" :key="index">
          <div class="songName">
            <button
              title="不喜欢了"
              style="font-size: 25px; color: rgb(194, 0, 0)"
              @click="requestDelLikeSong(userId, info.songId)"
            >
              
            </button>
            <button>{{ info.songName }}</button>
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
              <button></button>
            </div>
          </div>
          <div class="singerName">
            <button>{{ info.singerName }}</button>
          </div>
          <div class="specialName">
            <button>{{ info.specialName }}</button>
          </div>
        </li>
      </ul>
    </div>
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
import AddSongToListWindow from "../../../popupWindews/addSongToListWindow";
import axios from "axios";

export default {
  name: "userLikeSongs",
  data() {
    return {
      userId: "",
      userLikeSongsInfo: [],
      showAddSongToListWindow: false,
      getAddSongToListWindowData: { userSongList: [], songId: "" },
    };
  },
  components: {
    AddSongToListWindow,
  },
  created() {
    this.initUserId();
    this.requestUserLikeSongsInfo(this.userId);
  },
  methods: {
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
    initUserId() {
      this.userId = this.$store.state.userInfo.userId;
    },
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
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  margin-top: 20px;
  margin-left: 50px;
}
#userLikeSongs {
  float: right;
  width: 82%;
  height: 500px;
}
#btnBox > button {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: bisque;
  text-align: center;
  padding: 5px 15px;
}
.list_songs > ul > li {
  width: 98%;
  height: 40px;
  margin-left: 10px;
}

.list_songs {
  width: 99%;
  height: 350px;
  margin: 0 auto;
  /* background-color: salmon; */
  overflow-y: auto;
  margin-left: 50px;
  margin-top: 20px;
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
</style>
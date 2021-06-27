<template>
  <div id="recommend">
    <div>
      <h2>Hi {{ userName }} 今日为您推荐</h2>
    </div>
    <div>
      <ul class="todayRecommend">
        <li>
          <img src="../../../../assets/img/main/zly.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/zl.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/gblf.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/tl.png" alt="" />
        </li>
      </ul>
    </div>
    <div>
      <ul id="todayRecommendText">
        <li>每日歌手</li>
        <li>最新歌曲</li>
        <li>推荐专辑</li>
        <li>外文音乐</li>
      </ul>
    </div>

    <div style="margin-top: 50px"><h2>歌单补给站</h2></div>
    <div>
      <ul class="todayRecommend">
        <li>
          <img src="../../../../assets/img/main/zl2.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/tl2.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/cyx2.png" alt="" />
        </li>
        <li>
          <img src="../../../../assets/img/main/zl3.png" alt="" />
        </li>
        <!-- <li>
          <img src="../../../../assets/img/main/qwt.png" alt="" />
        </li> -->
      </ul>
    </div>
    <div>
      <ul id="todayRecommendText">
        <li>赵雷 - 成都</li>
        <li>泰勒 - love</li>
        <li>陈奕迅 - rice & shine</li>
        <li>赵雷 - 理想</li>
        <!-- <li>没有什么不同</li> -->
      </ul>
    </div>
    <div style="margin-top: 20px; width: 75%; height: 40px">
      <h2 style="float: left">随机爆款</h2>
      <button id="exchageBtn" @click="requestFiveSongs">换一换 </button>
    </div>

    <div class="list_songs" style="margin-top: 20px">
      <ul>
        <!-- 循环出来的音乐 -->
        <li v-for="(info, index) in fiveSongInfo" :key="index">
          <div class="songName">
            <button
              title="喜欢"
              style="font-size: 25px"
              v-show="!showUserLikeSongBtn(index)"
              @click="requestAddLike(userId, info.songId)"
            >
              
            </button>
            <button
              title="不喜欢了"
              style="font-size: 25px; color: rgb(194, 0, 0)"
              v-show="showUserLikeSongBtn(index)"
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
const axios = require("axios");
export default {
  name: "recommend",
  data() {
    return {
      userId: "",
      userName: "ldh",
      fiveSongInfo: [],
      userLikeSongsInfo: [],
      showAddSongToListWindow: false,
      getAddSongToListWindowData: { userSongList: [], songId: "123" },
    };
  },
  components: {
    AddSongToListWindow,
  },
  created() {
    this.getUserId();
    this.requestFiveSongs();
    this.requestUserLikeSongsInfo(this.userId);
  },
  mounted() {
    this.moveRecommentImg();
  },
  methods: {
    getSongId(songId) {
      this.getAddSongToListWindowData.songId = songId;
    },
    showAddSongToListWindowFun() {
      if(this.$store.state.userInfo.userId === null){
        alert("请先登录")
      }
      this.showAddSongToListWindow
        ? (this.showAddSongToListWindow = false)
        : (this.showAddSongToListWindow = true);
    },

    getUserId() {
      this.userId = this.$store.state.userInfo.userId;
    },
    //多个页面使用
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
    showUserLikeSongBtn(index) {
      for (let i = 0; i < this.userLikeSongsInfo.length; i++) {
        // this.songList[index].songId
        if (
          this.fiveSongInfo[index].songId === this.userLikeSongsInfo[i].songId
        ) {
          return true;
        }
      }
      return false;
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
    //多个页面使用
    requireAddLikeSong(userId, songId) {
      axios({
        url: "http://localhost:8081/addLikeSong",
        params: {
          userId: userId,
          songId: songId,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    requestFiveSongs() {
      const that = this;
      axios({
        url: "http://localhost:8081/findFiveSong",
        params: {
          userId: null,
        },
      })
        .then((res) => {
          // console.log(res.data);
          that.fiveSongInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moveRecommentImg() {
      const img = document.querySelectorAll(".todayRecommend li");
      // console.log(img);
      for (let i = 0; i < img.length; i++) {
        img[i].style.marginTop = "10px";
        img[i].onmouseover = () => {
          let num = 10;
          let move;
          for (let i = 0; i < img.length; i++) {
            img[i].style.marginTop = "10px";
          }
          move = setInterval(() => {
            num--;
            img[i].style.marginTop = num + "px";
            img[i].onmouseout = () => {
              clearInterval(move);
              img[i].style.marginTop = "10px";
            };
            if (num === 0) {
              clearInterval(move);
            }
          }, 25);
        };
      }
    },
  },
};
</script>

<style scoped>
* {
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
#recommend {
  width: 82%;
  height: 500px;
  float: right;
  overflow-y: auto;
  overflow-x: none;
}
#recommend::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  scrollbar-arrow-color: red;
}
#recommend::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
  scrollbar-arrow-color: red;
}
#recommend::-webkit-scrollbar-track {
  background: none;
  border-radius: 0;
}
h2 {
  /* display: inline; */
  margin-left: 50px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.7);
  /* float: left; */
}
.todayRecommend {
  display: block;
  width: 1200px;
  height: 200px;
  margin-left: 50px;
  margin-top: 20px;
}
.todayRecommend > li {
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 5px 2px 2px rgba(0, 0, 0, 0.3);
  /* margin-top: 10px; */
}
.todayRecommend > li > img {
  width: 200px;
  height: 200px;
  opacity: 1;
}
.todayRecommend > li > img:hover {
  opacity: 0.6;
}
#todayRecommendText {
  display: block;
  width: 1200px;
  height: 20px;
  margin-left: 50px;
  margin-top: 20px;
}
#todayRecommendText > li {
  width: 200px;
  height: 30px;
  float: left;
  margin-right: 20px;
  padding: 5px;
}
.list_songs {
  width: 95%;
  height: 210px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.04);
  /* overflow-y: auto; */
}
.list_songs > ul > li {
  width: 98%;
  height: 40px;
  margin-left: 10px;
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
#exchageBtn {
  float: right;
  margin-top: 10px;
  font-family: "icomoon";
  background: none;
  border: none;
}
#exchageBtn:hover {
  background: rgba(0, 0, 0, 0.08);
}
</style>
<template>
  <div id="main_left_father">
    <div id="main_left_son">
      <ul>
        <li
          @click="
            recommendClick();
            updateVuexImgUrl();
          "
        >
           推荐
        </li>
        <li> 音乐馆</li>
        <li> 视频MV</li>
        <li> 电台</li>
      </ul>
      <p>在线音乐</p>
      <ul class="box1">
        <li @click="pushToLike"> 我喜欢</li>
        <li> 本地下载</li>
        <li> 播放历史</li>
        <li> 试听列表</li>
      </ul>

      <p @click="showUserList" id="userList">
        自建歌单{{ getUserListSun }}
        <button></button>
        <button @click="showAddListInput"></button>
      </p>

      <div id="addListInput" class="none">
        <input type="text" v-model="addNewListName" />
        <!-- <input type="text"> -->
        <div>
          <button @click="addListBtn">创建</button>
        </div>
      </div>
      <!-- 经过请求循环出来的歌单 -->
      <ul class="none" id="listByUser">
        <li
          class="userListByData"
          v-for="(text, index) in userSongList"
          :key="index"
          @click="updateVuexData(index, text.userListId)"
        >
          <!-- <router-link :to="'/userList/' + text.userListId" tag="div">{{
            text.userListName
          }}</router-link> -->
          <div
            style="height: 25px; width: 100%"
            @mouseover="showDelListBtn(index)"
          >
            <span style="float: left">{{ text.userListName }}</span>
            <!-- 删除歌单按钮 -->
            <!-- .stop修饰符阻止事件冒泡 -->
            <button class="none" @click.stop="delListBtnClick(text.userListId)">
              
            </button>
          </div>
        </li>
      </ul>

      <p>
        收藏歌单 {{ getCollectSongListSun }}
        <button></button>
        <button></button>
      </p>
      <ul>
        <!-- <li><router-link to="/userList" tag="button" >ldh</router-link></li> -->
        <li v-for="index in collectSongList" :key="index.listName">
          {{ index.listName }}
        </li>
      </ul>
      <!-- <router-view/> -->
    </div>
    <div id="popupWindow" class="none">
      <h3>您真的要删除我了吗？(T T)</h3>
      <div>
        <button>再想想</button>
        <button>你走吧</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mainTop",
  data() {
    return {
      userId: "",

      showUserListFlag: false,
      userSongListSun: 0,
      addNewListName: "新建歌单",
      userSongList: [],
      collectSongList: [
        { listName: "李元垚" },
        { listName: "祁嘉磊精选" },
        { listName: "中国新说唱" },
        { listName: "明日之子" },
        { listName: "说唱精选" },
        { listName: "张家豪精选" },
        { listName: "好听的欧美歌曲" },
        { listName: "陈奕迅" },
        { listName: "权志龙top20" },
      ],
      nextListId: "",
      showDelListBtnFlag: false,
    };
  },
  created() {
    this.getUserId();
    this.requestUserListData(this.userId);
  },
  methods: {
    pushToLike() {
      if (this.$store.state.userInfo.userId !== null) {
        this.$router.push("/likeSongs");
      } else {
        alert("请先登录");
      }
    },
    recommendClick() {
      this.$router.push("/");
    },
    getUserId() {
      if (this.$store.state.userId !== null) {
        this.userId = this.$store.state.userInfo.userId;
      }
      // console.log(this.userId);
    },
    requestUserListData(userId) {
      if (this.userId === "") {
        console.log("未登录！");
        return null;
      }
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
    delRouter() {
      this.$router.push("http://localhost:8081/");
    },
    showAddListInput() {
      const addListInput = document.getElementById("addListInput");
      // console.log(addListInput);
      this.$store.state.userInfo.userId === null
        ? alert("请先登录")
        : (addListInput.className = "block");
    },
    hiddenAddListInput() {
      const addListInput = document.getElementById("addListInput");
      // console.log(addListInput);
      this.$store.state.userInfo.userId === null
        ? alert("请先登录")
        : (addListInput.className = "none");
    },
    requestAddList() {
      const that = this;
      // alert("增加成功")
      if (this.userId !== "") {
        axios({
          url: "http://localhost:8081/addNewUserList",
          params: {
            userListId:
              that.userId + document.querySelectorAll("#listByUser>li").length,
            userListName: that.addNewListName,
            userId: that.userId,
            userListImgUrl: "music.jpg",
            userListSun: document.querySelectorAll("#listByUser>li").length,
          },
        })
          .then((res) => {
            // console.log(res.data);
            that.userSongList = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("请先登录");
      }
    },
    addListBtn() {
      if (this.userId !== "") {
        if (this.addNewListName !== "") {
          this.requestAddList();
          this.hiddenAddListInput();
        } else {
          alert("歌单名字不能为空");
        }
      } else {
        alert("请先登录");
      }
    },

    showUserList() {
      const listByUser = document.getElementById("listByUser");
      const userList = document.getElementById("userList");
      if (this.$store.state.userInfo.userId !== "") {
        if (this.showUserListFlag === false) {
          listByUser.className = "block";
          this.showUserListFlag = true;
        } else {
          listByUser.className = "none";
          this.showUserListFlag = false;
        }
      } else {
        alert("请先登录");
      }
    },
    updateVuexImgUrl() {
      this.$store.commit("updateImgUrl", "music.jpg");
    },
    updateVuexData(index, userListId) {
      this.$store.commit(
        "updateImgUrl",
        this.userSongList[index].userListImgUrl
      );
      console.log(this.$store.state.imgUrl + " " + "left");
      console.log(userListId);
      this.userId !== ""
        ? this.$router.push("/userList/" + userListId)
        : alert("请先登录");
    },
    showDelListBtn(index) {
      let delListBtn = document.querySelectorAll(".userListByData>div>button");
      let userListByData = document.getElementsByClassName("userListByData");
      // console.log(delListBtn);
      // console.log( userListByData);
      for (let i = 0; i < index + 1; i++) {
        for (let i = 0; i < userListByData.length; i++) {
          delListBtn[i].className = "none";
        }
        delListBtn[i].className = "block";
      }
    },
    requestDelUserList(userListId, userId) {
      let that = this;
      axios({
        url: "http://localhost:8081/delUserListById",
        params: {
          userListId: userListId,
          userId: userId,
        },
      })
        .then((res) => {
          console.log(res.data);
          that.userSongList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delListBtnClick(userListId) {
      // alert("确定删除这个歌单吗？")
      let popupWindow = document.getElementById("popupWindow");
      let popupWindowBtn = document.querySelectorAll("#popupWindow button");
      // console.log(popupWindow);
      // console.log( popupWindowBtn);
      popupWindow.className = "block";
      popupWindowBtn[0].onclick = () => {
        popupWindow.className = "none";
      };
      // console.log(userListId);
      popupWindowBtn[1].onclick = () => {
        // console.log(userListId);
        // console.log(this.$route.params.userListId);
        this.requestDelUserList(userListId, this.userId);
        if (userListId === this.$route.params.userListId) {
          this.$router.push("/userList");
        }
        popupWindow.className = "none";
      };
    },
  },
  computed: {
    getUserListSun() {
      return this.userSongList.length;
    },
    getCollectSongListSun() {
      return this.collectSongList.length;
    },
    watchUserLogin() {
      return this.$store.state.userInfo.userId;
    },
  },
  watch: {
    watchUserLogin() {
      console.log("已登录");
      const addListInput = document.getElementById("addListInput");
      addListInput.className = "none"
      this.getUserId();
      this.requestUserListData(this.userId);
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
  src: url("../../../assets/fonts/icomoon.eot?9c4za7");
  src: url("../../../assets/fonts/icomoon.eot?9c4za7#iefix")
      format("embedded-opentype"),
    url("../../../assets/fonts/icomoon.ttf?9c4za7") format("truetype"),
    url("../../../assets/fonts/icomoon.woff?9c4za7") format("woff"),
    url("../../../assets/fonts/icomoon.svg?9c4za7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
#main_left_father {
  float: left;
  width: 18%;
  height: 500px;
  overflow-y: auto;
  /* background-color: blanchedalmond; */
  background: rgba(0, 0, 0, 0.1);
}
#main_left_father::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  scrollbar-arrow-color: red;
}
#main_left_father::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.08);
  scrollbar-arrow-color: red;
}
#main_left_father::-webkit-scrollbar-track {
  background: none;
  border-radius: 0;
}
#main_left_son {
  width: 80%;
  /* height: 500px; */
  /* background-color: burlywood; */
  position: relative;
  left: 50%;
  /* margin-left: -100px; */
  margin-left: -40%;
}
p {
  display: inline-block;
  font-size: 10px;
  margin-top: 30px;
  width: 100%;
}
p > button {
  background: none;
  border: none;
  font-family: "icomoon";
  float: right;
  font-size: 18px;
  margin-right: 10px;
}
.box1 > li {
  margin-top: 10px;
  font-weight: 520;
  font-family: "icomoon";
}
#main_left_son > ul > li {
  display: block;
  margin-top: 10px;
  font-weight: 520;
  font-family: "icomoon";
}

#main_left_son > ul > li:hover,
p > button:hover {
  background: rgba(0, 0, 0, 0.05);
}
#addListInput {
  margin-top: 10px;
}
#addListInput > input {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 3px 5px;
  outline: none;
}
#addListInput > div > button {
  margin-top: 5px;
  padding: 0 10px;
}
.none {
  display: none;
}
.block {
  display: block;
}
.userListByData > div > button {
  font-family: "icomoon";
  float: right;
  width: 21px;
  height: 21px;
  padding: 1px 1px;
  background: none;
  border: none;
}
#popupWindow {
  width: 400px;
  height: 200px;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -200px;
  border-radius: 10px;
}
#popupWindow > h3 {
  text-align: center;
  margin-top: 50px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
}
#popupWindow button {
  padding: 4px 3px;
  background: rgba(80, 214, 255, 0.6);
  border: 1px solid rgba(19, 112, 141, 0.8);
  border-radius: 5px;
}
#popupWindow button:hover {
  background: rgba(53, 147, 175, 0.6);
}
#popupWindow > div {
  position: absolute;
  bottom: 25px;
  right: 25px;
}
</style>
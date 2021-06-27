<template>
  <div>
    <div id="father_top">
      <div class="top_left">
        <div><img src="../../assets/img/top/logo.png" alt="" /></div>
      </div>
      <div class="top_right">
        <div class="top_right_btn">
          <div style="float: left"><</div>
          <div style="float: right">></div>
        </div>

        <div class="top_right_input">
          <input type="text" placeholder="输入搜索内容" />
        </div>

        <div class="top_right_op">
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div style="float: right" id="loginBtn">
          <button @click="clickLoginBtnShowWindow()" v-if="!loginFlag">
            登录
          </button>
          <button v-if="!loginFlag">注册</button>
          <button v-if="loginFlag" @click="logout">退出</button>
        </div>
        <div></div>
        <div class="top_right_user">
          <img src="../../assets/img/top/user.png" alt="" />
          <p>{{ userName }}</p>
        </div>
      </div>
    </div>

    <login-window
      class="loginWindow"
      v-if="showLoginWindow"
      @clickLoginBtnShowWindow="clickLoginBtnShowWindow"
      @showLoginBtn="showLoginBtn"
    >
      <div class="register" @click="clickLoginBtnShowWindow()">
        <h4>返回</h4>
      </div>
    </login-window>
  </div>
</template>
<script>
import axios from "axios";
import loginWindow from "../popupWindews/login.vue";
export default {
  name: "top",
  data() {
    return {
      userName: null,
      showLoginWindow: false,
      loginFlag: false,
    };
  },
  components: {
    loginWindow,
  },
  methods: {
    showLoginBtn() {
      this.loginFlag = !this.loginFlag;
    },
    logout() {
      this.showLoginBtn();
      this.$store.commit("updateUserInfo", [null, null]);
      this.$router.push("/")
    },
    clickLoginBtnShowWindow() {
      this.showLoginWindow = !this.showLoginWindow;
      // console.log("触发clickLoginBtnShowWindow");
    },

    getUserName() {
      this.userName = this.$store.state.userInfo.userName;
    },
  },
  computed: {
    watchLogin() {
      return this.$store.state.userInfo.userId;
    },
  },
  watch: {
    watchLogin() {
      this.getUserName();
      console.log(this.$store.state.userInfo);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../../assets/fonts/icomoon.eot?9c4za7");
  src: url("../../assets/fonts/icomoon.eot?9c4za7#iefix")
      format("embedded-opentype"),
    url("../../assets/fonts/icomoon.ttf?9c4za7") format("truetype"),
    url("../../assets/fonts/icomoon.woff?9c4za7") format("woff"),
    url("../../assets/fonts/icomoon.svg?9c4za7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

#father_top {
  width: 100%;
  height: 80px;
  /* background-color: blanchedalmond; */
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
}

.top_left {
  /* margin-left: 20px; */
  /* padding: 20px; */
  width: 18%;
  height: 80px;
  float: left;
  /* background-color: blueviolet; */
  background-color: rgba(0, 0, 0, 0.1);
}

.top_left div {
  position: absolute;
  top: 50%;
  margin-top: -25px;
}

#father_top > .top_left > div > img {
  width: 200px;
  height: 50px;
  position: relative;
}

.top_right {
  height: 80px;
  width: 80%;
  /* background-color: brown; */
  float: right;
}

.top_right_btn {
  width: 10%;
  height: 40px;
  /* background-color: blue; */
  position: relative;
  top: 50%;
  margin-top: -20px;
  margin-left: 5%;
  float: left;
}

.top_right_btn div {
  width:50%;
  height:50%;
  text-align: center;
  font-size: 150%;
  font-weight: 600;
}

.top_right_input {
  width: 15%;
  height: 20px;
  float: left;
  margin-left: 15%;
  position: relative;
  top: 50%;
  margin-top: -12.5px;
}

.top_right_input input {
  width: 100%;
  height: 100%;
  outline: none;
  border: rgba(0, 0, 0, 0.6) 1px solid;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  color: seashell;
  padding-left: 20px;
}
.top_right_op {
  height: 80%;
  width: 15%;
  float: right;
  position: relative;
  top: 50%;
  margin-top: -25px;
}
.top_right_op button {
  width: 30%;
  height: 80%;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  font-family: "icomoon";
  font-size: 100%;
  color: white;
  margin-right: 1%;
  border:rgba(0, 0, 0, 0.4) 1px solid;
  opacity: 0.6;
  border-radius: 10%;
}
.top_right_op button:hover{
  opacity: 1;
}
.top_right_user {
  width: 15%;
  height: 100%;
  /* background-color: yellow; */
  float: right;
  position: relative;
  top: 50%;
  margin-top: -20px;
  margin-right: 3%;
}
.top_right_user img {
  width: 23%;
  float: left;
  display: block;
}
.top_right_user p {
  height: 20px;
  width: 80px;
  margin-left: 10px;
  display: block;
  color: white;
  float: left;
}
#loginBtn{
  margin-right: 5%;
  margin-top:2%;
}
#loginBtn>button{
  padding:5px 10px;
  /* position: absolute; */
  color: antiquewhite;
  margin-right:10px;
  background: none;
  border: none;
  border: 1px solid black;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0.6;
}
#loginBtn>button:hover{
  opacity: 1;
}
</style>
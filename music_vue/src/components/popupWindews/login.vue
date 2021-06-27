<template>
  <div class="box">
    <h1>LONGIN</h1>
    <input type="text" name="userNumber" placeholder="Usernumber" v-model="userName" />
    <input type="password" name="userPassword" placeholder="Userpassword" v-model="userPassword" />
    <input class="submit" type="button" name="" value="Longin" @click="login(userName,userPassword)" />
    <slot></slot>
    
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "login",
  data(){
    return {
      userName:null,
      userPassword:null
    }
  },
  methods:{
    clickLoginShowWindow(){
      this.$emit("clickLoginBtnShowWindow");
      console.log("触发父子组件通信");
    },
    login(username,password) {
      const that = this
      axios({
          method:'post',
          url:"http://localhost:8081/login",
          params:{
            userId:username,
            userPassword:password
          }
      }).then(res => {
          // console.log(res.data);
          if(res.data.status === "300"){
            alert("用户名密码错误")
            return
          }
          this.$store.commit("updateUserInfo", [res.data.result.userId, res.data.result.userName]);
          that.clickLoginShowWindow()
          alert("登录成功，欢迎使用！")
          that.$emit("showLoginBtn")
      }).catch(err => {

          console.log(err + "-----");
          // console.log(err.msg);
          // console.log(err.status);
      })
      
    },
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  /* font-family: sans-serif;
            background-color: #34495e; */
}

body h1 {
  color: white;
}

.box {
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: 20px;
}

.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.15s;
  color: white;
}

.box input[type="text"]:hover,
.box input[type="password"]:hover {
  width: 250px;
  border-color: orange;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 280px;
  border-color: chartreuse;
}

.submit {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 30px;
  outline: none;
  border-radius: 24px;
  transition: 0.15s;
  color: paleturquoise;
}

.submit:hover {
  padding: 14px 35px;
  border: 2px solid tomato;
}

.register {
  /* text-decoration: none; */
  border: 0;
  height: 30px;
  width: 35px;
  background: none;
  text-align: center;
  margin: 0 auto;
  outline: none;
  color: paleturquoise;
}

.register:hover {
  color: tomato;
}
</style>
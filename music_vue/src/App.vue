<template>
  <div id="app">
    <top></top>
    <v-main></v-main>
    <v-footer></v-footer>
    <div class="bag">
       <img :src="getImgUrl" alt="">
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import top from "./components/top/top";
import vmain from "./components/main/main";
import vfooter from "./components/footer/footer.vue"
export default {
  name: "App",
  components: {
    top,
    "v-main": vmain,
    "v-footer":vfooter
  },
  data(){
    return {
      imgUrl:this.$store.state.imgUrl
    }
  },
  created(){
    // this.getDataImgUrl()
  },
  // mounted(){
  //   this.getDataImgUrl()

  // },
  methods:{
    getDataImgUrl(){
      // console.log(this.$store.state.imgUrl);
      this.imgUrl = this.$store.state.imgUrl
    }
  },
  computed:{
    getImgUrl(){
      let imgUrl = this.imgUrl
      return require("./assets/img/main/"+imgUrl)
    },
    watchImgUrl(){
      return this.$store.state.imgUrl
    }
  },
  watch:{
    watchImgUrl(){
      this.getDataImgUrl();
    }
  }
};
</script>

<style>
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(255, 255, 255, 0.5);
}
.bag {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  
  background-size: cover;
  filter: blur(100px);
}
.bag>img{
  width: 100%;
  height: 100%;
}

</style>

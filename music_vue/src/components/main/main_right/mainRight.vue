<template>
  <div id="view"><router-view :key="key" /></div>
</template>

<script>
export default {
  name: "mainRight",
  created() {
    this.moveView();
  },
  methods: {
    moveView() {
      const view = document.getElementById("view");
      if (view !== null) {
        // console.log(view);
        let num = 40;
        view.style.marginLeft = num + "px";
        let moveView
        moveView = setInterval(() => {
          num--;
        //   console.log(num);
          view.style.marginLeft = num + "px";
          if(num === 0){
              clearInterval(moveView)
          }
        },1);
      }
    },
  },
  computed: {
    //实现动态路由传递不同数据，后页面刷新
    key() {
      this.moveView();
      return this.$route.name
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
};
</script>

<style scoped>
</style>
<template>
    <div id="popupWindow" class="none">
      <h3>您真的要删除我了吗？(T T)</h3>
      <div>
        <button>再想想</button>
        <button>你走吧</button>
      </div>
    </div>
</template>

<script>
export default {
    name:"delListWindow"
}
</script>

<style scoped>
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
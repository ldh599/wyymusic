<template>
  <div class="vfooter">
    <div class="footer_in">
      <a href="javascript:;" class="music_pre"></a>
      <a href="javascript:;" v-on:click="playSong" class="music_play"></a>
      <a href="javascript:;" class="music_next"></a>

      <div class="music_progress_info">
        <div class="music_progress_top">
          <span class="music_progeess_name">爱情转移</span>
          <span class="music_progeess_time">{{currentTime}} / {{duration}}</span>
        </div>

        <div class="music_progess_bar">
          <div class="music_progress_line">
            <div class="music_progress_dot"></div>
          </div>
        </div>
      </div>
      <a href="javascript:;" class="music_mode">顺序</a>
      <a href="javascript:;" class="music_fav"></a>
      <a href="javascript:;" class="music_down"></a>
      <a href="javascript:;" class="music_comment"></a>
      <a href="javascript:;" class="music_only">纯净</a>

      <div class="music_voice_info">
        <div class="music_voise_btm"></div>

        <div class="music_voise_bar">
          <div class="music_voise_line">
            <div class="music_voise_dot"></div>
          </div>
        </div>
      </div>
    </div>

    <audio controls id="audio" ref="audio">
      <source
        id="audioSource"
        :src="computedSrc"
        ref="audioSource"
        type="audio/mp3"
      />
    </audio>
    <!-- <audio controls ref="audio" src="../../assets/mp3/郭源潮.mp3"></audio> -->
    <!-- <audio id="audio" src="../../assets/mp3/爱情转移.mp3" controls ref="audio"></audio> -->
  </div>
</template>

<script>
export default {
  name: "vfooter",
  data() {
    return {
      playURL: null,
      duration:"00:00",
      currentTime:"00:00"
    };
  },
  mounted(){
    this.getMusicData()
  },
  created() {
    // let PlayBtn = document.getElementsByClassName('playSong')[0]
    // console.log(PlayBtn);
    // this.$refs.SongUrl.src = "../../assets/mp3/爱情转移.mp3"
  },
  methods: {
    initAudio() {
      //失败

      // let audioBtn = document.querySelector("#audioUrl")
      // let that = this
      // setTimeout(function(){
      //   that.$refs.audio.src = "../../assets/mp3/爱情转移.mp3"

      // })

      //失败

      //   console.log("初始化");
      //   this.playUrl = "../../assets/mp3/爱情转移.mp3"
      //   let audioDom =
      //   "<audio controls autoplay>"+
      //   "<source id='audioSource' src='"+this.playUrl +"' type='audio/mp3'>"+
      // "</audio>"
      //   // document.getElementsByClassName("vfooter")[0].append(audioDom)
      //   document.getElementsByClassName("vfooter")[0].innerHTML = audioDom
      //   console.log(audioDom);

      //成功
      // this.playURL = this.$store.state.playURL
      // this.$store.commit("updatePlayUrl","郭源潮.mp3")
      // console.log(this.$store.state.playURL);
      // let audio = document.getElementById("audio")
      this.$refs.audio.load();
      console.log("audio初始化成功");
      // audio.load
      this.$refs.audio.play();
      this.$store.commit("updateAudioState", true);
      console.log("Vuex更新完成，audioState:" + this.$store.state.audioState);
    },
    playSong() {
      //失败
      // let PlayBtn = document.getElementsByClassName('playSong')[0]
      // console.log(PlayBtn);
      // let SongUrl = document.getElementsByClassName('playSong')[1]
      // this.playURL = "../../assets/mp3/爱情转移.mp3"
      //   this.$nextTick(res => {
      //     PlayBtn.load()
      //     PlayBtn.play()
      //   })
      // let that = this
      // new Promise((resolve, reject) => {
      //       that.playURL = "../../assets/mp3/爱情转移.mp3"
      //       resolve()
      //   }).then(() => {
      //     PlayBtn.play()
      //   })
      //失败
      // this.playURL = $store.state.playURL
      // this.$refs.audio.src = $store.state.playURL
    },
    // 计算时间
    getMusicData() {
      const audio = document.getElementById("audio");
      // console.log(this.$refs.audio);
      console.log(this.timeToString(audio.duration));
      this.duration = this.timeToString(audio.duration)
      console.log(audio.duration);
      console.log(audio.currentTime);
      this.currentTime = this.timeToString(audio.currentTime)
      // while (audio.currentTime < audio.duration) {
      //   setTimeout(()=>{
      //     this.currentTime = this.timeToString(audio.currentTime)
      //   },1000)
      // }
    },
    timeToString(param) {
      param = parseInt(param);
      let hh = "",
        mm = "",
        ss = "";
      if (param >= 0 && param < 60) {
        param < 10 ? (ss = "0" + param) : (ss = param);
        return "00:" + ss;
      } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60);
        mm < 10 ? (mm = "0" + mm) : mm;
        param - parseInt(mm * 60) < 10
          ? (ss = "0" + String(param - parseInt(mm * 60)))
          : (ss = param - parseInt(mm * 60));
        return mm + ":" + ss;
      }
    },
  },
  computed: {
    computedSrc() {
      let url = this.playURL;
      if (this.playURL === null) {
        return "";
      }
      return require("../../assets/mp3/" + url);
    },
    watchVuexPlayURL() {
      // console.log(this.$store.state.playURL+"------");
      this.playURL = this.$store.state.playURL;
      return this.$store.state.playURL;
    },
    watchVuexAudioState() {
      return this.$store.state.audioState;
    },
    continuePlay() {
      return this.$store.state.continuePlayFlag;
    },
  },
  watch: {
    watchVuexPlayURL(newPlayURL, oldPlayURL) {
      console.log("新的歌曲：" + newPlayURL);
      this.playURL = newPlayURL;
      // this.initAudio()
      this.$store.commit("updateAudioState", true);
      console.log("播放：" + newPlayURL);

      new Promise((resolve, reject) => {
        this.$refs.audio.load();
        this.$refs.audio.play();
        this.$store.commit("updateAudioState")
        setTimeout(() => {
          resolve()
        },200)
        
      }).then(() => {
        console.log("----------");
        this.getMusicData();
      });
    },
    watchVuexAudioState() {
      if (this.$store.state.audioState === true) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    continuePlay() {
      this.$refs.audio.play();
      // this.getMusicDuration()
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot?ecf4fq");
  src: url("fonts/icomoon.eot?ecf4fq#iefix") format("embedded-opentype"),
    url("fonts/icomoon.ttf?ecf4fq") format("truetype"),
    url("fonts/icomoon.woff?ecf4fq") format("woff"),
    url("fonts/icomoon.svg?ecf4fq#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.vfooter {
  width: 100%;
  height: 60px;
  /* background-color: plum; */
  position: absolute;
  left: 0;
  bottom: 0;
}

.footer_in {
  width: 1200px;
  height: 60px;
  /* background-color: rosybrown; */
  margin: 0 auto;
}

.footer_in a {
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;

  margin-top: 10px;
}

.music_pre {
  font-family: "icomoon";
  font-size: 35px;
  width: 30px;
  height: 30px;
}

.music_play {
  font-family: "icomoon";
  font-size: 35px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.music_next {
  font-family: "icomoon";
  font-size: 35px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.music_progress_info {
  width: 50%;
  height: 30px;
  /* background-color: bisque; */
  display: inline-block;
}
.music_mode {
  width: 40px;
  height: 40px;

  text-align: center;
}

.music_fav {
  font-family: "icomoon";
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.music_down {
  font-family: "icomoon";
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.music_comment {
  font-family: "icomoon";
  font-size: 25px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.music_only {
  width: 40px;
  height: 30px;
}
.music_voice_info {
  width: 200px;
  height: 30px;
  margin-left: 47px;
  /* background-color: bisque; */
  display: inline-block;
}
.music_progress_top {
  width: 100%;
  height: 30px;
}
.music_progeess_name {
  float: left;
  color: rgba(0, 0, 0, 0.5);
}
.music_progeess_time {
  float: right;
  color: rgba(0, 0, 0, 0.5);
}
.music_progess_bar {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.5);
}
.music_progress_line {
  width: 100px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.music_progress_dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  top: -5px;
  left: 100px;
}
.music_voise_btm {
  width: 30px;
  height: 30px;
  font-family: "icomoon";
  font-size: 26px;
  float: left;
  color: rgba(0, 0, 0, 0.5);
}
.music_voise_bar {
  width: 170px;
  height: 4px;
  float: right;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 12px;
}
.music_voise_line {
  width: 100px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.music_voise_dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  top: -5px;
  left: 100px;
}
</style>
<template>
  <div class="random_pinyin" @click="refresh()">
    <span>{{ pinyin }}</span>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="read" style="width: 100%;" type="success">读</el-button>
    <audio ref="audio">
      <source :src="video" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import allPinyin from "@/assets/pinyin/allPinyin.json"

export default {
  data() {
    return {
      pinyin: "",
      video: ""
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      const length = allPinyin.data.length;
      let index = Math.floor(Math.random() * 1000) % length;
      const currentPinyin = allPinyin.data[index]
      this.pinyin = currentPinyin.show;
      this.video = "https://tungsword.github.io/child/pinyin/video/" + currentPinyin.video;
    },
    read() {
      this.$refs.audio.load();
      this.$refs.audio.play();
    }
  }
}

</script>

<style lang="less" scoped>
.random_pinyin {
  font-size: 100px;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
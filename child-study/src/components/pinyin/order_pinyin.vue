<template>
  <div class="order_pinyin" @click="refresh()">
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
      video: "",
      index: 0
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      if (this.index > allPinyin.data.length) {
        this.index = 0;
      }
      const currentPinyin = allPinyin.data[this.index]
      this.pinyin = currentPinyin.show;
      this.video = "https://tungsword.github.io/child/pinyin/video/" + currentPinyin.video;
      this.index++;
    },
    read() {
      this.$refs.audio.load();
      this.$refs.audio.play();
    }
  }
}

</script>

<style lang="less" scoped>
.order_pinyin {
  font-size: 100px;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
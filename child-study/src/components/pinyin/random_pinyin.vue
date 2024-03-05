<template>
  <div class="random_pinyin" @click="refresh()">
    <span>{{ pinyin }}</span>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="read" style="width: 100%;" type="primary">读</el-button>
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
      const audio = new Audio(this.video);
      audio.play();
    }
  }
}

</script>

<style lang="less" scoped>
.random_pinyin {
  font-size: 100px;
  width: 100%;
  text-align: center;
}
</style>
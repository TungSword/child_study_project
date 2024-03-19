<template>
  <div class="random_pinyin" @click="refresh()">
    <span>{{ pinyin }}</span>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="read" style="width: 100%;" type="primary">读</el-button>
  </div>
</template>

<script>
import {getAllPinyin, getPinyinVoiceCacheUrl} from "@/util/resource.js";
import {ref} from "vue";

const allPinyin = ref();

export default {
  data() {
    return {
      pinyin: "",
      video: "",
    }
  },
  async mounted() {
    allPinyin.value = await getAllPinyin()
    this.refresh();
  },
  methods: {
    refresh() {
      const length = allPinyin.value.data.length;
      let index = Math.floor(Math.random() * 1000) % length;
      const currentPinyin = allPinyin.value.data[index]
      this.pinyin = currentPinyin.show;
      this.video = currentPinyin.video;
    },
    read() {
      getPinyinVoiceCacheUrl(this.video).then(url => {
        const audio = new Audio(url);
        audio.play();
      })
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
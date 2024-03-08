<template>
  <div class="random_pinyin" @click="refresh()">
    <span>{{ pinyin }}</span>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="read" style="width: 100%;" type="primary">读</el-button>
  </div>
</template>

<script>
import resource from "@/util/resource.js";
import {getPinyinVoiceUrl} from "@/constant/resource_constant.js";
import {ref} from "vue";

const allPinyin = ref();

export default {
  data() {
    return {
      pinyin: "",
      video: ""
    }
  },
  async mounted() {
    allPinyin.value = await resource.getAllPinyin()
    this.refresh();
  },
  methods: {
    refresh() {
      const length = allPinyin.value.data.length;
      let index = Math.floor(Math.random() * 1000) % length;
      const currentPinyin = allPinyin.value.data[index]
      this.pinyin = currentPinyin.show;
      this.video = getPinyinVoiceUrl(currentPinyin.video)
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
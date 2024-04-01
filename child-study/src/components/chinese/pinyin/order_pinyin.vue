<template>
  <div class="order_pinyin" @click="refresh()">
    <span>{{ pinyin }}</span>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-button @click="read" style="width: 100%;" type="primary">读</el-button>
    </el-col>
    <el-col :span="12">
      <el-button @click="refresh" style="width: 100%;">下一个</el-button>
    </el-col>
  </el-row>
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
      index: 0,
    }
  },
  async mounted() {
    allPinyin.value = await getAllPinyin()
    this.refresh();
  },
  methods: {
    refresh() {
      if (this.index >= allPinyin.value.data.length) {
        this.index = 0;
      }
      const currentPinyin = allPinyin.value.data[this.index]
      this.pinyin = currentPinyin.show;
      this.video = currentPinyin.video;
      this.index++;
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
.order_pinyin {
  font-size: 100px;
  width: 100%;
  text-align: center;
  height: calc(100vh - 200px);
}
</style>
<template>
  <el-button type="primary" style="width: 100%" @click="palyAllVideo">{{ button_name }}</el-button>
  <el-row gutter="20" style="margin-top: 20px;">
    <el-col :span="6" v-for="(letter, i) in all_letters" :key="i">
      <el-card :id="`eng_char_${letter}`" @click.stop="readVideo(letter)"
               style="margin-bottom: 20px; text-align: center;" :class="{select_letter: i === index-1}">
        <span style="margin-right: 8px; font-size: 20px">
           {{ letter.toUpperCase() }}
        </span>
        <span>{{ letter }}</span>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import {ref, onBeforeUnmount} from "vue";
import {getEnglishLetterUrl} from "@/constant/resource_constant.js"

const all_letters = [
  "a", "b", "c", "d",
  "e", "f", "g", "h",
  "i", "j", "k", "l",
  "m", "n", "o", "p",
  "q", "r", "s", "t",
  "u", "v", "w", "x",
  "y", "z"
]
const palyInterval = ref();
const index = ref(0);
const button_name = ref("自动播放")
const audio = new Audio();

function palyAudio(url) {
  audio.src = url;
  audio.load();
  audio.play();
}

onBeforeUnmount(() => {
  clearInterval(palyInterval.value)
})

function readVideo(letter) {
  if (button_name.value === "自动播放") {
    const url = getEnglishLetterUrl(letter)
    palyAudio(url);
  }
}

function palyAllVideo() {
  if (button_name.value === "自动播放") {
    button_name.value = "停止播放"
    palyInterval.value = setInterval(() => {
      if (index.value >= all_letters.length) {
        index.value = 0;
      }
      const url = getEnglishLetterUrl(all_letters[index.value]);
      palyAudio(url)
      index.value++;
    }, 2000)
  } else {
    clearInterval(palyInterval.value);
    button_name.value = "自动播放"
  }
}
</script>

<style lang="less" scoped>
.select_letter {
  background-color: #999999;
  color: #FFFFFF;
}
</style>

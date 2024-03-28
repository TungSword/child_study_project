<template>
  <div class="classify_pinyin">
    <el-row  v-for="(classify, i) in pinyin" :key="i" :gutter="20">
      <el-col :span="24" style="margin-bottom: 20px">
        <span style="height: 60px;margin-right: 10px">{{ classify.name }}</span>
        <el-button @click="playAllAudio(i)" type="primary">{{ button_name[i] }}</el-button>
      </el-col>
      <el-col :span="6" v-for="(item, j) in classify.data" :key="j">
        <el-card @click.stop="readVideo(item.video)" style="margin-bottom: 20px; text-align: center"
                 :class="{select_pinyin: i === index && j === jIndex - 1}">
              <span>
                {{ item.show }}
              </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getClassifyPinyin, getPinyinVoiceCacheUrl} from "@/util/resource.js";

const pinyin = ref()
const audio = new Audio();
const button_name = ref([])
const playInterval = ref()
const index = ref(0);
const jIndex = ref(0);
const playStatus = ref(false);
const isPlayNext = ref(true);

onMounted(async () => {
  const classifyPinyin = await getClassifyPinyin()
  pinyin.value = classifyPinyin.data
  for (let i = 0; i < pinyin.value.length; i++) {
    button_name.value.push("自动播放")
  }
})

onBeforeUnmount(() => {
  clearInterval(playInterval.value)
})

function readVideo(video) {
  if (button_name.value[index.value] === "自动播放") {
    getPinyinVoiceCacheUrl(video).then(url => {
      palyAudio(url)
    })
  }
}

function playAllAudio(i) {
  if (playStatus.value && i !== index.value) {
    clearInterval(playInterval.value)
    button_name.value[index.value] = "自动播放"
  }
  index.value = i
  jIndex.value = 0;
  if (button_name.value[index.value] === "自动播放") {
    playStatus.value = true;
    button_name.value[index.value] = "停止播放"
    playInterval.value = setInterval(() => {
      if (isPlayNext.value) {
        isPlayNext.value = false;
        if (jIndex.value >= pinyin.value[index.value].data.length) {
          jIndex.value = 0;
        }
        const currentVideo = pinyin.value[index.value].data[jIndex.value].video;
        getPinyinVoiceCacheUrl(currentVideo).then(url => {
          palyAudio(url)
          setTimeout(() => {
            isPlayNext.value = true;
          }, 1000)
        })
        jIndex.value++
      }
    }, 1000)
  } else if (button_name.value[index.value] === "停止播放") {
    clearInterval(playInterval.value)
    button_name.value[index.value] = "自动播放"
    playStatus.value = false;
  }
}

function palyAudio(url) {
  audio.src = url;
  audio.load();
  audio.play();
}
</script>


<style lang="less" scoped>
.classify_pinyin {
  height: calc(100vh - 140px);
  font-size: 30px;

  span {
    font-size: 20px;
  }

  .select_pinyin {
    background-color: #999999;
    color: #FFFFFF;
  }
}
</style>
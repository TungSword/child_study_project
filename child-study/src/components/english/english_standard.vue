<template>
  <el-row :gutter="20" v-for="(list, i) in allEngStandard" :key="i" class="english_standard">
    <el-col :span="24" style="margin-bottom: 20px">
      <span style="height: 60px;margin-right: 10px">{{ list.type }}</span>
      <el-button @click="playAllAudio(i)" type="primary">{{ button_name[i] }}</el-button>
    </el-col>
    <el-col :span="6" v-for="(item, j) in list.data" :key="j">
      <el-card @click.stop="readVideo(item.index)" style="margin-bottom: 20px; text-align: center"
               :class="{select_letter: i === index && j === jIndex - 1}">
              <span style="font-size: 20px">
                {{ item.name }}
              </span>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getEnglishStandard, getEnglishStandardCacheUrl} from "@/util/resource.js";

const allEngStandard = ref([])
const audio = new Audio();
const button_name = ref([])
const playInterval = ref()
const index = ref(0);
const jIndex = ref(0);
const playStatus = ref(false);
const isPlayNext = ref(true);

onMounted(async () => {
  allEngStandard.value = await getEnglishStandard();
  for (let i = 0; i < allEngStandard.value.length; i++) {
    button_name.value.push("自动播放")
  }
})

onBeforeUnmount(() => {
  clearInterval(playInterval.value)
})

function readVideo(param) {
  if (button_name.value[index.value] === "自动播放") {
    getEnglishStandardCacheUrl(param).then(url => {
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
        if (jIndex.value >= allEngStandard.value[index.value].data.length) {
          jIndex.value = 0;
        }
        const currentVideo = allEngStandard.value[index.value].data[jIndex.value].index;
        getEnglishStandardCacheUrl(currentVideo).then(url => {
          palyAudio(url)
          setTimeout(() => {
            isPlayNext.value = true;
          }, 1000)
        })
        jIndex.value++
      }
    }, 2000)
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
.english_standard {
  font-family: PingFang SC, Microsoft YaHei, Arial, sans-serif !important;

  .select_letter {
    background-color: #999999;
    color: #FFFFFF;
  }
}

</style>

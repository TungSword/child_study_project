<template>
  <div class="video_story">
    <el-card style="width: 100%;height: 200px">
      <template #header>
        <div class="card-header">
          <span>{{ currentStory.name }}</span>
        </div>
      </template>
      <audio id="story_audio" :src="audioUrl" controls></audio>
    </el-card>
  </div>
  <ul class="infinite-list" style="overflow: auto">
    <li class="infinite-list-item" :class="{selectStory: currentStory.id === story.id}" v-for="story in storyList" :key="story.id" @click="selectStory(story)">
      {{ story.name }}
    </li>
  </ul>
</template>
<script setup>
import resource from "@/util/resource.js";
import {onMounted, ref, onBeforeUnmount} from "vue";
import {getMonkeyPoliceStoryUrl} from "@/constant/resource_constant.js";

const storyList = ref();
const currentStory = ref({
  name: "请选择你喜欢的故事进行播放。",
  id: null,
});
const audioUrl = ref();
const audio = ref()
const audioPlay = ref();

onBeforeUnmount(() => {
  audio.value.src = ""
  clearTimeout(audioPlay.value)
})

onMounted(async () => {
  audio.value = document.getElementById("story_audio")
  storyList.value = await resource.getMonkeyPoliceStory();
  const saveStory = localStorage.getItem("monkeyStory")
  if (saveStory) {
    selectStory(JSON.parse(saveStory))
  }
})

function selectStory(story) {
  currentStory.value = story;
  resource.getMonkeyPoliceStoryCacheUrl(story.id).then(url => {
    audioUrl.value = url;
    localStorage.setItem("monkeyStory", JSON.stringify(currentStory.value))
    audio.value.load();
    audio.value.addEventListener('ended', selectNextStory);
    audioPlay.value = setTimeout(() => {
      audio.value.play();
    }, 3000)
  })

}

function selectNextStory() {
  let isSelect = false;
  for (let i = 0; i < storyList.value.length; i++) {
    const story = storyList.value[i];
    if (story.id === currentStory.value.id) {
      isSelect = true;
      selectStory(storyList.value[i + 1])
      return;
    }
  }
  if (!isSelect) {
    selectStory(storyList.value[0])
  }
}

</script>

<style lang="less" scoped>
.video_story {
  width: 100%;
  text-align: center;
}

.video_container {
  svg {
    width: 120px;
    height: 120px;
  }
}


.infinite-list {
  padding: 0;
  margin-top: 20px;
  height: calc(100vh - 370px);
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  cursor: pointer;
  border-radius: 3px;
}
.infinite-list .selectStory{
  background-color: var(--el-color-primary);
  color: #FFFFFF;
}


</style>

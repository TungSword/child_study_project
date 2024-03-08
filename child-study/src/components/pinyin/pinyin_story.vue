<template>
  <div class="story">
    <el-row :gutter="20" v-show="showTitles">
      <el-col :span="24" v-for="(story, index) in storyList" :key="index">
        <el-card shadow="always" @click="showContent(story)" :id="`story_${story.id}`" style="margin-bottom: 20px">
          <div v-for="(item, index) in story.name" :key="index" class="titleChar">
            <p>{{ item.pinyin }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="!showTitles" @click="hiddenContent">
      <el-card style="text-align: center;margin-bottom: 30px">
        <div v-for="item in currentStory.name" class="titleChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </el-card>
      <div v-for="content in currentStory.content" class="storyContent">
        <div class="contentStart" v-if="props.space">
          <p> </p>
          <p> </p>
        </div>
        <div v-for="item in content" class="storyChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, watchEffect} from "vue";
const props = defineProps(['story', "space"])

const storyList = ref()
const showTitles = ref(true);
const currentStory = ref({})
function showContent(story){
  showTitles.value = false;
  currentStory.value = story;
  document.documentElement.scrollTop
}

watchEffect(() => {
  storyList.value = props.story
})

function hiddenContent(){
  showTitles.value = true
  const id = `story_${currentStory.value.id}`
  document.getElementById(id).scrollIntoView(true)

}
</script>

<style lang="less" scoped>
.story {
  height: calc(100vh - 140px);
  .titleChar{
    font-size: 20px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 8px;
    text-align: center;
  }

  .storyChar{
    font-size: 20px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 8px;
    text-align: center;
    margin-bottom: 10px;
  }
  .storyContent{
    margin-bottom: 20px;
  }
  .contentStart{
    display: inline-block;
    width: 60px;
  }
}
</style>
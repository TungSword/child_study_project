<template>
  <div class="story">
    <el-row :gutter="20" v-if="showTitles">
      <el-col :span="24" v-for="(story, index) in storyList" :key="index">
        <el-card shadow="always" @click="showStory(story)" style="margin-bottom: 20px">
          <div v-for="item in story.name" class="titleChar">
            <p>{{ item.pinyin }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-else @click="showTitles = true">
      <div style="text-align: center;margin-bottom: 30px">
        <div v-for="item in currentStory.name" class="titleChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>

      <div v-for="content in currentStory.content" class="storyContent">
        <div class="contentStart">
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
import {ref, defineProps} from "vue";
const props = defineProps(['story'])

const storyList = ref(props.story)
const showTitles = ref(true);
const currentStory = ref({})
function showStory(story){
  showTitles.value = false;
  currentStory.value = story;
}
</script>

<style lang="less" scoped>
.story {
  height: calc(100vh - 140px);
  .titleChar{
    font-size: 30px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 20px;
    text-align: center;
  }

  .storyChar{
    font-size: 30px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 10px;
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
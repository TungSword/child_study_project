<template>
  <div class="relax-views">
    <monkey_police_story v-if="currentComponent === 'monkeyPoliceStory'"/>
    <ultraman_story v-if="currentComponent === 'ultraman_story'"/>

    <div v-if="currentComponent === 'home'">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, index) in list" :key="index" class="studyCom">
          <el-card shadow="hover" @click="showComponent(item.component)" v-if="item.show">{{ item.name }}</el-card>
        </el-col>
      </el-row>
    </div>
  </div>

  <el-button v-if="currentComponent !== 'home'" class="homeButton" :icon="HomeFilled" circle
             @click="showComponent('home')"/>
</template>

<script setup>
import {ref} from "vue";
import {HomeFilled} from '@element-plus/icons-vue'

const list = [
  {
    name: "猴子警长探案记",
    component: "monkeyPoliceStory",
    show: true
  },
  {
    name: "奥特曼故事",
    component: "ultraman_story",
    show: true
  }
]

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

</script>

<style lang="less" scoped>
.vue-app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-color: black;
    color: white;
    font-size: 24px;
  }

  .content {
    padding: 20px;
    overflow: auto;
    flex-grow: 1;
  }

  .studyCom {
    margin-bottom: 20px;
    text-align: center;
  }
}

</style>

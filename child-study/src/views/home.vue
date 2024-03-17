<template>
  <div class="vue-app">
    <div class="header">
      <span>{{ homeName }}同学</span>
    </div>
    <div class="content">
      <math_calc v-if="currentComponent === 'mathCalc'"/>
      <math_calc_multi v-if="currentComponent === 'mathCalcMulti'"></math_calc_multi>
      <math_multi_table v-if="currentComponent === 'mathMultiTable'"></math_multi_table>
      <order_pinyin v-if="currentComponent === 'orderPinyin'"/>
      <random_pinyin v-if="currentComponent === 'randomPinyin'"/>
      <classify_pinyin v-if="currentComponent === 'classifyPinyin'"/>
      <chinese_poetry v-if="currentComponent === 'chinesePoetry'"/>
      <monkey_police_story v-if="currentComponent === 'monkeyPoliceStory'"/>
      <ultraman_story v-if="currentComponent === 'ultraman_story'"/>
      <english_letters v-if="currentComponent === 'english_letters'"/>

      <div v-if="currentComponent === 'home'">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in list" :key="index" class="studyCom">
            <el-card shadow="hover" @click="showComponent(item.component)" v-if="item.show">{{ item.name }}</el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

  <el-button v-if="currentComponent !== 'home'" class="homeButton" :icon="HomeFilled" circle
             @click="showComponent('home')"/>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from 'vue-router'
import {HomeFilled} from '@element-plus/icons-vue'

const route = useRoute();
const homeName = ref("小於")

onMounted(() => {
  const name = route.query.name;
  if (name){
    homeName.value = name;
  }
})
const list = [
  {
    name: "数学加减法",
    component: "mathCalc",
    show: true
  },
  {
    name: "数学乘除法",
    component: "mathCalcMulti",
    show: true
  },
  {
    name: "九九乘法表",
    component: "mathMultiTable",
    show: true
  },
  {
    name: "拼音",
    component: "classifyPinyin",
    show: true
  },
  {
    name: "拼音顺序卡片",
    component: "orderPinyin",
    show: true
  },
  {
    name: "拼音随机卡片",
    component: "randomPinyin",
    show: true
  },
  {
    name: "唐诗三百首",
    component: "chinesePoetry",
    show: true
  },
  {
    name: "英文字母",
    component: "english_letters",
    show: true
  },
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

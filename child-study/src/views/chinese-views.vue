<template>
  <div class="chinese-views">
    <order_pinyin v-if="currentComponent === 'orderPinyin'"/>
    <random_pinyin v-if="currentComponent === 'randomPinyin'"/>
    <classify_pinyin v-if="currentComponent === 'classifyPinyin'"/>
    <chinese_poetry v-if="currentComponent === 'chinesePoetry'"/>

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
  }
]

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

</script>

<style lang="less" scoped>
.studyCom {
  margin-bottom: 20px;
  text-align: center;
}
</style>

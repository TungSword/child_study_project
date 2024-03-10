<template>
  <div class="navigation_header" @click="showComponent('home')">
    <span>小於同学</span>
  </div>
  <div class="content">
    <math_calc v-if="currentComponent === 'mathCalc'"/>
    <order_pinyin v-if="currentComponent === 'orderPinyin'"/>
    <random_pinyin v-if="currentComponent === 'randomPinyin'"/>
    <classify_pinyin v-if="currentComponent === 'classifyPinyin'"/>
    <chinese_poetry v-if="currentComponent === 'chinesePoetry'"/>
    <monkey_police_story v-if="currentComponent === 'monkeyPoliceStory'"/>

    <div v-if="currentComponent === 'home'">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, index) in list" :key="index" class="studyCom">
          <el-card shadow="hover" @click="showComponent(item.component)" v-if="item.show">{{ item.name }}</el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="returnDiv">
      <el-card shadow="hover" @click="showComponent('home')" style="text-align: center">返回目录</el-card>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import Math_calc from "@/components/math/math_calc.vue";
import Order_pinyin from "@/components/pinyin/order_pinyin.vue";
import Random_pinyin from "@/components/pinyin/random_pinyin.vue";
import Classify_pinyin from "@/components/pinyin/classify_pinyin.vue";
import Chinese_poetry from "@/components/chinese/chinese_poetry.vue";
import Monkey_police_story from "@/components/story/monkey_police_story.vue";


const list = [
  {
    name: "数学计算",
    component: "mathCalc",
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
    name: "猴子警长探案记",
    component: "monkeyPoliceStory",
    show: false
  }
]

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

</script>

<style lang="less">
.navigation_header {
  text-align: center;
  position: absolute;
  top: 0;
  height: 48px;
  line-height: 48px;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 28px;
}

.content {
  margin-top: 48px;
  padding: 20px;
  overflow: auto;
}

.returnDiv {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%
}

.studyCom {
  margin-bottom: 20px;
  text-align: center;
}
</style>

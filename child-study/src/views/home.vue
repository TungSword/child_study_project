<template>
  <div class="navigation_header" @click="showComponent('home')">
    <span>小於同学</span>
  </div>
  <div class="content">
    <mathCalc v-if="currentComponent === 'mathCalc'"/>
    <orderPinyin v-if="currentComponent === 'orderPinyin'"/>
    <randomPinyin v-if="currentComponent === 'randomPinyin'"/>
    <classifyPinyin v-if="currentComponent === 'classifyPinyin'"/>

    <div v-if="currentComponent === 'home'">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, index) in list" :key="index" class="studyCom">
          <el-card shadow="hover" @click="showComponent(item.component)">{{ item.name }}</el-card>
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
import mathCalc from "@/components/math/math_calc.vue";
import orderPinyin from "@/components/pinyin/order_pinyin.vue";
import randomPinyin from "@/components/pinyin/random_pinyin.vue";
import classifyPinyin from "@/components/pinyin/classify_pinyin.vue";

const currentComponent = ref('home')

const list = [
  {
    name: "数学计算",
    component: "mathCalc"
  },
  {
    name: "拼音",
    component: "classifyPinyin"
  },
  {
    name: "拼音顺序卡片",
    component: "orderPinyin"
  },
  {
    name: "拼音随机卡片",
    component: "randomPinyin"
  },

]

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
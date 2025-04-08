<template>
  <el-row>
    <el-col :span="8">
      <el-tag size="large" type="primary" effect="dark">选择卡片：</el-tag>
    </el-col>
    <el-col :span="16">
      <el-select
          v-model="cardSelect"
          :disabled="selectDisabled"
          @change="changeCard"
          placeholder="Select"
          style="width: 240px"
      >
        <el-option
            v-for="(item, index) in calculationCards"
            :key="index"
            :label="item.name"
            :value="item.name"
        />
      </el-select>
    </el-col>
  </el-row>

<!--  启动按钮-->
  <div class="startCalc" v-if="!selectDisabled">
    <el-icon @click="startCalculation"><VideoPlay /></el-icon>
  </div>
  <div v-if="countDownShow" class="startCalc">
    <span>{{ countDown }}</span>
  </div>

<!--  计算题-->
  <div v-if="calculationShow" style="margin-top: 20px">
    <div style="text-align: center">
      <el-tag>剩余题目：{{ calculationsTmp.length }}</el-tag>
    </div>
    <div class="startCalc">
      <span>{{ calculationContent }}</span>
    </div>
    <el-button type="primary" style="width: 100%; margin-top: 20px" @click="getNextCalculation">下一题</el-button>
  </div>

  <div v-if="resultShow" style="text-align: center">
    <el-tag size="large" type="success" effect="dark" style="width: 60%">花费时间：{{ calcTime }} 秒</el-tag>
  </div>

</template>

<script setup>
import {getMathCalculationCard} from "@/util/resource.js";
import {VideoPlay} from '@element-plus/icons-vue'

import {onMounted, ref} from 'vue';
const calculationCards = ref([]);
const cardSelect = ref("");
const calculations = ref([]);
const calculationsTmp = ref([]);
const selectDisabled = ref(false);
const countDownShow = ref(false);
const countDown = ref(3);
const calculationShow = ref(false);
const calculationContent = ref("");
const resultShow = ref(false);
const calcTime = ref(0);
const startTime = ref();

onMounted(async ()=> {
  calculationCards.value = await getMathCalculationCard();
  for (let i = 0; i < calculationCards.value.length; i++) {
    let item = calculationCards.value[i];
    if (item.select) {
      cardSelect.value = item.name;
      calculations.value = item.calculations;
    }
  }
})

function changeCard(value) {
  for (let i = 0; i < calculationCards.value.length; i++) {
    let item = calculationCards.value[i];
    if (item.name === value){
      calculations.value = item.calculations;
    }
  }
}

function startCalculation(){
  selectDisabled.value = true;
  countDownShow.value = true;
  resultShow.value = false;
  countDown.value = 3;
  calculationsTmp.value.push(...calculations.value);
  timeCountdown();
}

function timeCountdown(){
  if (countDown.value > 0) {
    setTimeout(() => {
      countDown.value -= 1
      timeCountdown();
    }, 1000)
  }
  if (countDown.value === 0){
    startTime.value = new Date();
    countDownShow.value = false;
    calculationShow.value = true;
    getNextCalculation();
  }
}

function getNextCalculation(){
  let length = calculationsTmp.value.length
  if (length === 0){
    calculationShow.value = false;
    selectDisabled.value = false;
    let endTime = new Date();
    calcTime.value = Number((endTime.getTime() - startTime.value.getTime()) / 1000).toFixed(2);
    resultShow.value = true;
    return;
  }
  let index = Math.floor(Math.random()*length);
  calculationContent.value = calculationsTmp.value.splice(index, 1)[0]
}

</script>

<style lang="less" scoped>

.math_calc {
  font-size: 80px;
  width: 100%;
  text-align: center;
}

.startCalc {
  text-align: center;
  font-size: 100px;
  margin-top: 20px;
}
</style>

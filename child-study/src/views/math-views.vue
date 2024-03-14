<template>
  <div class="math-views">
    <math_calc v-if="currentComponent === 'mathCalc'"/>
    <math_calc_multi v-if="currentComponent === 'mathCalcMulti'"></math_calc_multi>
    <math_multi_table v-if="currentComponent === 'mathMultiTable'"></math_multi_table>

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

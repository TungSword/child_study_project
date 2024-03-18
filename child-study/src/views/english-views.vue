<template>
  <div class="english-views">
    <english_letters v-if="currentComponent === 'english_letters'"/>

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
    name: "英文字母",
    component: "english_letters",
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

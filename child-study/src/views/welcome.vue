<template>
  <div class="vue-app">
    <div class="header">
      <span class="title">欢迎来到小於同学</span>
    </div>
    <div class="content">
      <el-input @input="changeName" v-model="customName" style="width: 60%" placeholder="请输入你的名字"/>
      <br>
      <span style="color: #999999; font-size: 8px">请输入10位以内的中文、英文或数字</span>
      <br>
      <el-button @click="startStudy" :disabled="startFlag" style="margin-top: 30px; width: 200px" type="primary">
        开始学习
      </el-button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from 'vue-router'

const router = useRouter();

const customName = ref("");
const startFlag = ref(true)
const nameRegex = /^[a-zA-Z\u4e00-\u9fa5\d]{1,10}$/

onMounted(() => {
  customName.value = localStorage.getItem("web_custom_name")
  changeName()
})

function changeName() {
  startFlag.value = !nameRegex.test(customName.value) || customName.value === '小於'
}

function startStudy() {
  localStorage.setItem("web_custom_name", customName.value)
  router.push({
    path: "/",
    query: {
      name: customName.value
    }
  })
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
    display: flex;
    align-items: center;

    .title {
      width: 100%;
      align-self: center;
    }
  }

  .content {
    padding: 20px;
    margin-top: 20%;
    text-align: center;
  }
}

</style>

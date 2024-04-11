<template>
  <div class="vue-app">
    <div class="header">
      <el-button v-show="currentComponent !== 'home'" class="left" :icon="HomeFilled" circle
                 @click="showComponent('home')"/>
      <span class="title">中国戏曲</span>
      <el-icon @click="showConnection" class="right">
        <Message/>
      </el-icon>
    </div>
    <div class="content">
      <opera_compontent :component="currentComponent"/>

      <div v-if="currentComponent === 'home'">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in opera_content_list" :key="index" class="studyCom">
            <el-card shadow="hover" @click="showComponent(item.component)" v-if="isShowElement(item)">
              {{ item.name }}
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>


</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {HomeFilled, Message} from '@element-plus/icons-vue'
import {opera_content_list} from '@/constant/content_constant'
import {ElMessageBox} from 'element-plus'

const route = useRoute();
const homeName = ref("小於")

function isShowElement(item) {
  return item.show;
}

onMounted(() => {
  const name = route.query.name;
  if (name) {
    homeName.value = name;
  }
})

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

function showConnection() {
  ElMessageBox.alert('E-Mail: tungsword_cn@qq.com', '联系方式', {
    "show-close": false,
    center: true,
    confirmButtonText: 'OK',
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

    .left {
      margin-left: 8px;
    }

    .right {
      margin-right: 16px;
      font-size: 16px;
    }
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

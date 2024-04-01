<template>
  <div class="vue-app">
    <div class="header">
      <el-button v-if="currentComponent !== 'home'" class="icon" :icon="HomeFilled" circle
                 @click="showComponent('home')"/>
      <span>{{ homeName }}同学</span>
    </div>
    <div class="content">
      <all_compontent :component="currentComponent"/>

      <div v-if="currentComponent === 'home'">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in content_list" :key="index" class="studyCom">
            <el-card shadow="hover" @click="showComponent(item.component)" v-if="item.show || homeName==='小於'">
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
import {HomeFilled} from '@element-plus/icons-vue'
import {content_list} from '@/constant/content_constant'

const route = useRoute();
const homeName = ref("小於")

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
    span {
      width: 100%;
      align-self: center;
    }
    .icon{
      margin-left: 8px;
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

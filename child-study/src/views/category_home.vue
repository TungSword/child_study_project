<template>
  <div class="vue-app">
    <div class="header">
      <el-button v-show="currentComponent !== 'home'" class="left" :icon="HomeFilled" circle
                 @click="showComponent('home')"/>
      <span class="title" :class="{buttonShow : currentComponent === 'home'}">{{ homeName }}同学</span>
      <el-icon @click="showConnection" class="right">
        <Message/>
      </el-icon>
    </div>
    <div class="content">
      <all_compontent :component="currentComponent"/>

      <div v-if="currentComponent === 'home'">
        <el-radio-group style="margin-bottom: 30px" v-model="contentRadio">
          <el-radio-button v-for="(content, index) in contentList" :key="index"
                           :value="content.name" @click="showSubContent(index)">
            {{ content.name }}
          </el-radio-button>
        </el-radio-group>

        <div v-for="(content, index) in contentList" :key="index">
          <el-row :gutter="20" v-if="content.show">
            <el-col :span="12" class="studyCom" v-for="(item, index) in content.subContents" :key="index">
              <el-card shadow="hover" @click="showComponent(item.component)">
                {{ item.name }}
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>

  <pay_message :visible="mailVisible" @visible="visible"></pay_message>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {HomeFilled, Message} from '@element-plus/icons-vue'
import {category_content_list} from '@/constant/content_constant'

const contentList = ref([])
const route = useRoute();
const homeName = ref("小於")
const mailVisible = ref(false);
const contentRadio = ref("")

onMounted(async () => {
  const name = route.query.name;
  if (name) {
    homeName.value = name;
  }

  // 过滤内容
  for (let i = 0; i < category_content_list.length; i++) {
    let categoryContent = category_content_list[i]
    if (categoryContent.show) {
      contentRadio.value = categoryContent.name;
    }
    categoryContent.subContents = categoryContent.subContents.filter(item => {
      if (item.owner) {
        return item.show || item.owner.indexOf(homeName.value) > -1;
      }
      return item.show;
    })
    contentList.value.push(categoryContent);
  }
})

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

function showSubContent(index) {
  for (let i = 0; i < contentList.value.length; i++) {
    if (i === index) {
      contentList.value[i].show = true;
    } else {
      contentList.value[i].show = false;
    }
  }
}

function showConnection() {
  mailVisible.value = true;
}

function visible(item) {
  mailVisible.value = item;
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

    .buttonShow {
      margin-left: 39.6px;
    }

    .left {
      margin-left: 8px;
    }

    .right {
      margin-left: 8px;
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

.payment_code {
  width: 100%;
}

</style>

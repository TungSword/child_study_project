<template>
  <div class="pinyin-content">
    <el-row :gutter="20" v-show="showTitles">
      <el-col :span="24" v-for="(content, index) in contentList" :key="index">
        <el-card shadow="always" @click="showContent(content)" :id="`content_${content.id}`"
                 style="margin-bottom: 20px">
          <div v-for="(item, index) in content.name" :key="index" class="titleChar">
            <p>{{ item.pinyin }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="!showTitles">
      <el-card style="text-align: center;margin-bottom: 30px">
        <div v-for="item in currentContent.name" class="titleChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </el-card>
      <div v-for="content in currentContent.content" class="contentContent">
        <div class="contentStart" v-if="props.startSpace">
          <p></p>
          <p></p>
        </div>
        <div v-for="item in content" class="contentChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="content-close">
        <el-button type="danger" :icon="Close" @click="hiddenContent" circle/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref, watchEffect} from "vue";
import {Close} from '@element-plus/icons-vue'

const props = defineProps(['content', "startSpace"])

const contentList = ref()
const showTitles = ref(true);
const currentContent = ref({})

function showContent(content) {
  showTitles.value = false;
  currentContent.value = content;
  document.documentElement.scrollTop
}

watchEffect(() => {
  contentList.value = props.content
})

function hiddenContent() {
  showTitles.value = true
  const id = `content_${currentContent.value.id}`
  document.getElementById(id).scrollIntoView(true)

}
</script>

<style lang="less" scoped>
.pinyin-content {
  .titleChar {
    font-size: 20px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 8px;
    text-align: center;
  }

  .contentChar {
    font-size: 20px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: #444;
    padding: 0 8px;
    text-align: center;
    margin-bottom: 10px;
  }

  .contentContent {
    margin-bottom: 20px;
  }

  .contentStart {
    display: inline-block;
    width: 60px;
  }
  .content-close{
    text-align: center;
  }
}
</style>
<template>
  <div class="classify_pinyin">
    <el-row>
      <el-col :span="24" v-for="(classify, index) in pinyin" :key="index">
        <p style="height: 60px;">{{ classify.name }}</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in classify.data" :key="index">
            <el-card @click.stop="readVideo(item.video)" style="margin-bottom: 20px; text-align: center">
              <span>
                {{ item.show }}
              </span>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import classifyPinyin from "@/assets/pinyin/classifyPinyin.json"
import {ref} from "vue";

const pinyin = ref(classifyPinyin.data)

function readVideo(video) {
  const audio = new Audio("https://tungsword.github.io/child/pinyin/video/" + video);
  audio.play();
}
</script>


<style lang="less" scoped>
.classify_pinyin {
  height: calc(100vh - 140px);
  font-size: 30px;
  span {
    font-size: 20px;
  }
}
</style>
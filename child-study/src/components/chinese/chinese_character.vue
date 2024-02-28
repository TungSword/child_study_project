<template>
  <div class="chinese_character">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(item, index) in characters" :key="index">
        <el-card shadow="always">
          <p class="pinyin">{{ item.pinyin }}</p>
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.desc }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import character from "@/assets/chinese/chinese_character.json"

import {ref} from "vue";

const characters = ref(character.data)
</script>


<style lang="less" scoped>
.chinese_character {
  height: calc(100vh - 140px);
  font-size: 40px;
  p {
    text-align: center;
    padding: 10px 0;
  }
  .desc{
    text-align: left;
    font-size: 18px;
  }
}
</style>
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
import {onMounted, ref} from "vue";
import resource from "@/util/resource.js";
import {getPinyinVoiceUrl} from "@/constant/resource_constant.js";

const pinyin = ref()

onMounted(async () => {
  const classifyPinyin = await resource.getClassifyPinyin()
  pinyin.value = classifyPinyin.data
})

function readVideo(video) {
  const url = getPinyinVoiceUrl(video)
  const audio = new Audio(url);
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
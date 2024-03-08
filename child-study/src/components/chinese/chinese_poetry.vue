<template>
  <pinyin_story :story="storyList" :space="false"/>
</template>
<script setup>
import {ref, onMounted} from "vue";
import Pinyin_story from "@/components/pinyin/pinyin_story.vue";
import resource from "@/util/resource.js";

const storyList = ref()

onMounted(async ()=> {
  storyList.value = await resource.getChinesePoetry()
})
</script>

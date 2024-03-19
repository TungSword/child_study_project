<template>
  <pinyin_content :content="storyList" :startSpace="true"/>
</template>
<script setup>
import {ref, onMounted} from "vue";
import {getCerroUltramanStory} from "@/util/resource.js";

const storyList = ref()

onMounted(async ()=> {
  storyList.value = await getCerroUltramanStory()
})
</script>

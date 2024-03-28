<template>
  <pinyin_content :content="storyList" :startSpace="true"/>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {getUltramanStory} from "@/util/resource.js";

const storyList = ref()

onMounted(async () => {
  storyList.value = await getUltramanStory()
})
</script>

<template>
  <pinyin_story :story="storyList" :space="false"/>
</template>
<script setup>
import chinese_poetry from "@/assets/chinese/chinese_poetry.json"
import {ref} from "vue";
import Pinyin_story from "@/components/pinyin/pinyin_story.vue";

const storyList = ref(chinese_poetry)
</script>

<template>
  <bilibili_video_player :video-list="shanghai_opera_video.videoList" :name="shanghai_opera_video.nameEn"
                         v-if="props.component === 'shanghai_opera'"/>
</template>

<script setup>
import {shanghai_opera_video} from "@/constant/traditional_opera_video_constant.js"
import {defineProps} from 'vue'

const props = defineProps(['component'])
</script>
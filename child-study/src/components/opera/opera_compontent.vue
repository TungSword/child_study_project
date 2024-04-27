<template>
  <bilibili_video_player :video-list="shanghai_opera_video.videoList" :name="shanghai_opera_video.nameEn"
                         v-if="props.component === 'shanghai_opera'"/>
  <bilibili_video_player :video-list="huangmei_opera_video.videoList" :name="huangmei_opera_video.nameEn"
                         v-if="props.component === 'huangmei_opera'"/>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {getShanghaiOperaVideo, getHuangmeiOperaVideo} from "@/util/resource.js";

const props = defineProps(['component'])
const shanghai_opera_video = ref()
const huangmei_opera_video = ref()

onMounted(async () => {
  shanghai_opera_video.value = await getShanghaiOperaVideo()
  huangmei_opera_video.value = await getHuangmeiOperaVideo();
})
</script>
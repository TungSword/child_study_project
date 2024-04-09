<template>
  <iframe style="width: 100%; height: 300px"
          :src="videoUrl"
          scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
  <scrollbar class="scrollbar_video" @selectVideo="selectVideo" :contents="contents" :selectName="selectName"></scrollbar>
</template>

<script setup>
import {penelope_video} from "@/constant/video_constant.js"
import {onMounted, ref} from 'vue'
const videoUrl = ref("")
const contents = ref();
const selectName = ref();
const cacheVideo = ref({
  name: "",
  id: 0,
})

onMounted(() => {
  contents.value = penelope_video.videoList;
  const cache = localStorage.getItem("penelope_video_cache")
  if (cache){
    cacheVideo.value = JSON.parse(cache)
  }else {
    cacheVideo.value = {
      selectName: penelope_video.videoList[0].name,
      id : penelope_video.videoList[0].id
    }
  }
  selectVideo(cacheVideo.value)
})

function selectVideo(item){
  cacheVideo.value = item;
  selectName.value = cacheVideo.value.name;
  videoUrl.value = penelope_video.default_url + cacheVideo.value.id
  saveStorage()
}

function saveStorage(){
  localStorage.setItem("penelope_video_cache", JSON.stringify(cacheVideo.value))
}
</script>

<style scoped>
.scrollbar_video{
  height: calc(100vh - 410px);
}
</style>
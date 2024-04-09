<template>
  <iframe style="width: 100%; height: 300px"
          :src="videoUrl"
          scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
  <scrollbar class="scrollbar_video" @selectVideo="selectVideo" :contents="contents"
             :selectName="selectName"></scrollbar>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';

const props = defineProps(['videoList', "defaultUrl", "name"])
const videoUrl = ref("")
const contents = ref();
const selectName = ref();
const cacheVideo = ref({
  name: "",
  id: 0,
})

onMounted(() => {
  contents.value = props.videoList;
  const cache = localStorage.getItem(props.name + "_video_cache")
  if (cache) {
    cacheVideo.value = JSON.parse(cache)
  } else {
    cacheVideo.value = {
      name: props.videoList[0].name,
      id: props.videoList[0].id
    }
  }
  selectVideo(cacheVideo.value)
})

function selectVideo(item) {
  cacheVideo.value = item;
  selectName.value = cacheVideo.value.name;
  videoUrl.value = props.defaultUrl + cacheVideo.value.id
  saveStorage()
}

function saveStorage() {
  localStorage.setItem(props.name + "_video_cache", JSON.stringify(cacheVideo.value))
}
</script>

<style scoped>
.scrollbar_video {
  height: calc(100vh - 410px);
}
</style>
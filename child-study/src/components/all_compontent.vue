<template>
  <math_calc v-if="props.component === 'mathCalc'"/>
  <math_calc_multi v-if="props.component === 'mathCalcMulti'"/>
  <math_multi_table v-if="props.component === 'mathMultiTable'"/>
  <math_sudoku v-if="props.component === 'mathSudoku'"/>
  <order_pinyin v-if="props.component === 'orderPinyin'"/>
  <random_pinyin v-if="props.component === 'randomPinyin'"/>
  <classify_pinyin v-if="props.component === 'classifyPinyin'"/>
  <chinese_poetry v-if="props.component === 'chinesePoetry'"/>
  <monkey_police_story v-if="props.component === 'monkeyPoliceStory'"/>
  <ultraman_story v-if="props.component === 'ultraman_story'"/>
  <english_letters v-if="props.component === 'english_letters'"/>
  <english_standard v-if="props.component === 'english_standard'"/>
  <english_phonics v-if="props.component === 'english_phonics'"/>
  <bilibili_video_player :video-list="penelope_video.videoList" :name="penelope_video.nameEn"
                         v-if="props.component === 'penelope'"/>
  <bilibili_video_player :video-list="gigantosaurus_video.videoList" :name="gigantosaurus_video.nameEn"
                         v-if="props.component === 'gigantosaurus'"/>
  <plan_page v-if="props.component === 'planPage'"/>
  <harry_potter v-if="props.component === 'harryPotter'"/>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {getGigantosaurusVideo, getPenelopeVideo} from "@/util/resource.js";

const penelope_video = ref();
const gigantosaurus_video = ref();
onMounted(async () => {
  gigantosaurus_video.value = await getGigantosaurusVideo();
  penelope_video.value = await getPenelopeVideo();
})


const props = defineProps(['component'])
</script>

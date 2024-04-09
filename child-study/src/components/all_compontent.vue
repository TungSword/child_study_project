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
  <penelope_video v-if="props.component === 'penelope_video'"/>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps(['component'])
</script>
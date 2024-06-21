<template>
  <h1 style="margin-bottom: 20px">每日计划</h1>
  <div v-for="plan in plans" style="margin-bottom: 12px">
    <p style="margin-bottom: 4px">{{ plan }}</p>
    <p>完成之后，休息5分钟...</p>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const plans = ref([])

onMounted(async () => {
  plans.value.push("1.写拼音20分钟，5：00 - 5：20")
  plans.value.push("2.写练字20分钟，5：25 - 5：30")
  plans.value.push("3.读英语3遍，5：35 - 5：45")
  plans.value.push("4.写数学20分钟，5：50 - 6：10")
  plans.value.push("4.写数学20分钟，6：15 - 6：35")
})

</script>

<template>
  <h1 style="margin-bottom: 20px; text-align: center">每日计划</h1>
  <div v-for="plan in plans" style="margin-bottom: 12px">
    <p style="margin-bottom: 4px">{{ plan.showContent }}</p>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const plans = ref([
  {
    content: "写拼音",
    time: 20,
    startTime:null,
    endTime: null,
    showContent:""
  },
  {
    content: "练字",
    time: 20,
    startTime:null,
    endTime: null,
    showContent:""
  },
  {
    content: "读英语",
    time: 10,
    startTime:null,
    endTime: null,
    showContent:""
  },
  {
    content: "写数学一",
    time: 20,
    startTime:null,
    endTime: null,
    showContent:""
  },
  {
    content: "写数学二",
    time: 20,
    startTime:null,
    endTime: null,
    showContent:""
  }
]);
// 开始时间
const startHour = 17;
const startMinute = 0;
// 休息时间，分钟
const freeTime = 5;

onMounted(async () => {
  const startDate = new Date()
  startDate.setHours(startHour)
  startDate.setMinutes(startMinute)
  startDate.setSeconds(0)

  let calcTime = startDate.getTime();
  for (let i = 0; i < plans.value.length; i++) {
    let plan = plans.value[i];
    let startTime = new Date(calcTime);
    let endTime = new Date(calcTime + (plan.time * 60 * 1000));
    plan.startTime = `${String(startTime.getHours()).length === 2? startTime.getHours():"0" + startTime.getHours()}:${String(startTime.getMinutes()).length === 2? startTime.getMinutes():"0" + startTime.getMinutes()}`
    plan.endTime = `${String(endTime.getHours()).length === 2? endTime.getHours():"0" + endTime.getHours()}:${String(endTime.getMinutes()).length === 2? endTime.getMinutes():"0" + endTime.getMinutes()}`
    plan.showContent = `${i+1}、${plan.content}：${plan.time}分钟，${plan.startTime} - ${plan.endTime}`
    calcTime = calcTime + (plan.time + freeTime) * 60 * 1000;
  }
})

</script>

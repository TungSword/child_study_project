<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <h3>每日计划</h3>
      </div>
    </template>
    <p v-for="plan in plans" style="margin-bottom: 8px">{{ plan.showContent }}</p>
  </el-card>

  <el-card v-if="showCurrentPlan" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <h3>{{ currentPlan.content }}</h3>
      </div>
    </template>
    <p>剩余时间：{{ currentPlan.time }}</p>
  </el-card>
  <el-card v-else style="margin-top: 20px">
    <h3>计划未开始</h3>
  </el-card>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'

const plans = ref([
  {
    content: "写拼音",
    time: 20,
    startTime: null,
    endTime: null,
    showContent: ""
  },
  {
    content: "练字",
    time: 20,
    startTime: null,
    endTime: null,
    showContent: ""
  },
  {
    content: "读英语",
    time: 10,
    startTime: null,
    endTime: null,
    showContent: ""
  },
  {
    content: "写数学一",
    time: 20,
    startTime: null,
    endTime: null,
    showContent: ""
  },
  {
    content: "写数学二",
    time: 20,
    startTime: null,
    endTime: null,
    showContent: ""
  }
]);
// 开始时间
const startHour = 17;
const startMinute = 0;
// 休息时间，分钟
const freeTime = 5;
let taskInterVal = ref();
let showCurrentPlan = ref(false);
const currentPlan = ref({})

onBeforeUnmount(() => {
  clearInterval(taskInterVal.value)
})

onMounted(async () => {
  const startDate = new Date()
  startDate.setHours(startHour)
  startDate.setMinutes(startMinute)
  startDate.setSeconds(0)

  let calcTime = startDate.getTime();
  for (let i = 0; i < plans.value.length; i++) {
    let plan = plans.value[i];
    plan.startTime = new Date(calcTime);
    plan.endTime = new Date(calcTime + (plan.time * 60 * 1000));
    const startTime = `${String(plan.startTime.getHours()).length === 2 ? plan.startTime.getHours()
        : "0" + plan.startTime.getHours()}:${String(plan.startTime.getMinutes()).length === 2 ? plan.startTime.getMinutes() : "0" + plan.startTime.getMinutes()}`
    const endTime = `${String(plan.endTime.getHours()).length === 2 ? plan.endTime.getHours()
        : "0" + plan.endTime.getHours()}:${String(plan.endTime.getMinutes()).length === 2 ? plan.endTime.getMinutes() : "0" + plan.endTime.getMinutes()}`
    plan.showContent = `${i + 1}、${plan.content}：${plan.time}分钟，${startTime} - ${endTime}`
    calcTime = calcTime + (plan.time + freeTime) * 60 * 1000;
  }

  taskInterVal.value = setInterval(() => {
    startTask()
  }, 1000)
})

function startTask() {
  const now = new Date();
  for (let i = 0; i < plans.value.length; i++) {
    let plan = plans.value[i];
    if (now.getTime() <= plan.endTime.getTime() && now.getTime() >= plan.startTime.getTime()) {
      showCurrentPlan.value = true;
      const time = Math.floor((plan.endTime.getTime() - now.getTime()) / 1000)
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      currentPlan.value = {
        content: `当前任务：${plan.content}`,
        time: `${String(minutes).length === 2 ? minutes : '0' + minutes}:${String(seconds).length === 2 ? seconds : '0' + seconds}`
      }
      return;
    }
    if (i > 0) {
      let prePlan = plans.value[i - 1];
      if (now.getTime() <= plan.startTime.getTime() && now.getTime() >= prePlan.endTime.getTime()) {
        showCurrentPlan.value = true;
        const time = Math.floor((plan.startTime.getTime() - now.getTime()) / 1000)
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        currentPlan.value = {
          content: "休息一下...",
          time: `${String(minutes).length === 2 ? minutes : '0' + minutes}:${String(seconds).length === 2 ? seconds : '0' + seconds}`
        }
        return;
      }
    }
  }
  showCurrentPlan.value = false;

}

</script>

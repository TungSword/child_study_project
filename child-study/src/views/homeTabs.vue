<template>
  <div class="tab-vue-app">
    <div class="header">
      <span>{{ homeName }}同学</span>
    </div>
    <el-tabs v-model="activeName" class="content">
      <el-tab-pane label="数学" name="math">
        <math-views></math-views>
      </el-tab-pane>
      <el-tab-pane label="语文" name="chinese">
        <chinese-views></chinese-views>
      </el-tab-pane>
      <el-tab-pane label="放松" name="relax">
        <relax-views></relax-views>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import MathViews from "@/views/math-views.vue";
import ChineseViews from "@/views/chinese-views.vue";
import RelaxViews from "@/views/relax-views.vue";

const route = useRoute();
const homeName = ref("小於")
const activeName = ref("math")

onMounted(() => {
  const name = route.query.name;
  if (name) {
    homeName.value = name;
  }
})
</script>

<style lang="less">
.tab-vue-app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-color: black;
    color: white;
    font-size: 24px;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 68px) !important;
  }

  .studyCom {
    margin-bottom: 20px;
    text-align: center;
  }
  .el-tabs__content{
    overflow:auto;
    overflow-x:hidden;
  }
}


.el-tabs__item {
  font-size: 16px !important;
}
</style>

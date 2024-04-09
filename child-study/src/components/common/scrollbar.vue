<template>
  <ul class="scrollbar_list" style="overflow: auto">
    <li class="scrollbar_list_item" :class="{selected: item.name === selectName}"
        v-for="(item, i) in props.contents" :key="i" @click="select(item)">
      <span style="font-size: 16px">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>

</script>
<script setup>
import {defineProps, defineEmits} from 'vue';
const props = defineProps(['contents', "selectName"])
const emits = defineEmits(['selectVideo'])
function select(item){
  emits("selectVideo", item)
}
</script>

<style lang="less" scoped>
.scrollbar_list {
  padding: 0;
  margin-top: 20px;
  list-style: none;
}

.scrollbar_list .scrollbar_list_item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  cursor: pointer;
  border-radius: 3px;
}

.scrollbar_list .selected {
  background-color: var(--el-color-primary);
  color: #FFFFFF;
}
</style>
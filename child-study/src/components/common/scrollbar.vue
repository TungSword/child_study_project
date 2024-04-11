<template>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="12">
      <el-button style="width: 100%" @click="playPreview">上一集</el-button>
    </el-col>
    <el-col :span="12">
      <el-button style="width: 100%" type="primary" @click="playNext">下一集</el-button>
    </el-col>
  </el-row>
  <ul class="scrollbar_list" style="overflow: auto">
    <li class="scrollbar_list_item" :class="{selected: item.name === selectName}"
        v-for="(item, i) in props.contents" :key="i" @click="select(item)">
      <span class="scrollbar_list_item_span">{{ i + 1 }}.{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>

</script>
<script setup>
import {defineProps, defineEmits, ref} from 'vue';

const props = defineProps(['contents', "selectName"])
const emits = defineEmits(['selectVideo'])
const currentIndex = ref(1);

function select(item) {
  emits("selectVideo", item)
  currentIndex.value = item.id
}

function playNext() {
  if (currentIndex.value === props.contents.length) {
    return;
  }
  select(props.contents[currentIndex.value])
}

function playPreview() {
  if (currentIndex.value === 1) {
    return;
  }
  select(props.contents[currentIndex.value - 2])
}
</script>

<style lang="less" scoped>
.scrollbar_list {
  padding: 0;
  margin-top: 10px;
  height: calc(100vh - 445px);
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

.scrollbar_list_item_span {
  font-size: 16px;
  white-space: pre-wrap;
  display: inline-block;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
}
</style>
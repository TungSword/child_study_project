<template>
  <el-row style="margin-bottom: 20px">
    <el-col :span="12">
      <el-select v-model="cacheContent.title"
                 placeholder="Select"
                 size="large"
                 @change="selectContent">
        <el-option v-for="(item, i) in titleList" :key="i" :label="item.label" :value="item.label"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="12" style="text-align: right">
      <label>拼音：</label>
      <el-switch
          v-model="cacheContent.pinyinOpen"
          size="large"
          @change="saveStorage"
      />
    </el-col>
  </el-row>

  <el-collapse accordion class="poetry_content">
    <el-collapse-item :name="i" v-for="(entity, i) in entityList" :key="i">
      <template #title>
        <span style="font-size: 20px;">{{ entity.name }}</span>
        <span style="font-size: 14px; margin-left: 20px">{{ entity.author }} {{ entity.dynasty }}</span>
      </template>
      <p v-for="(content, j) in entity.contents" :key="j" style="font-size: 18px" v-if="!cacheContent.pinyinOpen">
        {{ content }}
      </p>
      <div v-if="cacheContent.pinyinOpen">
        <div style="text-align: center;margin-bottom: 20px">
          <div v-for="item in entity.pinyinName" class="titleChar">
            <p>{{ item.pinyin }}</p>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div v-for="content in entity.pinyinContent" class="contentContent">
          <div v-for="item in content" class="contentChar">
            <p>{{ item.pinyin }}</p>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>

      <h3 style="margin-top: 20px; font-size: 18px">译文及注释</h3>
      <p v-for="translation in entity.translation" style="margin-bottom: 12px; font-size: 16px">
        {{ translation }}
      </p>
    </el-collapse-item>
  </el-collapse>

</template>
<script setup>
import {onMounted, ref} from "vue";
import {getXiaoXueClassicalChinese, getXiaoXuePoetry} from "@/util/resource.js";

const titleList = ref([
  {
    label: "小学古诗",
    method: getXiaoXuePoetry
  },
  {
    label: "小学文言文",
    method: getXiaoXueClassicalChinese
  }
])

const cacheContent = ref({
  title: "小学古诗",
  pinyinOpen: true
})
const entityList = ref();

onMounted(async () => {
  const content = localStorage.getItem("poetrySelectContent")
  if (content) {
    cacheContent.value = JSON.parse(content)
  }
  selectContent(cacheContent.value.title)
})

async function selectContent(value) {
  const method = getTitleMethod(value)
  entityList.value = await method()
  saveStorage();
}

function getTitleMethod(value) {
  const filterTitle = titleList.value.filter(item => item.label === value);
  if (filterTitle.length > 0) {
    return filterTitle[0].method;
  }
  cacheContent.value.title = "小学古诗"
  return getXiaoXuePoetry;
}

function saveStorage() {
  localStorage.setItem("poetrySelectContent", JSON.stringify(cacheContent.value))
}
</script>

<style lang="less" scoped>
.poetry_content{
  .titleChar {
    font-size: 20px;
    display: inline-block;
    padding: 0 8px;
    text-align: center;
    line-height: 20px
  }

  .contentChar {
    font-size: 18px;
    display: inline-block;
    padding: 0 8px;
    text-align: center;
    margin-bottom: 10px;
  }

  .contentContent {
    margin-bottom: 20px;
  }
}

</style>

<template>
  <el-row style="margin-bottom: 20px">
    <el-col :span="14">
      <el-select v-model="cacheContent.title"
                 size="large"
                 @change="selectContent(cacheContent.title, false)">
        <el-option v-for="(item, i) in titleList" :key="i" :label="item.label" :value="item.label"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="10" style="text-align: right">
      <label>拼音：</label>
      <el-switch
          v-model="cacheContent.pinyinOpen"
          size="large"
          @change="saveStorage"
      />
    </el-col>
  </el-row>
  <el-row style="margin-bottom: 20px">
    <el-col :span="14">
      <el-select
          v-model="cacheContent.index"
          size="large"
          placeholder="搜索"
          @change="searchChange"
      >
        <el-option
            v-for="(item, index) in poetryOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="10" style="text-align: right">
      <label>搜索：</label>
      <el-switch
          v-model="cacheContent.searchOpen"
          size="large"
          @change="saveStorage"
      />
    </el-col>
  </el-row>

  <ul class="poetry_list" style="overflow: auto" v-if="cacheContent.searchOpen">
    <li class="poetry_list_item" :class="{selectStory: entity.name === cacheContent.poetry.name}"
        v-for="(entity, i) in entityList" :key="i" @click="selectPoetry(entity, i)">
      <span style="font-size: 20px">{{ entity.name }}</span>
      <span style="margin-left: 10px; font-size: 12px">{{ entity.dynasty }} {{ entity.author }}</span>
    </li>
  </ul>

  <el-card style="margin-top: 20px" class="poetry_content" v-loading="loading">
    <div v-if="!cacheContent.pinyinOpen" style="text-align: center">
      <p style="font-size: 20px; margin-bottom: 10px">{{ cacheContent.poetry.name }}</p>
      <p style="font-size: 14px; margin-bottom: 20px">
        <span>{{ cacheContent.poetry.dynasty }} {{ cacheContent.poetry.author }}</span>
      </p>
      <p v-for="(content, j) in cacheContent.poetry.contents" :key="j" style="font-size: 18px; margin-bottom: 8px">
        {{ content }}
      </p>
    </div>

    <!-- 拼音版-->
    <div v-if="cacheContent.pinyinOpen">
      <div style="text-align: center;margin-bottom: 20px">
        <div v-for="item in cacheContent.poetry.pinyinName" class="titleChar">
          <p style="margin-bottom: 8px">{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <p style="text-align: center; margin-bottom: 20px">
        <span>{{ cacheContent.poetry.dynasty }} {{ cacheContent.poetry.author }}</span>
      </p>
      <div v-for="content in cacheContent.poetry.pinyinContent" class="contentContent">
        <div v-for="item in content" class="contentChar">
          <p>{{ item.pinyin }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <h3 style="margin-top: 20px; font-size: 18px; margin-bottom: 20px">译文及注释</h3>
    <p v-for="translation in cacheContent.poetry.translation" style="margin-bottom: 12px; font-size: 16px">
      {{ translation }}
    </p>
  </el-card>

</template>
<script setup>
import {onMounted, ref} from "vue";
import {
  getChineseShijing,
  getChuZhongClassicalChinese,
  getChuZhongPoetry,
  getXiaoXueClassicalChinese,
  getXiaoXuePoetry
} from "@/util/resource.js";

const titleList = ref([
  {
    label: "小学古诗",
    method: getXiaoXuePoetry
  },
  {
    label: "小学文言文",
    method: getXiaoXueClassicalChinese
  },
  {
    label: "初中古诗",
    method: getChuZhongPoetry
  },
  {
    label: "初中文言文",
    method: getChuZhongClassicalChinese
  },
  {
    label: "诗经",
    method: getChineseShijing
  },
])

const cacheContent = ref({
  title: "小学古诗",
  pinyinOpen: true,
  searchOpen: false,
  poetry: {},
  index: 0
})
const entityList = ref();
const poetryOptions = ref([]);
const loading = ref(false)

onMounted(async () => {
  const content = localStorage.getItem("poetrySelectContent")
  if (content) {
    cacheContent.value = JSON.parse(content)
  }
  await selectContent(cacheContent.value.title, true)
  if (!content) {
    cacheContent.value.poetry = entityList.value[0]
    cacheContent.value.index = 0
    saveStorage()
  }
})

async function selectContent(value, start) {
  loading.value = true;
  poetryOptions.value = []
  cacheContent.value.index = 0
  const method = getTitleMethod(value)
  entityList.value = await method()
  poetryOptions.value = entityList.value.map((item, index) => {
    return {
      label: `${item.name} ${item.dynasty} ${item.author}`,
      value: index
    }
  })
  if (!start) {
    cacheContent.value.poetry = entityList.value[0]
    cacheContent.value.index = 0
    cacheContent.value.searchOpen = false;
  }
  saveStorage()
  loading.value = false;
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

function selectPoetry(entity, index) {
  cacheContent.value.poetry = entity
  cacheContent.value.index = index
  cacheContent.value.searchOpen = false;
  saveStorage();
}

function searchChange(index) {
  cacheContent.value.poetry = entityList.value[index]
  cacheContent.value.searchOpen = false;
  saveStorage();
}
</script>

<style lang="less" scoped>
.poetry_list {
  padding: 0;
  margin-top: 20px;
  height: 500px;
  list-style: none;
}

.poetry_list .poetry_list_item {
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

.poetry_list .selectStory {
  background-color: var(--el-color-primary);
  color: #FFFFFF;
}

.poetry_content {
  .card-header {
    text-align: center;
  }

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

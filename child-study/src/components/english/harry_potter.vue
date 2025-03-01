<template>
  <h2 style="text-align: center; margin-bottom: 20px">Harry Potter</h2>

  <el-card v-for="(content, bookIndex) in book_contents" :key="bookIndex" style="margin-bottom: 20px">
    <div style="font-size: 20px; " @click="clickBook(bookIndex)">
      <p>{{ content }}</p>
    </div>
    <p style="margin-bottom: 14px; margin-top: 14px; color: cornflowerblue" v-show="chapterShow[bookIndex]"
       @click="hiddenChapter(bookIndex)">
      hidden
    </p>
    <div v-show="chapterShow[bookIndex]">
      <span v-for="(chapter, i) in chapters[bookIndex]" :key="i" style="display: block; margin-bottom: 20px"
            @click="showChapterContent(content, chapter)">
        {{ chapter }}
      </span>
    </div>
  </el-card>


  <el-dialog
      v-model="chapterContentShow"
      width="100%"
      :before-close="handleClose">
    <div class="chapterContent" v-html="chapterContent.replace(/(\r\n|\n|\r)/gm, '<br />')">
    </div>

  </el-dialog>
</template>

<script setup>
import {onMounted, ref} from 'vue'

import {getHarryPotterResource} from "@/util/resource.js";

const book_contents = ref([])
const chapters = ref([[]])
const chapterShow = ref([])
const chapterContent = ref("")
const chapterContentShow = ref(false)

onMounted(async () => {
  book_contents.value = await getHarryPotterResource("Contents")
  for (let i = 0; i < book_contents.value.length; i++) {
    let content = book_contents.value[i];
    chapters.value[i] = await getHarryPotterResource(content + "/Contents")
    chapterShow.value[i] = false;
  }
})

function clickBook(index) {
  for (let i = 0; i < chapterShow.value.length; i++) {
    if (i === index) {
      chapterShow.value[i] = true;
    } else {
      chapterShow.value[i] = false;
    }
  }
}

function hiddenChapter(index) {
  chapterShow.value[index] = false;
}

async function showChapterContent(content, chapter) {
  chapterContent.value = await getHarryPotterResource(content + "/" + chapter)
  chapterContentShow.value = true
}

function handleClose() {
  chapterContentShow.value = false
}

</script>

<style lang="less" scoped>
.chapterContent {
  height: calc(100vh - 250px);
  overflow: scroll;
  font-size: 18px;
}
</style>

<template>
  <el-row :gutter="20" v-for="(phonics, i) in phonicsList" :key="i" style="margin-bottom: 20px">
    <el-col :span="24">
      <h3>{{ phonics.name }}</h3>
    </el-col>
    <el-col :span="phonicsShowList[i][j] ? 24: 6" v-for="(data, j) in phonics.datas" :key="j" style="margin-top: 20px">
      <el-card>
        <p style="display: flex; justify-content: space-around; font-size: 20px" @click="playPhonicsAudio(data, i, j)">
          <span>{{ data.letter }}</span>
          <span>[{{ data.standard }}]</span>
        </p>
        <div v-if="phonicsShowList[i][j]">
          <el-divider/>
          <el-row :gutter="20" v-for="(word, k) in data.baseWords" :key="k" style="margin-bottom: 10px">
            <el-col :span="6">
              <el-button type="primary" @click="palyWordAudio(word.audio)" style="width: 100%">{{
                  word.word
                }}
              </el-button>
            </el-col>
            <el-col :span="18">
              <span v-for="(standard, l) in word.englishStandards" :key="l" style="margin-right: 20px">
                {{ standard }}
              </span>
            </el-col>
            <el-col :span="18" :offset="6">
              <p>{{ word.chinese }}</p>
            </el-col>
          </el-row>
          <el-button text type="primary" @click="showMoreWord = true" v-if="!showMoreWord">
            more
          </el-button>
          <!-- more-->
          <div v-if="showMoreWord">
            <el-row :gutter="20" v-for="(word, k) in data.moreWords" :key="k" style="margin-bottom: 10px">
              <el-col :span="6">
                <el-button type="primary" @click="palyWordAudio(word.audio)" style="width: 100%">{{
                    word.word
                  }}
                </el-button>
              </el-col>
              <el-col :span="18">
              <span v-for="(standard, l) in word.englishStandards" :key="l" style="margin-right: 20px">
                {{ standard }}
              </span>
              </el-col>
              <el-col :span="18" :offset="6">
                <p>{{ word.chinese }}</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>

  </el-row>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import {getPhonicsJson, getPhonicsVideoCacheUrl, getWordVideoCacheUrl} from '@/util/resource.js';

const phonicsList = ref([
  {
    name: "单个辅音字母",
    type: 1,
    datas: []
  },
  {
    name: "辅音字母组合",
    type: 2,
    datas: []
  },
  {
    name: "单个元音字母（重读开音节）",
    type: 3,
    datas: []
  },
  {
    name: "单个元音字母（重读闭音节）",
    type: 4,
    datas: []
  },
  {
    name: "单个元音字母（非重读）",
    type: 5,
    datas: []
  },
  {
    name: "单个元音字母（其他）",
    type: 6,
    datas: []
  },
  {
    name: "元音字母组合",
    type: 7,
    datas: []
  },
  {
    name: "元音字母组合（其他）",
    type: 8,
    datas: []
  }
])
const audio = new Audio();
const phonicsShowList = ref([])
const showMoreWord = ref(false)

onMounted(async () => {
  phonicsList.value.forEach(phonics => {
    getPhonicsJson(phonics.type).then(datas => {
      phonics.datas = datas
      const showArray = [];
      for (let i = 0; i < datas.length; i++) {
        showArray.push(false)
      }
      phonicsShowList.value.push(showArray)
    })
  })
})

async function playPhonicsAudio(phonics, i, j) {
  showMoreWord.value = false;
  if (phonicsShowList.value[i][j]){
    phonicsShowList.value[i][j] = false;
    return;
  }
  phonicsShowInit();
  phonicsShowList.value[i][j] = true;
  const videoUrl = await getPhonicsVideoCacheUrl(phonics.type + "/" + phonics.audio)
  palyAudio(videoUrl);
}

function phonicsShowInit() {
  for (let i = 0; i < phonicsShowList.value.length; i++) {
    for (let j = 0; j < phonicsShowList.value[i].length; j++) {
      phonicsShowList.value[i][j] = false;
    }
  }
}

async function palyWordAudio(word) {
  const videoUrl = await getWordVideoCacheUrl(word)
  palyAudio(videoUrl);
}

function palyAudio(url) {
  audio.src = url;
  audio.load();
  audio.play();
}
</script>
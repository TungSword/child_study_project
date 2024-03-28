<template>
  <el-row style="text-align: center">
    <el-col :span="12">
      <label>当前关卡：第{{ currentInfo.level }}关</label>
    </el-col>
    <el-col :span="12">
      <label>难度：{{ grades[currentInfo.grade] }}</label>
    </el-col>
  </el-row>

  <el-row class="math_sudoku" style="margin-top: 20px">
    <el-col :span="24" class="sudo_row" v-for="(sudoRow, i) in currentRecordShudu" :key="i">
      <div :class="{sudo_top_border: i === 0,
       sudo_left_border: j === 0,
       sudo_input_box: currentShudu.problem[i][j] === 0,
       click_index_box: isClicked(i, j),
       sudo_input_error: !isTrue(i, j) && !isClicked(i, j) && sudoIndex !== 0,
       sudo_border_bottom_split: (i + 1) % 3 === 0 && i !== 8,
       sudo_border_right_split: (j + 1) % 3 === 0 && j !== 8}"
           class="sudo_index" v-for="(sudoIndex, j) in sudoRow" :key="j"
           @click="clickSudoIndex(i, j)">
        <span v-if="sudoIndex !== 0">
          {{ sudoIndex }}
        </span>
      </div>
    </el-col>
  </el-row>

  <el-row class="math_sudoku" style="margin-top: 20px">
    <el-col :span="24" class="sudo_row">
      <div :class="{sudo_top_border: true, sudo_left_border: i === 1}"
           v-for="i in 9" :key="i" class="sudo_clear" @click="selectNumber(i)">
        <span>{{ i }}</span>
      </div>
      <div class="sudo_clear" @click="selectNumber(0)">
        <span>清除</span>
      </div>
    </el-col>
  </el-row>

  <el-button style=" position: fixed; bottom: 20px; left: 20px" @click="showSelect">选择关卡</el-button>
  <el-button style=" position: fixed; bottom: 20px; right: 20px" type="warning" @click="restart">重新开始</el-button>


  <el-drawer v-model="drawer" :with-header="false" direction="btt" :show-close="false" size="70">
    <el-row>
      <el-col :span="12">
        <el-cascader v-model="selectedValue" :options="shuduOptions"/>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button @click="confirmSelect" type="primary">确认</el-button>
      </el-col>
    </el-row>
  </el-drawer>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getMathShudu} from "@/util/resource.js";
import {ElMessage, ElMessageBox} from 'element-plus'

const grades = ref({
  20: "超级简单",
  25: "很简单",
  30: "简单",
  35: "一般",
  40: "有点困难",
  45: "困难",
})
const shuduContents = ref();
const currentInfo = ref({
  level: 1,
  grade: 20
})
const currentRecordShudu = ref()
const currentShudu = ref({});
const clickIndex = ref({
  i: -1,
  j: -1
})
const drawer = ref(false)
const selectedValue = ref();
const shuduOptions = ref([
  {
    label: "超级简单",
    value: 20,
    children: []
  },
  {
    label: "很简单",
    value: 25,
    children: []
  },
  {
    label: "简单",
    value: 30,
    children: []
  },
  {
    label: "一般",
    value: 35,
    children: []
  },
  {
    label: "有点困难",
    value: 40,
    children: []
  },
  {
    label: "困难",
    value: 45,
    children: []
  },
])

function isClicked(i, j) {
  return clickIndex.value.i === i && clickIndex.value.j === j;
}

function clickSudoIndex(i, j) {
  if (currentShudu.value.problem[i][j] !== 0) {
    return;
  }
  clickIndex.value.i = i;
  clickIndex.value.j = j;
}

function selectNumber(number) {
  if (clickIndex.value.i > -1 && clickIndex.value.j > -1) {
    currentRecordShudu.value[clickIndex.value.i][clickIndex.value.j] = number
    saveShuduInfo();
    successMessage();
  }
}

function successMessage(){
  if (isSuccess()) {
    if (currentInfo.value.level === shuduContents.value.length) {
      ElMessage.success("恭喜你通过最后一关！")
    } else {
      ElMessageBox.alert(`恭喜你，通过第${currentInfo.value.level}关`, '通关成功',
          {
            confirmButtonText: '下一关',
            type: 'success',
            "show-close": false,
            callback: () => {
              currentInfo.value.level++;
              clickIndex.value = {
                i: -1,
                j: -1
              }
              localStorage.setItem("math_shudu_record", "")
              getNewShudu();
              saveShuduInfo();
            }
          })
    }
  }
}

function isTrue(i, j) {
  return currentRecordShudu.value[i][j] === currentShudu.value.answer[i][j]
}

function isSuccess() {
  return JSON.stringify(currentRecordShudu.value) === JSON.stringify(currentShudu.value.answer)
}

function getNewShudu() {
  for (let i = 0; i < shuduContents.value.length; i++) {
    const item = shuduContents.value[i];
    if (item.level === currentInfo.value.level) {
      currentShudu.value = item;
      break;
    }
  }
  currentInfo.value.level = currentShudu.value.level
  currentInfo.value.grade = currentShudu.value.grade
  selectedValue.value = [currentShudu.value.grade, currentShudu.value.level]
  const record = localStorage.getItem("math_shudu_record")
  if (record) {
    currentRecordShudu.value = JSON.parse(record);
  } else {
    currentRecordShudu.value = JSON.parse(JSON.stringify(currentShudu.value.problem))
  }
}

function saveShuduInfo() {
  localStorage.setItem("math_shudu_info", JSON.stringify(currentInfo.value))
  localStorage.setItem("math_shudu_record", JSON.stringify(currentRecordShudu.value))
}

function restart() {
  ElMessageBox.confirm('确定要重新开始吗?', '重新开始',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
    currentRecordShudu.value = JSON.parse(JSON.stringify(currentShudu.value.problem))
    saveShuduInfo()
  })
}

function showSelect() {
  drawer.value = true;
}

function confirmSelect() {
  currentInfo.value = {
    level: selectedValue.value[1],
    grade: selectedValue.value[0],
  }
  drawer.value = false
  localStorage.setItem("math_shudu_record", "")
  getNewShudu();
  saveShuduInfo();
}

onMounted(async () => {
  const saveInfo = localStorage.getItem("math_shudu_info")
  if (saveInfo) {
    currentInfo.value = JSON.parse(saveInfo)
  }
  shuduContents.value = await getMathShudu()

  shuduOptions.value.forEach(option => {
    option.children = [];
    for (let i = 0; i < shuduContents.value.length; i++) {
      const item = shuduContents.value[i];
      if (item.grade === option.value) {
        option.children.push({
          value: item.level,
          label: `第${item.level}关`
        })
      }
    }
  })
  getNewShudu()
  successMessage();
})
</script>

<style lang="less" scoped>
.math_sudoku {
  .sudo_row {
    display: flex;

    .sudo_index {
      width: calc((100vw - 50px) / 9);
      height: calc((100vw - 50px) / 9);
      line-height: calc((100vw - 50px) / 9);
      border-bottom: black solid 1px;
      border-right: black solid 1px;
      text-align: center;
    }

    .sudo_clear {
      width: calc((100vw - 50px) / 10);
      height: calc((100vw - 50px) / 10);
      line-height: calc((100vw - 50px) / 10);
      border-bottom: black solid 1px;
      border-right: black solid 1px;
      border-top: black solid 1px;
      text-align: center;
    }

    .sudo_top_border {
      border-top: black solid 1px;
    }

    .sudo_left_border {
      border-left: black solid 1px;
    }

    .sudo_input_box {
      background-color: #999999;
      color: #ffffff;
    }

    .click_index_box {
      background-color: #FF770F;
      color: #c1c1c1;
    }

    .sudo_input_error {
      background-color: #D7000F;
      color: #F0C2A2;
    }

    .sudo_border_bottom_split {
      border-bottom: #FAC03D solid 2px;
    }

    .sudo_border_right_split {
      border-right: #FAC03D solid 2px;
    }
  }
}
</style>
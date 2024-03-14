<template>
  <div class="math-content">
    <div class="math-select">
      <label style="flex-basis: 120px; flex-shrink: 0">选择难度：</label>
      <el-select v-model="caclMode" placeholder="Select" style="flex-grow: 1" @change="changeCalcMode">
        <el-option
            v-for="item in caclSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="math_calc">
      <span>{{ first }}</span>
      <span>{{ method }}</span>
      <span>{{ second }}</span>
      <span>=</span>
      <br>
      <el-input-number ref="resultRef" resize="true" size="large" class="result_input" v-model="result"
                       :controls="false"></el-input-number>
      <br>
      <el-button class="result_button" type="primary" @click="checkResult">{{ buttonName }}</el-button>
      <br>
    </div>
    <div>
      <el-result v-if="calcSum > 0 && resultVisible" :icon="resultIcon" :title="resultInfo"/>
    </div>

  </div>


</template>

<script>
export default {
  data() {
    return {
      first: 0,
      second: 0,
      result: "",
      method: "+",
      methodCode: 0,
      methods: ["+", "-"],
      refresh: false,
      buttonName: "确 认",
      calcSum: 0,
      errorCount: 0,
      successCount: 0,
      resultIcon: "",
      resultInfo: "",
      resultVisible: true,
      caclMode: 20,
      caclSelect: [
        {
          value: 10,
          label: "10以内加减法"
        },
        {
          value: 20,
          label: "20以内加减法"
        },
        {
          value: 30,
          label: "30以内加减法"
        },
        {
          value: 50,
          label: "50以内加减法"
        },
        {
          value: 100,
          label: "100以内加减法"
        }
      ]
    }
  },
  mounted() {
    const mode = Number(localStorage.getItem("match_calc_mode"))
    if (mode >= 10) {
      this.caclMode = mode
    }
    this.init();
  },
  methods: {
    init() {
      this.methodCode = Math.floor(Math.random() * 10) % 2
      if (this.methodCode === 1) {
        this.first = Math.floor(Math.random() * this.caclMode)
        this.second = Math.floor(Math.random() * this.first);
      } else {
        this.first = Math.floor(Math.random() * this.caclMode)
        this.second = Math.floor(Math.random() * (this.caclMode - this.first + 1));
      }

      this.method = this.methods[this.methodCode]
      this.result = ""
      this.refresh = false;
      this.buttonName = "确 认"
      this.errorCount = 0;
      this.$refs.resultRef.focus();
    },
    calcResult() {
      let calcResult = 0;
      if (this.methodCode === 0) {
        calcResult = this.first + this.second;
      } else if (this.methodCode === 1) {
        calcResult = this.first - this.second;
      }
      return calcResult;
    },
    checkResult() {
      if (this.errorCount >= 3 && !this.refresh) {
        this.result = this.calcResult()
        this.resultInfo = `答案是【${this.result}】，继续努力哦！`
        this.resultIcon = "error"
        this.refresh = true
        this.buttonName = "下一题"
        return;
      }
      if (this.refresh) {
        if (this.errorCount >= 3){
          this.resultVisible = false;
        }
        this.init();
        return;
      }
      this.resultVisible = true;
      if (this.result === this.calcResult()) {
        this.refresh = true
        this.buttonName = "下一题"
        this.successCount++;
        this.calcSum++;
        this.resultInfo = `恭喜你，连续答对【${this.successCount}】题了！`
        this.resultIcon = "success"
      } else {
        this.result = ""
        if (this.errorCount === 0) {
          this.calcSum++;
        }
        this.errorCount++;
        this.resultInfo = `答案是【${this.result}】，继续努力哦！`
        this.resultIcon = "error"
        if (this.successCount >= 10) {
          this.resultInfo = "回答错误，很遗憾连胜失败"
        } else {
          this.resultInfo = "回答错误。"
        }
        this.successCount = 0;
        this.$refs.resultRef.focus();
      }
    },
    changeCalcMode() {
      localStorage.setItem("match_calc_mode", this.caclMode)
    }
  }
}

</script>

<style lang="less" scoped>
.math-content {
  display: flex;
  flex-direction: column;
}

.math_calc {
  font-size: 80px;
  text-align: center;
  flex-grow: 1;

  .result_input {
    width: 80%;
    height: 60px;
  }

  .result_button {
    width: 80%;
    height: 60px;
    font-size: 30px;
  }
}

.el-input--large {
  font-size: 30px !important;
}

.el-select__selected-item {
  font-size: 20px !important;
}

.math-select {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>
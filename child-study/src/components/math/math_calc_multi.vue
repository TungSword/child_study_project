<template>
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
</template>

<script>
export default {
  data() {
    return {
      first: 0,
      second: 0,
      result: "",
      method: "×",
      methodCode: 0,
      methods: ["×", "÷"],
      refresh: false,
      buttonName: "确 认",
      calcSum: 0,
      errorCount: 0,
      successCount: 0,
      resultIcon: "",
      resultInfo: "",
      resultVisible: true,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.second = Math.floor(Math.random() * 10)
      this.first = Math.floor(Math.random() * 10);
      this.methodCode = Math.floor(Math.random() * 10) % 2
      this.method = this.methods[this.methodCode]
      this.result = ""
      this.refresh = false;
      this.buttonName = "确 认"
      if (this.methodCode === 1) {
        this.first = this.first * this.second;
      }
      if (this.methodCode === 1 && this.second === 0) {
        this.init()
      }
      this.errorCount = 0;
      this.$refs.resultRef.focus();
    },
    calcResult() {
      let calcResult = 0;
      if (this.methodCode === 0) {
        calcResult = this.first * this.second;
      } else if (this.methodCode === 1) {
        calcResult = this.first / this.second;
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
    }
  }
}

</script>

<style lang="less" scoped>
.math_calc {
  font-size: 80px;
  width: 100%;
  text-align: center;

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

</style>
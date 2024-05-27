<template>
  <div class="math_calc">
    <span>{{ first }}</span>
    <span>{{ method }}</span>
    <span>{{ second }}</span>
    <span>=</span>
    <br>
    <el-input-number ref="resultRef" resize="true" size="large" class="result_input" v-model="result" :disabled="resultDisabled"
                     :controls="false"></el-input-number>
    <br>
    <el-button class="result_button" type="primary" @click="checkResult">{{ buttonName }}</el-button>
    <br>
  </div>
  <div>
    <el-result v-if="successCount > 0" :icon="resultIcon" :title="`答对【${this.successCount}】题啦!`"/>
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
      resultDisabled: false,
      errorCount: 0,
      successCount: 0,
      resultIcon: "success",
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.resultDisabled = false;
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
      // 防止误触
      if(!this.result && String(this.result).length < 1){
        this.$message('你还没有填写答案！');
        return;
      }

      if (this.refresh) {
        this.init();
        return;
      }

      // 判断计算是否正确
      if (this.result === this.calcResult()) {
        this.refresh = true
        this.buttonName = "下一题"
        this.successCount++;
        this.$message.success(`恭喜你，答对了！`);
      } else {
        this.result = ""
        this.errorCount++;
        if (this.errorCount > 2) {
          this.result = this.calcResult()
          this.$message.error(`答案是【${this.result}】，继续努力哦！`);
          this.refresh = true
          this.buttonName = "下一题"
          this.resultDisabled = true;
        }else {
          this.$message.error('答错了，继续努力！');
          this.$refs.resultRef.focus();
        }
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
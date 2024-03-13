<template>
  <div class="math_calc">
    <span>{{ first }}</span>
    <span>{{ method }}</span>
    <span>{{ second }}</span>
    <span>=</span>
    <br>
    <el-input-number resize="true" size="large" class="result_input" v-model="result" :controls="false"></el-input-number>
    <br>
    <el-button class="result_button" type="primary" @click="checkResult">{{ buttonName }}</el-button>
    <br>

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
      errorCount: 0
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.second = Math.floor(Math.random() * 10)
      this.first = Math.floor(Math.random() * 10) + this.second;
      this.methodCode = Math.floor(Math.random() * 10) % 2
      this.method = this.methods[this.methodCode]
      this.result = ""
      this.refresh = false;
      this.buttonName = "确 认"
    },
    calcResult(){
      let calcResult = 0;
      if (this.methodCode === 0) {
        calcResult = this.first + this.second;
      } else if (this.methodCode === 1) {
        calcResult = this.first - this.second;
      }
      return calcResult;
    },
    checkResult() {
      if (this.errorCount >= 3 && !this.refresh){
        this.result = this.calcResult()
        this.$message.success(`答案是【${this.result}】，继续努力哦！`)
        this.refresh = true
        this.buttonName = "下一题"
        this.errorCount = 0;
        return;
      }
      if (this.refresh) {
        this.init();
        return;
      }
      if (this.result === this.calcResult()) {
        this.refresh = true
        this.$message.success("恭喜你，答对了！")
        this.buttonName = "下一题"
      } else {
        this.result = ""
        this.errorCount++;
        this.$message.error("回答错误。")
      }
    }
  }
}

</script>

<style lang="less">
.math_calc {
  font-size: 100px;
  width: 100%;
  height: calc(100vh - 140px);
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
.el-input--large{
  font-size: 30px !important;
}

</style>
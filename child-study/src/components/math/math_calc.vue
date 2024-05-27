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
      <el-input-number ref="resultRef" resize="true" size="large" class="result_input" v-model="result" :disabled="resultDisabled"
                       :controls="false"></el-input-number>
      <br>
      <el-button class="result_button" type="primary" @click="checkResult">{{ buttonName }}</el-button>
      <br>
    </div>
    <div>
      <el-result v-if="successCount > 0" :icon="resultIcon" :title="`答对【${this.successCount}】题啦!`"/>
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
      resultDisabled: false,
      errorCount: 0,
      successCount: 0,
      resultIcon: "success",
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
      this.resultDisabled = false;
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
        // 同一题目错误三次，直接给出答案
        if (this.errorCount > 2){
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
    },
    changeCalcMode() {
      localStorage.setItem("match_calc_mode", this.caclMode)
      this.init();
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

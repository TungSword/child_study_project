<template>
  <div class="math_calc" @click="calcResult()">
    <span>{{ first }}</span>
    <span>{{ method }}</span>
    <span>{{ second }}</span>
    <span>=</span>
    <br>
    <span>{{ result }}</span>
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
      refresh: false
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
    },
    calcResult() {
      if (this.refresh) {
        this.init();
        return;
      }
      this.refresh = true;
      if (this.methodCode === 0) {
        this.result = String(this.first + this.second);
      } else if (this.methodCode === 1) {
        this.result = String(this.first - this.second);
      }
    }
  }
}

</script>

<style lang="less" scoped>
.math_calc {
  font-size: 100px;
  width: 100%;
  height: calc(100vh - 48px);
  text-align: center;
}
</style>
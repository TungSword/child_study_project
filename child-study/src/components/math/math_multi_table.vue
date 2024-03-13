<template>
  <div class="math_multi_table">
    <div v-for="(subTable, index) in table" :key="index" class="subTable">
      <el-card v-for="(item, j) in subTable" :key="j">{{ item }}</el-card>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      table: [],
      method : "×"
    }
  },
  mounted() {
    this.table = []
    for (let i = 1; i <= 9; i++) {
      const subTable = []
      for (let j = 1; j <= 9; j++) {
        if (i <= j){
          subTable.push(`${i}${this.method}${j}=${i*j}`)
        }
      }
      subTable.reverse()
      this.table.push(subTable)
    }
  }
}
</script>

<style lang="less">
.math_multi_table{
  .subTable{
    display: flex;
  }
  .el-card__body{
    writing-mode: vertical-rl;
    padding: 15px !important;
  }
}

</style>
<template>
  <div class="math_multi_table">
    <div v-for="(subTable, index) in table" :key="index" class="subTable">
      <div v-for="(list, j) in subTable" :key="j" class="math_line">
        <span v-for="item in list">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: [],
      method: "×"
    }
  },
  mounted() {
    this.table = []
    for (let i = 1; i <= 9; i++) {
      const subTable = []
      for (let j = 1; j <= 9; j++) {
        if (i <= j) {
          subTable.push([i, this.method, j, '=', i * j])
        }
      }
      subTable.reverse()
      this.table.push(subTable)
    }
  }
}
</script>

<style lang="less">
.math_multi_table {
  .subTable {
    display: flex;
  }

  .math_line {
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.5);
    writing-mode: vertical-rl;
    display: flex;
    align-items: center;
    padding: 8px !important;
    margin: 2px;
  }
}

</style>

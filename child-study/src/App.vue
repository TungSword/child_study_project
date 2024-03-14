<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <RouterView/>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
}
.homeButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

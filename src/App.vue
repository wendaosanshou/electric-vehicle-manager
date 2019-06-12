<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ly-flex-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.el-btn {
  cursor: pointer;
}
</style>

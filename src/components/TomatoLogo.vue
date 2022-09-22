<template>
  <header>
    <div class="logo"></div>
    <div class="split-line"></div>
    <h1 class="app-name">To-Do-List Alarm System</h1>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  margin: 1.5vw;
  .logo {
    width: 170px;
    height: 40px;
    background: {
      image: url("../src/assets/logo.svg");
      repeat: no-repeat;
    }
  }
  .split-line {
    width: 1px;
    height: 38px;
    background-color: var(--color-main);
    margin-inline: 30px 20px;
  }
  .app-name {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 1.6px;
  }
}
</style>

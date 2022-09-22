<template>
  <div class="setting-container">
    <h3>Time Setting</h3>
    <div class="setting-item-container">Working time <span>25min</span></div>
    <div class="setting-item-container">Resting time <span>5min</span></div>
  </div>
  <div class="setting-container">
    <h3>Alarm</h3>
    <div class="setting-item-container">Volume <span>ON</span></div>
    <div class="setting-item-container">Audio <span>Basic</span></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.setting-container {
  margin-inline: 5vw;
  * {
    font-weight: 100;
    font-size: 1rem;
    letter-spacing: 0.15rem;
  }
  h3 {
    font-size: 1.5rem;
    margin-block: 10vh 2.5vh;
  }
  .setting-item-container {
    display: flex;
    justify-content: space-between;
    margin-inline-start: 1vw;
    margin-block: 1vh;
    padding-block: 1vh;
    border-bottom: 1px dashed;
  }
}
</style>

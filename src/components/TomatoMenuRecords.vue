<template>
  <div class="task-count-container">
    <div class="count-item">
      Today
      <span>7</span>
    </div>
    <div class="count-item">
      Weekly
      <span>60</span>
    </div>
    <div class="count-item">
      Totoally
      <span>102</span>
    </div>
  </div>
  <div class="task-chart-container"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.task-count-container {
  display: flex;
  justify-content: space-evenly;
  margin-inline-end: 5vw;
  .count-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    letter-spacing: 0.1rem;
    span {
      margin-block-start: 10px;
      font-size: 3rem;
    }
  }
}
</style>

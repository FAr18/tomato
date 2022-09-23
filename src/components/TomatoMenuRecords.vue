<template>
  <div class="records-container">
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
    <div class="task-chart-date-container">
      <button class="arrow left"></button>
      <div class="today-label">9/18 - 9/24</div>
      <button class="arrow right"></button>
    </div>
    <div class="task-chart-container" ref="chartContainer">
      <TomatoChartRecords :width="chartWidth" :height="chartHeight" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TomatoChartRecords from "./TomatoChartRecords.vue";

const chartContainer = ref(null);
const chartWidth = ref(0);
const chartHeight = ref(0);

const updateChartSize = () => {
  chartWidth.value = chartContainer.value.clientWidth;
  chartHeight.value = chartContainer.value.clientHeight;
};

onMounted(() => {
  updateChartSize();
  window.addEventListener("resize", updateChartSize());
});
</script>

<style lang="scss" scoped>
.records-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-inline-end: 5vw;
}
.task-count-container {
  display: flex;
  justify-content: space-evenly;
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
.task-chart-date-container {
  align-self: flex-end;
  display: flex;
  align-items: center;
  margin-block: 10vh 1vh;
  font-size: 0.8rem;
  letter-spacing: 0.16rem;
  button {
    width: 12px;
    height: 12px;
    margin-inline: 1vw;
    border: none;
    outline: none;
    background: none;
    background: {
      repeat: no-repeat;
      size: contain;
      position: center;
    }
    &.left {
      background-image: url("../assets/arrow_left.svg");
    }
    &.right {
      background-image: url("../assets/arrow_right.svg");
    }
  }
}
.task-chart-container {
  flex: 1;
}
</style>

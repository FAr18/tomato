<template>
  <div class="records-container">
    <div class="task-count-container">
      <div class="count-item">
        Today
        <span>{{ todayFinished }}</span>
      </div>
      <div class="count-item">
        Weekly
        <span>{{ weeklyFinished }}</span>
      </div>
      <div class="count-item">
        Totoally
        <span>-</span>
      </div>
    </div>
    <div class="task-chart-date-container">
      <button class="arrow left" @click="gotoPrevWeek"></button>
      <div class="today-label">{{ formattedDateRange }}</div>
      <button class="arrow right" @click="gotoNextWeek"></button>
    </div>
    <div class="task-chart-container" ref="chartContainer">
      <TomatoChartRecords
        :width="chartWidth"
        :height="chartHeight"
        :chart-data="weeklyChartData"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import TomatoChartRecords from "./TomatoChartRecords.vue";
import { useTasksStore, getDateKey } from "../stores/tasks";
import { tomatoStorage } from "../tools/localstorage";

const { todayTasks } = useTasksStore();

const chartContainer = ref(null);
const chartWidth = ref(0);
const chartHeight = ref(0);

const MILLISECOND_PER_DAY = 86400000;

const updateChartSize = () => {
  chartWidth.value = chartContainer.value.clientWidth;
  chartHeight.value = chartContainer.value.clientHeight;
};

const startDatetime = new Date().getTime();
const specifiedDate = ref(startDatetime);
const currentDateRange = computed(() => {
  const date = new Date(specifiedDate.value);
  const timeDiff = date.getDay() * MILLISECOND_PER_DAY;
  const firstDate = specifiedDate.value - timeDiff;
  return {
    firstDate,
    lastDate: firstDate + 6 * MILLISECOND_PER_DAY,
  };
});

const todayFinished = computed(() => {
  return todayTasks.reduce((accumulater, currentValue) => {
    return accumulater + (currentValue.isDone == true ? 1 : 0);
  }, 0);
});
const weeklyFinished = ref(0);
const TotoallyFinished = ref(0);

const formattedDateRange = computed(() => {
  const firstDate = new Date(currentDateRange.value.firstDate);
  const lastDate = new Date(currentDateRange.value.lastDate);
  const firstDateStr = `${firstDate.getMonth() + 1}/${firstDate.getDate()}`;
  const lastDateStr = `${lastDate.getMonth() + 1}/${lastDate.getDate()}`;
  return `${firstDateStr} - ${lastDateStr}`;
});

const weeklyChartData = computed(() => {
  const weeklyLabels = [];
  const weeklyData = [];
  for (
    let time = currentDateRange.value.firstDate;
    time <= currentDateRange.value.lastDate;
    time += MILLISECOND_PER_DAY
  ) {
    const date = new Date(time);
    const key = getDateKey(date);
    weeklyLabels.push(`${date.getMonth() + 1}/${date.getDate()}`);
    weeklyData.push(
      tomatoStorage.getData(key).reduce((accumulater, currentValue) => {
        return accumulater + (currentValue.isDone == true ? 1 : 0);
      }, 0)
    );
  }
  return { labels: weeklyLabels, datasets: [{ data: weeklyData }] };
});

const gotoPrevWeek = () => {
  specifiedDate.value -= MILLISECOND_PER_DAY * 7;
};

const gotoNextWeek = () => {
  specifiedDate.value += MILLISECOND_PER_DAY * 7;
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
    cursor: pointer;
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

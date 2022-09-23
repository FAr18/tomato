<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="width"
    :height="height"
    :styles="styles"
    ref="lineChart"
  />
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { onMounted, reactive, ref } from "vue";

ChartJS.register(Filler, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
});

const lineChart = ref(null);

const chartData = reactive({
  labels: ["9/18", "9/19", "9/20", "9/21", "9/22", "9/23", "9/24"],
  datasets: [{ data: [12, 9, 7, 9, 10, 6, 7] }],
});

const chartColor = "#F2F0C9";
const chartOptions = reactive({
  responsive: true,
  elements: {
    point: {
      radius: 3,
      backgroundColor: chartColor,
      hoverRadius: 6,
      hoverBackgroundColor: chartColor,
    },
    line: {
      borderColor: chartColor,
      borderWidth: 1,
      backgroundColor: chartColor,
      fill: true,
    },
  },
  scales: {
    yAxis: {
      min: 0,
      ticks: {
        color: chartColor,
        font: {
          family: "'Century Gothic'",
        },
      },
    },
    xAxis: {
      grid: {
        display: false,
      },
      ticks: {
        color: chartColor,
        font: {
          family: "'Century Gothic'",
        },
      },
    },
  },
});

onMounted(() => {
  const ctx = document.getElementById("line-chart").getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#F2F0C940");
  gradient.addColorStop(1, "#F2F0C900");

  chartOptions.elements.line.backgroundColor = gradient;
});
</script>

<style lang="scss" scoped>
.chart {
  color: var(--color-main);
}
</style>

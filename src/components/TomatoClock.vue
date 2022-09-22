<template>
  <div class="clock-container" ref="clockContainer">
    <CircleProgressBar :size="progressSize" :progress="progressValue" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CircleProgressBar from "./CircleProgressBar.vue";
const progressValue = ref(0);
const progressSize = ref(0);

const clockContainer = ref(null);

// const increaseProgress = () => {
//   progressValue.value = Math.min(progressValue.value + 1, 100);
// };

// // const test = () => {
// //   setTimeout(() => {
// //     increaseProgress();
// //     test();
// //   }, 1000);
// // };

// // onMounted(() => {
// //   progressSize.value = clockContainer.value.clientHeight;
// //   window.addEventListener("resize", () => {
// //     progressSize.value = clockContainer.value.clientHeight;
// //   });
// //   test();
// // });
</script>

<style lang="scss" scoped>
.clock-container {
  width: 50vh;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<template>
  <div
    class="clock-container"
    :class="{ 'is-menu-opened': isMenuOpened }"
    ref="clockContainer"
  >
    <CircleProgressBar :size="progressSize" :progress="progressValue" :stroke-width="5" />
    <div class="info-container">
      <h2 class="current-task-title">Clean up the desk</h2>
      <h2 class="time">06 : 15</h2>
      <div class="control-container">
        <div class="control-button ring"></div>
        <div class="control-button play"></div>
        <div class="control-button skip"></div>
      </div>
    </div>
    <div class="next-task">Next: Feed the cat</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CircleProgressBar from "./CircleProgressBar.vue";
const progressValue = ref(0);
const progressSize = ref(0);

const clockContainer = ref(null);

const props = defineProps({
  isMenuOpened: {
    type: Boolean,
    default: false,
  },
});

const increaseProgress = () => {
  if (progressValue.value >= 100) {
    progressValue.value = 0;
  } else {
    progressValue.value++;
  }
};

const test = () => {
  setTimeout(() => {
    increaseProgress();
    test();
  }, 500);
};

onMounted(() => {
  progressSize.value = clockContainer.value.clientHeight;
  window.addEventListener("resize", () => {
    progressSize.value = clockContainer.value.clientHeight;
  });
  test();
});
</script>

<style lang="scss" scoped>
.clock-container {
  width: 50vh;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: left 1s;
  &.is-menu-opened {
    left: 25%;
  }
  svg {
    position: absolute;
    filter: drop-shadow(0px 3px 6px #a2050563);
  }
  .next-task {
    font-size: 1.2rem;
    letter-spacing: 0.12rem;
    text-align: center;
    bottom: -10vh;
    position: absolute;
    width: 100%;
    opacity: 0.5;
  }
}

.info-container {
  width: 65%;
  height: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  * {
    height: 40px;
    flex: 1;
  }
  .current-task-title {
    font-size: 1.2rem;
    font-weight: 100;
    letter-spacing: 0.15rem;
    text-indent: 0.15rem;
  }
  .time {
    font-size: 4rem;
    font-weight: 100;
    letter-spacing: 0.4rem;
    text-indent: 0.4rem;
  }
}

.control-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .control-button {
    width: 5vh;
    height: 5vh;
    background: {
      size: contain;
      repeat: no-repeat;
    }
    margin-inline: 1vw;
    cursor: pointer;
    &.ring {
      background-image: url("../assets/icon_ring.svg");
    }
    &.play {
      background-image: url("../assets/icon_play.svg");
    }
    &.skip {
      background-image: url("../assets/icon_skip.svg");
    }
  }
}
</style>

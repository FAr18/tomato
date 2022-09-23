<template>
  <div
    class="clock-container"
    :class="{ 'is-menu-opened': menuOpened }"
    ref="clockContainer"
  >
    <CircleProgressBar :size="progressSize" :progress="progressValue" :stroke-width="5" />
    <div class="info-container">
      <h2 class="current-task-title">{{ currentTaskTitle }}</h2>
      <h2 class="time">{{ timeLeftStr }}</h2>
      <div class="control-container">
        <div class="control-button ring"></div>
        <div class="control-button play" @click="playTimer"></div>
        <div class="control-button skip"></div>
      </div>
    </div>
    <div class="next-task">Next: Feed the cat</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CircleProgressBar from "./CircleProgressBar.vue";
import { storeToRefs } from "pinia";
import { useViewStore } from "../stores/view";
import { useTasksStore } from "../stores/tasks";

const viewStatus = useViewStore();
const { menuOpened } = storeToRefs(viewStatus);

const tasks = useTasksStore();
const { todayTasks } = tasks;

const clockContainer = ref(null);

const currentTaskIndex = ref(-1);
const currentTaskTitle = computed(() => {
  return clockType == "task"
    ? (todayTasks[currentTaskIndex.value] && todayTasks[currentTaskIndex.value].title) ||
        "Nothing to do"
    : "Resting";
});

const progressValue = ref(0);
const progressSize = ref(0);

let clockType = "task";
const maxTime = computed(() => {
  return clockType == "task" ? 25 * 60 : 5 * 60;
});
const timeLeft = ref(1000);
const timeLeftStr = computed(() => {
  progressValue.value = (timeLeft.value / maxTime.value) * 100;
  const min = Math.floor(timeLeft.value / 60);
  const sec = timeLeft.value % 60;
  return `${min > 9 ? min : "0" + min} : ${sec > 9 ? sec : "0" + sec}`;
});

let timer = null;
const setupTimer = () => {
  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value == 0) {
      if (clockType == "task") {
        clockType = "rest";
        timeLeft.value = maxTime.value;
      } else if (clockType == "rest") {
        clockType = "task";
        timeLeft.value = maxTime.value;
      }
    }
  }, 1000);
};

const playTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    setupTimer();
  }
};

onMounted(() => {
  progressSize.value = clockContainer.value.clientHeight;
  window.addEventListener("resize", () => {
    progressSize.value = clockContainer.value.clientHeight;
  });

  // find first task
  for (let i = 0; i < todayTasks.length; i++) {
    if (!todayTasks[i].isDone) {
      currentTaskIndex.value = i;
      break;
    }
  }
  timeLeft.value = maxTime.value;
  // setupTimer();
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
      size: 4.95vh;
      repeat: no-repeat;
      position: center;
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

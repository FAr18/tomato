<template>
  <div class="background-container">
    <div class="top-element" :class="{ hide: menuOpened }"></div>
    <div class="left-element"></div>
    <div class="bottom-element" :class="{ hide: menuOpened }"></div>
    <div class="right-element" :class="{ 'is-opened': menuOpened }"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useViewStore } from "../stores/view";

const viewStatus = useViewStore();
const { menuOpened } = storeToRefs(viewStatus);
</script>

<style lang="scss" scoped>
.background-container {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: -1;
  & > * {
    position: absolute;
    transition: 1s;
  }
  .left-element,
  .right-element {
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 65vh;
    width: 65vh;
    background: linear-gradient(#bc2b35, #d9343f);
  }
  .right-element {
    left: 100%;
    &.is-opened {
      height: 100vw;
      width: 100vw;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  .top-element,
  .bottom-element {
    background: {
      repeat: no-repeat;
      size: contain;
    }
  }
  .top-element {
    width: 30vh;
    height: 30vh;
    top: 0;
    left: 20vw;
    background-image: url("../assets/bg_component_2.svg");
    &.hide {
      top: -30vh;
    }
  }
  .bottom-element {
    width: 40vh;
    height: 40vh;
    bottom: 0;
    right: 20vw;
    background-image: url("../assets/bg_component.svg");
    background-position: bottom;
    &.hide {
      bottom: -40vh;
    }
  }
}
</style>

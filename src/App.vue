<template>
  <TomatoBackground :is-menu-opened="isMenuOpened" />
  <TomatoLogo />
  <TomatoClock :is-menu-opened="isMenuOpened" />
  <TomatoQuicklyCreate :is-menu-opened="isMenuOpened" />
  <TomatoMenuButton :is-menu-opened="isMenuOpened" @toggle-menu="toggleMenu" />
  <TomatoSideMenuButton :is-menu-opened="isMenuOpened" />
  <div class="side-menu-container" :class="{ close: !isMenuOpened }"></div>
</template>

<script setup>
import TomatoLogo from "./components/TomatoLogo.vue";
import TomatoBackground from "./components/TomatoBackground.vue";
import TomatoClock from "./components/TomatoClock.vue";
import TomatoQuicklyCreate from "./components/TomatoQuicklyCreate.vue";
import TomatoMenuButton from "./components/TomatoMenuButton.vue";
import TomatoSideMenuButton from "./components/TomatoSideMenuButton.vue";
import { ref, onMounted } from "vue";
const isMenuOpened = ref(false);

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};

const test = () => {
  setTimeout(() => {
    isMenuOpened.value = !isMenuOpened.value;
    test();
  }, 3000);
};
onMounted(() => {
  // test();
});
</script>

<style lang="scss" scoped>
.side-menu-container {
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transition: 1s;
  &.close {
    right: -40vw;
    opacity: 0;
  }
}
</style>

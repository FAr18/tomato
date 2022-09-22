<template>
  <TomatoBackground :is-menu-opened="isMenuOpened" />
  <TomatoLogo />
  <TomatoClock :is-menu-opened="isMenuOpened" />
  <TomatoQuicklyCreate :is-menu-opened="isMenuOpened" />
  <TomatoMenuButton :is-menu-opened="isMenuOpened" @toggle-menu="toggleMenuOpen" />
  <TomatoSideMenuButton
    :is-menu-opened="isMenuOpened"
    :current-tab="currentMenu"
    @toggle-menu="toggleMenu"
    @toggle-menu-open="toggleMenuOpen"
  />
  <div class="side-menu-container" :class="{ close: !isMenuOpened }">
    <TomatoMenuTasks v-if="currentMenu == 'tasks'" />
    <TomatoMenuRecords v-if="currentMenu == 'records'" />
    <TomatoMenuSettings v-if="currentMenu == 'settings'" />
  </div>
</template>

<script setup>
import TomatoLogo from "./components/TomatoLogo.vue";
import TomatoBackground from "./components/TomatoBackground.vue";
import TomatoClock from "./components/TomatoClock.vue";
import TomatoQuicklyCreate from "./components/TomatoQuicklyCreate.vue";
import TomatoMenuButton from "./components/TomatoMenuButton.vue";
import TomatoSideMenuButton from "./components/TomatoSideMenuButton.vue";
import TomatoMenuTasks from "./components/TomatoMenuTasks.vue";
import TomatoMenuRecords from "./components/TomatoMenuRecords.vue";
import TomatoMenuSettings from "./components/TomatoMenuSettings.vue";
import { ref, onMounted } from "vue";

const isMenuOpened = ref(false);
const currentMenu = ref("tasks");

const toggleMenuOpen = () => {
  isMenuOpened.value = !isMenuOpened.value;
};

const toggleMenu = (tabs) => {
  currentMenu.value = tabs;
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
  height: 60vh;
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

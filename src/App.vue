<template>
  <TomatoBackground :is-menu-opened="isMenuOpened" />
  <TomatoLogo />
  <TomatoClock :is-menu-opened="isMenuOpened" />
  <TomatoQuicklyCreate :is-menu-opened="isMenuOpened" />
  <TomatoMenuButton :is-menu-opened="isMenuOpened" @toggle-menu="toggleMenu" />
  <TomatoSideMenuButton :is-menu-opened="isMenuOpened" />
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
  console.log("test");
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

<style lang="scss" scoped></style>

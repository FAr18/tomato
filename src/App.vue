<template>
  <TomatoBackground :is-menu-opened="isMenuOpened" />
  <TomatoLogo />
  <TomatoClock :is-menu-opened="isMenuOpened" />
</template>

<script setup>
import TomatoLogo from "./components/TomatoLogo.vue";
import TomatoBackground from "./components/TomatoBackground.vue";
import TomatoClock from "./components/TomatoClock.vue";
import { ref, onMounted } from "vue";
const isMenuOpened = ref(false);
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="menu-button"
    :class="{ 'is-menu-opened': isMenuOpened }"
    @click="emits('toggleMenu')"
  ></div>
</template>
<script setup>
const props = defineProps({
  isMenuOpened: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["toggleMenu"]);
</script>

<style lang="scss" scoped>
.menu-button {
  position: absolute;
  top: 5vh;
  right: 5vh;
  width: 40px;
  height: 40px;
  transition: 1s;
  cursor: pointer;
  background: {
    image: url("../assets/icon_menu.svg");
    repeat: no-repeat;
    size: contain;
  }
  &.is-menu-opened {
    background-image: url("../assets/icon_close.svg");
  }
}
</style>

<template>
  <div class="side-menu-buttons-container" :class="{ 'is-menu-opened': isMenuOpened }">
    <div
      class="side-menu-button tasks"
      :class="{ active: currentTab == 'tasks' }"
      @click="toggleMenu('tasks')"
    ></div>
    <div
      class="side-menu-button records"
      :class="{ active: currentTab == 'records' }"
      @click="toggleMenu('records')"
    ></div>
    <div
      class="side-menu-button settings"
      :class="{ active: currentTab == 'settings' }"
      @click="toggleMenu('settings')"
    ></div>
  </div>
</template>
<script setup>
const props = defineProps({
  isMenuOpened: {
    type: Boolean,
    default: false,
  },
  currentTab: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["toggleMenu", "toggleMenuOpen"]);
const toggleMenu = (tab) => {
  emits("toggleMenu", tab);
  if (!props.isMenuOpened) {
    emits("toggleMenuOpen");
  }
};
</script>

<style lang="scss" scoped>
.side-menu-buttons-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  right: 5vh;
  transform: translateY(-50%);
  transition: 1s;
  &.is-menu-opened {
    right: 50vw;
    transform: translate(50%, -50%);
    .side-menu-button:not(.active) {
      background-color: #bc2b35;
      &::after {
        opacity: 0.5;
      }
    }
  }
  .side-menu-button {
    width: 4rem;
    height: 4rem;
    position: relative;
    margin-block: 15px;
    border-radius: 50%;
    border: 1px solid var(--color-main);
    background-color: #d9343f;
    transition: 1s;
    cursor: pointer;
    &::after {
      content: "";
      width: 50%;
      height: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.5s;
      background: {
        repeat: no-repeat;
        size: contain;
        position: center;
      }
    }
    &.tasks::after {
      background-image: url("../assets/icon_button_task.svg");
    }
    &.records::after {
      background-image: url("../assets/icon_button_records.svg");
    }
    &.settings::after {
      background-image: url("../assets/icon_button_settings.svg");
    }
  }
}
</style>

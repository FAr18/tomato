<template>
  <div class="quickly-create-container" :class="{ close: menuOpened }">
    <input type="text" placeholder="Add a new mission..." />
    <button type="button"></button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useViewStore } from "../stores/view";

const viewStatus = useViewStore();
const { menuOpened } = storeToRefs(viewStatus);
</script>

<style lang="scss" scoped>
.quickly-create-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5vw;
  display: flex;
  align-items: center;
  transition: 1s;
  &.close {
    left: -20vw;
  }
  * {
    background: none;
    border: none;
    outline: none;
  }
  input {
    width: 15vw;
    border-block-end: 1px solid var(--color-main);
    padding-block: 10px;
    &::placeholder {
      font-size: 1rem;
      letter-spacing: 0.1rem;
      color: var(--color-main);
      opacity: 0.55;
    }
  }
  button {
    width: 20px;
    height: 20px;
    margin: 3px;
    background: {
      image: url("../assets/icon_add.svg");
      repeat: no-repeat;
      size: contain;
    }
    cursor: pointer;
  }
}
</style>

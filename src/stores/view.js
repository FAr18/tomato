import { defineStore } from "pinia";
import { ref } from 'vue';
export const useViewStore = defineStore('view', () => {
  const menuOpened = ref(false);
  const currentMenu = ref('tasks');

  const toggleMenuOpen = toggle => {
    menuOpened.value = toggle;
  }
  const toggleMenu = menu => {
    currentMenu.value = menu;
    if (!menuOpened.value) menuOpened.value = true;
  }

  return {
    menuOpened,
    currentMenu,

    toggleMenuOpen,
    toggleMenu,
  }
});

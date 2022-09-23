const CONFIG_KEY = 'TOMATO_CONFIG';
export const tomatoStorage = {
  getData(date) {
    return JSON.parse(localStorage.getItem(date) || '[]');
  },
  saveData(date, tasks) {
    localStorage.setItem(date, JSON.stringify(tasks));
  },
  loadConfig() {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || '[]');
  },
  saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  }
};

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { tomatoStorage } from '../tools/localstorage';
export const useTasksStore = defineStore('tasks', () => {
  const currentDate = getTodayKey();
  const todayTasks = reactive(tomatoStorage.getData(currentDate));

  const insertTask = (newTask) => {
    todayTasks.push({
      title: newTask,
      isDone: false
    });
    tomatoStorage.saveData(currentDate, todayTasks);
  };

  const changeTaskState = (taskId, isDone) => {
    todayTasks[taskId].isDone = isDone;
    tomatoStorage.saveData(currentDate, todayTasks);
  };

  return {
    todayTasks,

    insertTask,
    changeTaskState
  }
});

const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;
};

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { tomatoStorage } from '../tools/localstorage';
export const useTasksStore = defineStore('tasks', () => {
  const currentDateKey = getDateKey(new Date());
  const todayTasks = reactive(tomatoStorage.getData(currentDateKey));

  const insertTask = (newTask) => {
    todayTasks.push({
      title: newTask,
      isDone: false
    });
    tomatoStorage.saveData(currentDateKey, todayTasks);
  };

  const changeTaskState = (taskId, isDone) => {
    todayTasks[taskId].isDone = isDone;
    tomatoStorage.saveData(currentDateKey, todayTasks);
  };

  return {
    todayTasks,

    insertTask,
    changeTaskState
  }
});

export const getDateKey = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

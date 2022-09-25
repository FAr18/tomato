<template>
  <div class="tasks-container">
    <div class="create-task-container">
      <input type="text" placeholder="Add new mission" v-model="newTaskText" />
      <button type="button" @click="insertNewTask"></button>
    </div>
    <div class="today-tasks-container">
      <div class="date-container">
        <button class="arrow left" @click="prevDate"></button>
        <div class="today-label">{{ dateString }}</div>
        <button class="arrow right" @click="nextDate"></button>
      </div>
      <div class="tasks-list-container">
        <label
          class="task-item-container"
          v-for="(todo, index) in dateTasks"
          :key="index"
        >
          <input type="checkbox" :checked="todo.isDone" @click="updateDone(index)" />
          <span class="checkmark"></span>
          <div class="content">{{ todo.title }}</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTasksStore } from "../stores/tasks";
import { tomatoStorage } from "../tools/localstorage";
const tasks = useTasksStore();
const { todayTasks, insertTask, changeTaskState } = tasks;

const MILLISECOND_PER_DAY = 86400000;

const tempToday = new Date().getTime();
const specifiedDate = ref(tempToday);

const getDateKey = () => {
  const date = new Date(specifiedDate.value);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const loadSpecifiedDateTodos = () => {
  return tomatoStorage.getData(getDateKey());
};

const dateTasks = computed(() => {
  forceUpdate.value;
  return specifiedDate.value == tempToday ? todayTasks : loadSpecifiedDateTodos();
});

const dateString = computed(() => {
  const date = new Date(specifiedDate.value);
  return `${date.getMonth() + 1}, ${date.getDate()} ${date.getFullYear()}`;
});

const prevDate = () => {
  specifiedDate.value -= MILLISECOND_PER_DAY;
};

const nextDate = () => {
  specifiedDate.value += MILLISECOND_PER_DAY;
};

const forceUpdate = ref(false);
const newTaskText = ref("");
const insertNewTask = () => {
  if (newTaskText.value == "") return;
  if (specifiedDate.value == tempToday) {
    insertTask(newTaskText.value);
  } else {
    const key = getDateKey();
    const otherDateTasks = loadSpecifiedDateTodos();
    otherDateTasks.push({
      title: newTaskText.value,
      isDone: false,
    });
    tomatoStorage.saveData(key, otherDateTasks);
  }
  forceUpdate.value = !forceUpdate.value;
  newTaskText.value = "";
};

const updateDone = (index) => {
  if (specifiedDate.value == tempToday) {
    changeTaskState(index, !todayTasks[index].isDone);
  } else {
    const key = getDateKey();
    const otherDateTasks = loadSpecifiedDateTodos();
    console.table(otherDateTasks);
    otherDateTasks[index].isDone = !otherDateTasks[index].isDone;
    tomatoStorage.saveData(key, otherDateTasks);
  }
};
</script>

<style lang="scss" scoped>
.tasks-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .today-tasks-container {
    flex: 1;
  }
}
.create-task-container {
  background-color: #f2f0c9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-inline: 4vw;
  * {
    border: none;
    outline: none;
    background: none;
  }
  input {
    font-size: 1.2rem;
    color: #bc2b35;
    margin-inline-end: 10px;
    flex: 1;
    &::placeholder {
      color: #bc2b35;
      letter-spacing: 0.12rem;
      opacity: 0.5;
    }
  }
  button {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: {
      image: url("../assets/icon_add_heavy.svg");
      repeat: no-repeat;
      size: contain;
      position: center;
    }
  }
}
.today-tasks-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-inline: 4vw;
  margin-block-start: 20px;
  .date-container {
    height: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background-color: #e9414c;
    &::before {
      content: "";
      width: 15px;
      height: 15px;
      position: absolute;
      top: 50%;
      left: 5%;
      transform: translate(-50%, -50%);
      background: {
        image: url("../assets/icon_date.svg");
        repeat: no-repeat;
        size: contain;
        position: center;
      }
    }
    .arrow {
      width: 15px;
      height: 15px;
      outline: none;
      border: none;
      cursor: pointer;
      background: none;
      background: {
        repeat: no-repeat;
        size: contain;
        position: center;
      }
      &.left {
        background-image: url("../assets/arrow_left.svg");
      }
      &.right {
        background-image: url("../assets/arrow_right.svg");
      }
    }
    .today-label {
      font-size: 1rem;
      letter-spacing: 0.1rem;
      margin-inline: 20px;
    }
  }
  .tasks-list-container {
    flex: 1;
    border-radius: 0 0 10px 10px;
    background-color: #bc2b35;
    padding: 30px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
.task-item-container {
  display: flex;
  align-items: center;
  padding-inline: 30px;
  position: relative;
  cursor: pointer;
  input {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
    &:checked ~ .checkmark {
      background-image: url("../assets/icon_checked.svg");
    }
    &:checked ~ * {
      opacity: 0.5;
    }
  }
  .checkmark {
    width: 20px;
    height: 20px;
    margin: 10px;
    background: {
      image: url("../assets/icon_unchecked.svg");
      repeat: no-repeat;
      size: contain;
      position: center;
    }
  }
  .content {
    flex: 1;
    padding-block: 5px;
    border-bottom: 1px dashed;
  }
}
</style>

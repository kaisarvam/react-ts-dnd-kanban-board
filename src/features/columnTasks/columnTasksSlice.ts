import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ColumnType, TaskColors } from "../../utils/enums";
import { TaskModel } from "../../utils/models";
import { swap } from "../../utils/helper";

const MAX_TASK_PER_COLUMN = 3;

const randomEnum = (anEnum: TaskColors) => {
  console.log("inside enum function :", anEnum);
  const enumValues = Object.keys(anEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};


const FirstState = {
  Todo: [
    {
      id: uuidv4(),
      title: "Task 1",
      column: ColumnType.TO_DO,
      color: randomEnum(TaskColors),
    },
  ],
  "In Progress": [
    {
      id: uuidv4(),
      title: "Task 2",
      column: ColumnType.IN_PROGRESS,
      color: randomEnum(TaskColors),
    },
  ],
  Blocked: [
    {
      id: uuidv4(),
      title: "Task 3",
      column: ColumnType.BLOCKED,
      color: randomEnum(TaskColors),
    },
  ],
  Done: [
    {
      id: uuidv4(),
      title: "Task 4",
      column: ColumnType.DONE,
      color: randomEnum(TaskColors),
    },
  ],
};

const setToLocalStorage = (value: { [key in ColumnType]: TaskModel[] }) => {
  window.localStorage.setItem("task", JSON.stringify(value));
};

const PresentState = JSON.parse(window.localStorage.getItem("task") || null);

const columnTasksSlice = createSlice({
  name: "columnTasks",
  initialState: PresentState || FirstState,
  reducers: {
    addNewTodoTask: (state, action) => {
      const allTasks = current(state);
      console.log("found new todo task payload",action.payload);
      const title = action.payload;

      const columnTasks = state[ColumnType.TO_DO];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        console.log("Too many Task !!");
        return allTasks;
      }
      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: title,
        column: ColumnType.TO_DO,
        color: randomEnum(TaskColors),
      };

      const Final = {
        ...allTasks,
        [ColumnType.TO_DO]: [newColumnTask, ...columnTasks],
      };

      setToLocalStorage(Final);

      return { ...Final };
    },
    addNewTask: (state, action) => {
      const allTasks = current(state);
      const column = action.payload;

      const columnTasks = state[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        console.log("Too many Task !!");
        return allTasks;
      }
      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: `new ${column} task`,
        column: column,
        color: randomEnum(TaskColors),
      };

      const Final = {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };

      setToLocalStorage(Final);

      return { ...Final };
    },
    deleteTheTask: (state, action) => {
      const allTasks = current(state);

      const id = action.payload.Id;
      const column = action.payload.Column;
      const columnTasks = allTasks[column];
      const Final = {
        ...allTasks,
        [column]: columnTasks.filter((task: TaskModel) => {
          return task.id !== id;
        }),
      };

      window.localStorage.setItem("task", JSON.stringify(Final));

      return {
        ...Final,
      };
    },
    updateTheTask: (state, action) => {
      const allTasks = current(state);
      console.log("found state in update task :", current(state));

      const id = action.payload.Id;
      const updatedTask = action.payload.newTask;
      const column = action.payload.newTask.column;
      const columnTasks = allTasks[column];

      const Final = {
        ...allTasks,
        [column]: columnTasks.map((task: TaskModel) => {
          return task.id === id ? { ...task, ...updatedTask } : task;
        }),
      };

      setToLocalStorage(Final);

      return {
        ...Final,
      };
    },
    dropTheTask: (state, action) => {
      const allTasks = current(state);
      const from = action.payload.from;
      const id = action.payload.Id;
      const column = action.payload.column;
      const fromColumnTasks = allTasks[from];
      const toColumnTasks = allTasks[column];
      console.log("from column Task :", fromColumnTasks);
      console.log("to column Task :", allTasks[column]);

      const movingTask = fromColumnTasks.find((task: TaskModel) => {
        console.log("task id in move check :", task.id, id);

        return task.id === id;
      });

      if (!movingTask) {
        console.log("not moved !!");

        return allTasks;
      }
      console.log(" !! moved !!");
      const Final = {
        ...allTasks,
        [from]: fromColumnTasks.filter((task: TaskModel) => {
          return task.id !== id;
        }),
        [column]: [{ ...movingTask, column }, ...toColumnTasks],
      };

      setToLocalStorage(Final);

      return { ...Final };
    },
    dropHoverHandle: (state, action) => {
      const allTasks = current(state);
      const column = action.payload.column;
      const i = action.payload.i;
      const j = action.payload.j;

      const columnTasks = allTasks[column];
      const Final = {
        ...allTasks,
        [column]: swap(columnTasks, i, j),
      };

      setToLocalStorage(Final);

      return {
        ...Final,
      };
    },
  },
});

export default columnTasksSlice.reducer;
export const {
  addNewTodoTask,
  addNewTask,
  deleteTheTask,
  updateTheTask,
  dropTheTask,
  dropHoverHandle,
} = columnTasksSlice.actions;
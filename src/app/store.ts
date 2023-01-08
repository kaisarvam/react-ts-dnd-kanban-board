import { configureStore } from "@reduxjs/toolkit";
import columnTasksSlice from "../features/columnTasks/columnTasksSlice";
import createSagaMiddleware from "redux-saga";
import taskSaga from "./taskSaga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    columntasks: columnTasksSlice,
  },
  middleware: [saga],
});
saga.run(taskSaga);
export default store;
export type RootState = ReturnType<typeof store.getState>;

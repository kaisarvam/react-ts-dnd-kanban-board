import { configureStore } from "@reduxjs/toolkit";
import columnTasksSlice from "../features/columnTasks/columnTasksSlice";


const store = configureStore({
    reducer:{
        columntasks: columnTasksSlice,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
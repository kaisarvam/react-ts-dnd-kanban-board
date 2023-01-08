//@ts-nocheck
import {call,put ,takeEvery} from 'redux-saga/effects'
import { v4 as uuidv4 } from "uuid";
import { ColumnType, TaskColors } from "../utils/enums";
import { getAllTaskSuccess } from '../features/columnTasks/columnTasksSlice';

const randomEnum = (anEnum: TaskColors) => {
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
        // @ts-ignore
        color: randomEnum(TaskColors),
      },
    ],
    "In Progress": [
      {
        id: uuidv4(),
        title: "Task 2",
        column: ColumnType.IN_PROGRESS,
        // @ts-ignore
        color: randomEnum(TaskColors),
      },
    ],
    Blocked: [
      {
        id: uuidv4(),
        title: "Task 3",
        column: ColumnType.BLOCKED,
        // @ts-ignore
        color: randomEnum(TaskColors),
      },
    ],
    Done: [
      {
        id: uuidv4(),
        title: "Task 4",
        column: ColumnType.DONE,
        // @ts-ignore
        color: randomEnum(TaskColors),
      },
    ],
  };

  

function* getTasks(){
const Tasks = yield call(()=>{
    const PresentState = JSON.parse(window.localStorage.getItem("task") || null);
    return PresentState;
})

const currentTasks = Tasks ||FirstState;

yield put(getAllTaskSuccess(currentTasks));

}

function* taskSaga(){
    yield takeEvery('columnTasks/getAllTask',getTasks)
}

export default taskSaga;
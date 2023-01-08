import { Button, Space, Typography } from "antd";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../app/hooks";
import { addNewTask } from "../../features/columnTasks/columnTasksSlice";
import useDropOnColumn from "../../hooks/useDropOnColumn";
import { ColumnTaskcolor, ColumnType } from "../../utils/enums";
import { TaskModel } from "../../utils/models";
import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ columnName }: { columnName: ColumnType }) => {
  const dispatch = useDispatch();

  const allTasks = useAppSelector((state) => {
    return state.columntasks;
  });

  //console.log("found task in state: ", allTasks[columnName]);

  const { dropRef, isOver } = useDropOnColumn({ columnName });
  const ColumnTasks = allTasks[columnName].map(
    (task: TaskModel, index: number) => {
      return <TaskCard key={task.id} task={task} index={index} />;
    }
  );

  return (
    <div
      ref={dropRef}
      className="text-center task-column"
      style={{
        opacity: `${isOver ? 0.7 : 1}`,
        backgroundColor: `${ColumnTaskcolor[columnName]}`,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space
          className="task-column-header"
          align="center"
          direction="vertical"
        >
          <Typography.Title level={2} style={{ marginTop: "" }}>
            {columnName}
          </Typography.Title>
          {/* <Button
        style={{marginBottom:"30px"}}
          onClick={() => {
            dispatch(addNewTask(columnName));
          }}
        >
          Add New Task in {columnName}
        </Button> */}
        </Space>

        <Space direction="vertical">{ColumnTasks}</Space>
      </Space>
    </div>
  );
};

export default TaskColumn;

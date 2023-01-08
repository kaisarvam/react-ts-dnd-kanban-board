import { Space, Typography } from "antd";
import { useAppSelector } from "../../app/hooks";
import useDropOnColumn from "../../hooks/useDropOnColumn";
import { ColumnTaskcolor, ColumnType } from "../../utils/enums";
import { TaskModel } from "../../utils/models";
import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ columnName }: { columnName: ColumnType }) => {
  const allTasks = useAppSelector((state) => {
    return state.columntasks;
  });

  const { dropRef, isOver } = useDropOnColumn({ columnName });
  let ColumnTasks;
  if(Object.keys(allTasks).length>1){
    // @ts-ignore
     ColumnTasks = allTasks[columnName].map(
      (task: TaskModel, index: number) => {
        return <TaskCard key={task.id} task={task} index={index} />;
      }
    );
  }else{
     ColumnTasks = 'loading...'
  }
  
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
        </Space>

        <Space direction="vertical">{ColumnTasks}</Space>
      </Space>
    </div>
  );
};

export default TaskColumn;

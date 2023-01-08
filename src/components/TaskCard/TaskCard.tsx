import { Button, Space, Typography, Input } from "antd";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import useDragAndDropTask from "../../hooks/useDragAndDropTask";
import { TaskModel } from "../../utils/models";
import {
  deleteTheTask,
  updateTheTask,
} from "../../features/columnTasks/columnTasksSlice";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;

type TaskCardProps = {
  index: number;
  task: TaskModel;
};

function TaskCard({ index, task }: TaskCardProps) {
  const { ref, isDragging } = useDragAndDropTask<HTMLDivElement>({
    task,
    index,
  });

  const dispatch = useAppDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    const updateTaskParam = {
      Id: task.id,
      newTask: { ...task, title: newTitle },
    };
    dispatch(updateTheTask(updateTaskParam));
  };

  return (
    <div
      ref={ref}
      className="task-card"
      style={{
        opacity: `${isDragging ? 0.2 : 1}`,
        backgroundColor: `${task.color}`,
      }}
    >
      <Space direction="vertical" style={{ padding: "30px" }}>
        <TextArea
          style={{ minHeight: "50px", marginBottom: "15px" }}
          value={task.title}
          autoSize={true}
          onChange={(e) => {
            handleTitleChange(e);
          }}
        ></TextArea>

        <Button
          icon={<DeleteOutlined />}
          onClick={() => {
            const Id = task.id;
            const Column = task.column;
            const payloadforDelete = { Id, Column };
            dispatch(deleteTheTask(payloadforDelete));
          }}
        >
          Delete Task
        </Button>
      </Space>
    </div>
  );
}

export default TaskCard;

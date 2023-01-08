import { FileAddOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography, Input, Button } from "antd";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import TaskColumn from "./components/TaskColumn/TaskColumn";
import { addNewTodoTask } from "./features/columnTasks/columnTasksSlice";
import { ColumnType } from "./utils/enums";
const { TextArea } = Input;

function App() {
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch();
  return (
    <Space align="center">
      <Space align="center" direction="vertical" className="full-width">
        <Typography.Title>Task Board</Typography.Title>
        <Space direction="horizontal" style={{marginBottom:"30px"}}>
          <TextArea
            value={newTaskTitle}
            autoSize={true}
            style={{minHeight:"40px"}}
            placeholder="Write your task ..."
            onChange={(e) => {
              setNewTaskTitle(e.target.value);
            }}
          ></TextArea>
          <Button
          icon={<FileAddOutlined />}
          style={{minHeight:"40px"}}
          onClick={()=>{
            dispatch(addNewTodoTask(newTaskTitle));
            setNewTaskTitle('');
          }}  type="primary">Add New Task </Button>
        </Space>

        <DndProvider backend={HTML5Backend}>
          <Row gutter={20}>
            <Col flex="auto">
              <TaskColumn columnName={ColumnType.TO_DO} />
            </Col>
            <Col flex="auto">
              <TaskColumn columnName={ColumnType.IN_PROGRESS} />
            </Col>
            <Col flex="auto">
              <TaskColumn columnName={ColumnType.BLOCKED} />
            </Col>
            <Col flex="auto">
              <TaskColumn columnName={ColumnType.DONE} />
            </Col>
          </Row>
        </DndProvider>
      </Space>
    </Space>
  );
}

export default App;

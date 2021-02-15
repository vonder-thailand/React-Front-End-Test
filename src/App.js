import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography
} from "antd";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function App() {
  const initialState = [
    {
      name: "Sample Task 1",
      isAllDone: false,
      subTasks: [
        {
          name: "Subtask Name (Todo) 1",
          isDone: false
        },
        {
          name: "Subtask Name (Done) 2",
          isDone: true
        }
      ],
      newSubTask: ""
    }
  ];
  const [taskList, setTaskList] = useState(initialState);
  const [newTask, setNewTask] = useState("");

  const handleSubmitCreateTask = (value) => {
    if (newTask.length === 0) {
      alert("Please Enter Task Name");
    } else {
      setTaskList([
        ...taskList,
        {
          name: newTask,
          isAllDone: true,
          subTasks: [],
          newSubTask: ""
        }
      ]);
    }
  };

  const handleChangeCreateTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleDuplicateTask = (event, idx) => {
    const newSubTasks = taskList[idx].subTasks.map((subtask) => {
      return { ...subtask };
    });
    const newTask = {
      name: taskList[idx].name,
      isAllDone: taskList[idx].isAllDone,
      subTasks: newSubTasks,
      newSubTask: ""
    };
    setTaskList([...taskList, newTask]);
  };

  const handleDeleteTask = (event, idx) => {
    const newTaskList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (i !== idx) {
        newTaskList.push(taskList[i]);
      }
    }
    setTaskList(newTaskList);
  };

  const handleChangeSubtask = (event, idx) => {
    taskList[idx].newSubTask = event.target.value;
    setTaskList(taskList);
  };

  const handleCreateSubtask = (event, idx) => {
    if (taskList[idx].newSubTask === "") {
      alert("Please Enter Sub Task Name");
    } else {
      const newSubTask = {
        name: taskList[idx].newSubTask,
        isDone: false
      };
      let newTaskList = [...taskList];
      newTaskList[idx].subTasks = [...taskList[idx].subTasks, newSubTask];
      setTaskList(newTaskList);
      checkIsAllDone(idx);
    }
  };

  const checkIsAllDone = (idx) => {
    let newTaskList = [...taskList];
    let task = newTaskList[idx];
    let isAllDone = true;
    for (const subTasks of task.subTasks) {
      isAllDone &= subTasks.isDone;
    }
    task.isAllDone = isAllDone;
    newTaskList[idx] = task;
    setTaskList(newTaskList);
  };

  const handleToggleSubtask = (event, idx, sidx) => {
    let newTaskList = [...taskList];
    newTaskList[idx].subTasks[sidx].isDone = !newTaskList[idx].subTasks[sidx]
      .isDone;
    setTaskList(newTaskList);
    checkIsAllDone(idx);
  };

  const handleDeleteSubtask = (event, idx, sidx) => {
    const subTask = taskList[idx].subTasks;
    const newSubTaskList = [];
    for (let i = 0; i < subTask.length; i++) {
      if (i !== sidx) {
        newSubTaskList.push(subTask[i]);
      }
    }
    const newTaskList = [...taskList];
    newTaskList[idx].subTasks = newSubTaskList;
    setTaskList(newTaskList);
    checkIsAllDone(idx);
  };

  return (
    <Container>
      <Space>
        <form>
          <Input
            style={{ width: 400 }}
            onChange={handleChangeCreateTask}
            placeholder="Enter Task Name"
            name="input"
          />
          <Button type="primary" onClick={handleSubmitCreateTask}>
            Create Task
          </Button>
        </form>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        {taskList.map((task, idx) => (
          <Card
            key={idx}
            headStyle={
              task.isAllDone
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
            title={task.name}
            style={{ width: 600 }}
            extra={
              <>
                <Button
                  type="primary"
                  onClick={(e) => handleDuplicateTask(e, idx)}>
                  Duplicate
                </Button>{" "}
                <Button
                  type="primary"
                  danger
                  onClick={(e) => handleDeleteTask(e, idx)}>
                  Delete
                </Button>
              </>
            }>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space>
                <Input
                  placeholder="Enter Subtask Name"
                  style={{ width: 400 }}
                  onChange={(event) => handleChangeSubtask(event, idx)}
                />
                <Button
                  type="primary"
                  onClick={(e) => handleCreateSubtask(e, idx)}>
                  Add Subtask
                </Button>
              </Space>
              <Divider />
              {task.subTasks.map((subtask, sidx) => {
                return !subtask.isDone ? (
                  <Row key={sidx}>
                    <Col span={16}>
                      <Typography.Text>{subtask.name}</Typography.Text>
                    </Col>
                    <Col span={8}>
                      <Button
                        type="primary"
                        onClick={(e) => handleToggleSubtask(e, idx, sidx)}>
                        Done
                      </Button>{" "}
                      <Button
                        type="danger"
                        onClick={(e) => handleDeleteSubtask(e, idx, sidx)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Row key={sidx}>
                    <Col span={16}>
                      <Typography.Text
                        style={{
                          textDecoration: "line-through"
                        }}>
                        {subtask.name}
                      </Typography.Text>
                    </Col>
                    <Col span={8}>
                      <Button
                        type="primary"
                        onClick={(e) => handleToggleSubtask(e, idx, sidx)}>
                        Undo
                      </Button>{" "}
                      <Button
                        type="danger"
                        onClick={(e) => handleDeleteSubtask(e, idx, sidx)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                );
              })}
            </Space>
          </Card>
        ))}

        {/*  */}
      </Space>
    </Container>
  );
}

export default App;

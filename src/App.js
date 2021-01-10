import { Button, Card, Divider, List, Input, Space, Typography } from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";
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

  const {cart, done, subCart} = useSelector((state) => ({...state}));


  
  return (
    <Container>
      <Space>
        <InputTask subCart={subCart} />
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>

      <List
      bordered
      dataSource={cart}
      renderItem={item => (
       <List.Item>
         <TaskList key={item.name} item={item} cart={cart} done={done} subCart={subCart} />
       </List.Item>
      )}
    />
        
       
      </Space>
    </Container>
  );
}

export default App;

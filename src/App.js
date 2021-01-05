import { Button, Card, Divider, Input, Space, Typography } from "antd";
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
  return (
    <Container>
      <Space>
        <Input />
        <Button type="primary">ADD</Button>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        <Card
          title="TODO 1"
          style={{ width: 600 }}
          extra={<Button type="primary">DUPLICATE</Button>}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <Input />
              <Button type="primary">ADD TASK</Button>
            </Space>
            <Divider />
            <Space>
              <Typography.Text>TASK NAME 1</Typography.Text>
              <Button type="danger">DELETE</Button>
              <Button type="primary">DONE</Button>
            </Space>
            <Space>
              <Typography.Text style={{ textDecoration: "line-through" }}>
                TASK NAME 2
              </Typography.Text>
              <Button type="danger">DELETE</Button>
              <Button type="primary">UNDONE</Button>
            </Space>
          </Space>
        </Card>

        <Card
          title="TODO 2"
          style={{ width: 600 }}
          extra={<Button type="primary">DUPLICATE</Button>}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <Input />
              <Button type="primary">ADD TASK</Button>
            </Space>
            <Divider />
            <Space>
              <Typography.Text>TASK NAME 1</Typography.Text>
              <Button type="danger">DELETE</Button>
              <Button type="primary">DONE</Button>
            </Space>
            <Space>
              <Typography.Text style={{ textDecoration: "line-through" }}>
                TASK NAME 2
              </Typography.Text>
              <Button type="danger">DELETE</Button>
              <Button type="primary">UNDONE</Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </Container>
  );
}

export default App;

import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import _ from 'lodash'
import {Button, List, Input, Form, message, Checkbox, Card,
Space,Divider, Typography
} from 'antd'
import SubTaskList from './SubTaskList';
const TaskList = ({item, cart, done, subcart}) => {
    const [form] = Form.useForm()
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };

      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    const onFinish = values => {
        console.log('value', values)
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }

          console.log('cartttttt',cart[0].data[0].task)
          // push new product to cart
          cart[0].data[0].task.push({
            _id: cart.length,
            ...values,
            isDone: false
          });
          // remove duplicates
          let unique = _.uniqWith(cart, _.isEqual);
          // save to local storage
          // console.log('unique', unique)
          localStorage.setItem("cart", JSON.stringify(unique));
    
          // add to reeux state, 
          dispatch({
            type: "ADD_TO_CART",
            payload: unique,
          });
          // show cart items in side drawer
          dispatch({
            type: "SET_VISIBLE",
            payload: true,
          });
    
          form.resetFields()
        }
      };

      console.log(item)
    return (
        <>
        {/* <Checkbox onChange={onChange}>เสร็จแล้ว (Done)</Checkbox>
            <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleEdit} onCancel={handleCancel}>
      <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
        <Form.Item name="name" label="Name Task" rules={[{ required: true }]}>
          <Input defaultValue={p.name} name="name" onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        </Form.Item>
      </Form>
      </Modal>
      <Button type="danger" onClick={handleRemove}>
        Remove
      </Button> */}


      <Card
        title={item.data[0].name}
        style={{ width: 600 }}
        extra={<Button type="primary">Duplicate</Button>}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
         <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="name" label="Subtask Name" rules={[{ required: true }]}>
          <Input placeholder="Enter Subtask Name" style={{ width: 400 }} rules={[{ required: true }]}  />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
          Add Task
          </Button>
        </Form.Item>
      </Form>
          </Space>
          <Divider />
          <List
      bordered
      dataSource={item.data[0].task}
      renderItem={item => (
        <List.Item>
            <SubTaskList item={item} cart={cart} subcart={subcart} />
        </List.Item>
      )}
    /> 
        </Space>
      </Card>
              </>
    )
}

export default TaskList
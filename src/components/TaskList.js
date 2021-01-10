import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import _ from 'lodash'
import {Button, List, Input, Form, message, Checkbox, Card,
Space,Divider, Typography
} from 'antd'
import SubTaskList from './SubTaskList';
const TaskList = ({item, cart, done, subCart}) => {
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
    

    console.log(cart)
    const onFinish = values => {
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }

          // push new product to cart
        cart.map((c, i) => {
        if (c.data[0].name === item.data[0].name) {
            cart[i].data[0].task.push({
                ...values,
                isDone: false
              });
        } 
    })
      
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

      const handleDuplicate = () => {
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }

          // push new product to cart
        cart.map((c, i) => {
        if (c.data[0].name === item.data[0].name) {
          let newArray = c.data.slice()
          let a ={ ...newArray}
          console.log(c)
          cart.push({data: a})
        } 
    })
      
        //   remove duplicates
          let unique = _.uniqWith(cart, _.isEqual);
          // save to local storage
          // console.log('unique', unique)
          localStorage.setItem("cart", JSON.stringify(unique));
    
          // add to reeux state, 
          dispatch({
            type: "ADD_TO_CART",
            payload: unique,
          });
        //   show cart items in side drawer
          dispatch({
            type: "SET_VISIBLE",
            payload: true,
          });
        }
      }
    return (
        <>

      <Card
        title={item.data[0].name}
        style={{ width: 600 }}
        extra={<Button type="primary" onClick={handleDuplicate}>Duplicate</Button>}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
         <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="title" label="Subtask Name" rules={[{ required: true }]}>
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
            <SubTaskList key={item.title} item={item} cart={cart} subCart={subCart} />
        </List.Item>
      )}
    /> 
        </Space>
      </Card>
              </>
    )
}

export default TaskList
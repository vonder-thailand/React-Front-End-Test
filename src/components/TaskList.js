import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import _ from 'lodash'
import {Button, List, Input, Form, message, Checkbox, Card,
Space,Divider, Typography
} from 'antd'
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
    
      const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === item._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      message.error('ลบข้อมูลสำเร็จแล้ว');
    }
  };

  const handleEdit = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === item._id) {
          cart[i].name = name;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      message.success('แก้ไขข้อมูลสำเร็จแล้ว');
    }
  };

  function onChange(e) {
    let done = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("done")) {
        done = JSON.parse(localStorage.getItem("done"));
      }
      // push new product to cart
      done.push({
        _id: done.length,
        done: item.name,
        finished: true
      });
      
      // remove duplicates
      let unique = _.uniqWith(done, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("done", JSON.stringify(unique));

      // add to reeux state
      dispatch({
        type: "ADD_TO_DONE",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      handleRemove()
    }
  }

  const onFinish = values => {
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        "data": [ 
        {
        _id: cart.length,
        ...values,
        isAllDone: false,
        task: [
            {
                "title": "String",
                "isDone": "Boolean"
            }
        ]
      }
    ]
      });
  
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));

      // add to reeux state
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
console.log('cart', cart)
  console.log('cart[0]',cart[0].data[0].name)
  console.log('item', item)
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
      dataSource={cart}
      renderItem={item => (
        <List.Item>
        <Space>
            <Typography.Text>Subtask Name (Todo)</Typography.Text>
            <Button type="primary"  onChange={onChange}>Done</Button>
            <Button type="danger" onClick={handleRemove}>Delete</Button>
          </Space>
          <Space>
            <Typography.Text style={{ textDecoration: "line-through" }}>
              Subtask Name (Done)
            </Typography.Text>
            <Button type="primary">Undone</Button>
            <Button type="danger">delete</Button>
          </Space>
        </List.Item>
      )}
    /> 
        </Space>
      </Card>
              </>
    )
}

export default TaskList
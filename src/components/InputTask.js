import React from 'react'
import { Form, Input, Button } from 'antd';
import _ from "lodash";
import { useDispatch } from "react-redux";
const InputTask = () => {
const [form] = Form.useForm()
const dispatch = useDispatch();
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
                "_id": cart.length,
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

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="name" label="Name Task" rules={[{ required: true }]}>
          <Input style={{ width: 400 }}  placeholder="Enter Task Name" rules={[{ required: true }]} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
          Create Task
          </Button>
        </Form.Item>
      </Form>
    )
}
export default InputTask
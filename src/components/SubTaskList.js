import React from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Button, message, Space, Typography } from "antd";
const SubTaskList = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].data[0].task.length; j++) {
          if (cart[i].data[0].task[j].title === item.title) {
            cart[i].data[0].task.splice(j, 1);
          }
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      message.error("ลบข้อมูลสำเร็จแล้ว");
    }
  };

 const onChange = () => {
    let cart = [];
    // if cart is in local storage GET it
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((c) => {
      c.data.map((d) => {
        d.task.map((t) => {
          if (t.title === item.title) {
            //set local storage isDone
            t.isDone = !t.isDone
          }
        });
        //return m.isDone when isDone false
        const result = d.task.filter((m) => m.isDone === false);
        //m.isDone is done
        if (result.length === 0) {
          c.data[0].isAllDone = true;
        } else {
          c.data[0].isAllDone = false;
        }
      });
    });

    // remove duplicates
    let unique = _.uniqWith(cart, _.isEqual);
    // save to local storage
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
  }

  return (
        <>
        <Space>
          <Typography.Text style={{ textDecoration: item.isDone ? "line-through" : "" }}>
            {item.isDone ?  `${item.title}(Done)` : item.title} 
          </Typography.Text>
          <Button type="primary" onClick={onChange}>
          {item.isDone ?  `Undone` : `Done`} 
          </Button>
          <Button type="danger" onClick={handleRemove}>
           Delete
          </Button>
        </Space>
    </>
  );
};

export default SubTaskList;

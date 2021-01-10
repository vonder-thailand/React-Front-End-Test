import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import _ from 'lodash'
import {Button, message, Space, Typography
} from 'antd'
const SubTaskList = ({item, cart, subCart}) => {
    const dispatch = useDispatch();
    const [changeState, setChangeState] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
      onChange()
    }, [changeState])
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
    console.log('item', item)
      const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      for(let i = 0; i < cart.length; i++){
          for(let j = 0; j < cart[i].data[0].task.length; j++){
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
      message.error('ลบข้อมูลสำเร็จแล้ว');
    }
  };

  function onChange(e) {
    let done = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("subCart")) {
        done = JSON.parse(localStorage.getItem("subCart"));
      }


      for(let i = 0; i < cart.length; i++){
        for(let j = 0; j < cart[i].data[0].task.length; j++){
          if (cart[i].data[0].task[j].title === item.title) {
            cart[i].data[0].task[j].isDone === false ? setChangeState(true) : setChangeState(false)
            cart[i].data[0].task[j].isDone = changeState
          }
        }
    }
      // cart.map((c, i) => {
      //   if (c._id === p._id) {
      //     cart[i].size = e.target.value;
      //   }
      // });
  
      
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

      // handleRemove()
    }
  }

  console.log(item.isDone)
    return (
        <>
        {item.isDone === false ? (
            <>
            <Space>
            <Typography.Text>{item.title}</Typography.Text>
            <Button type="primary"  onClick={onChange}>Done</Button>
            <Button type="danger" onClick={handleRemove}>Delete</Button>
            </Space>
             </>
        ): (
            <Space>
            <Typography.Text style={{ textDecoration: "line-through" }}>
              Subtask Name (Done)
            </Typography.Text>
            <Button type="primary"  onClick={onChange}>Undone</Button>
            <Button type="danger"  onClick={handleRemove}>delete</Button>
          </Space>

        )}
           
   </>
    )
}

export default SubTaskList
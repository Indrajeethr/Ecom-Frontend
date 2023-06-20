import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import "./styles/Orders.css";
import { render } from "react-dom";

const Orders = () => {
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(
          `https://guvi2-hackathon-backend-joshua.onrender.com/orders/${user.email}`
        )
        .then((res) => setOrders(res.data));
    };
    getOrders();
  }, []);



  return (
    <div>
      <h1 className="order-heading">Your Orders</h1>
      <div className="orderContainer">
      {orders.map((order) => (
        <div className="order">
          <img src={order.image} height="150px" width="150px" />
          <p>Product Name :{order.product_Name}</p>
          <p>Price: Rs {order.price}</p>
          <p>Total Days : {order.total_days}</p>
          <p>Payment Id : {order.payment_id}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Orders;

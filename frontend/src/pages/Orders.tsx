import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

interface User {
  username: string;
  email: string;
  password: string;
  img?: string;
  country: string;
  phone?: string;
  desc?: string;
  isSeller?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

interface Order {
  gigId: string; // required
  img?: string; // optional
  title: string; // required
  price: number; // required
  sellerId: string; // required
  buyerId: string; // required
  isCompleted?: boolean; // optional, default is false
  payment_intent: string; // required
  createdAt?: Date; // optional, included by timestamps
  updatedAt?: Date; // optional, included by timestamps
  _id: string;
}

const Orders = () => {
  const [currentUser, setUser] = useState<User | null>();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (user) setUser(JSON.parse(user));
  }, []);

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () =>
      apiClient.get<Order[]>(`/orders`).then((res) => {
        return res.data;
      }),
  });
  const userId = data && data[0]?.sellerId;
  console.log(data);
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () =>
      userId
        ? apiClient.get<User>(`/users/${userId}`).then((res) => res.data)
        : Promise.reject("No userId available"),
    enabled: Boolean(userId),
  });

  console.log(dataUser);
  const handleContact = async (order: Order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await apiClient.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err: any) {
      if (err.response.status === 404) {
        const res = await apiClient.post(`/conversations/`, {
          to: currentUser?.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data?.map((order: Order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{order.isCompleted}</td>
                <td>
                  {order.payment_intent == "temporary" &&
                  order.buyerId == currentUser?._id ? (
                    <Link to={`/payment/${order._id}`}>Make payment</Link>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;

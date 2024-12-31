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
    <div className="orders mt-32 mb-24 min-h-[300px] lg:max-w-[90%] mx-auto">
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
            data-original="#000000"
          />
        </svg>
      ) : error ? (
        <h1 className="text-center text-3xl text-red-500">
          Error fetching data
        </h1>
      ) : (
        <div className="container">
          <div className="title">
            <h1 className="text-4xl mb-4">Orders</h1>
          </div>
          {data?.length === 0 ? (
            <h1 className="text-center text-3xl text-red-500">No orders</h1>
          ) : (
            <div className="font-[sans-serif] overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 whitespace-nowrap">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Image
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Title
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Price
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Payment Status
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Make Payment
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                  {data?.map((order: Order) => (
                    <tr key={order._id} className="even:bg-blue-50">
                      <td className="p-4 text-sm text-black">
                        <img className="image w-32" src={order.img} alt="" />
                      </td>
                      <td className="p-4 text-xl text-black">{order.title}</td>
                      <td className="p-4 text-sm text-black">
                        {order.price} Birr.
                      </td>
                      <td className="p-4 text-sm text-black">
                        {order.isCompleted}
                      </td>
                      <td className="p-4 text-sm text-black">
                        {order.payment_intent == "temporary" &&
                        order.buyerId == currentUser?._id ? (
                          <Link
                            className="p-3 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
                            to={`/payment/${order._id}`}
                          >
                            Pay with Chapa
                          </Link>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="p-4 text-sm text-black">
                        <img
                          className="message w-6 cursor-pointer"
                          src="./img/message.png"
                          alt=""
                          onClick={() => handleContact(order)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;

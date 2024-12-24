import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";

import moment from "moment";

interface User {
  id: string;
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
}

export interface Conversation {
  id: string;
  sellerId: string;
  buyerId: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage?: string; // Optional as per the schema
  createdAt?: Date; // Automatically added by Mongoose timestamps
  updatedAt?: Date; // Automatically added by Mongoose timestamps
}

const Messages = () => {
  const [currentUser, setUser] = useState<User | null>(null);
  const [userImg, setImg] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | undefined>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const { isLoading, error, data } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: () => apiClient.get("/conversations").then((res) => res.data),
  });
  console.log(data);
  const mutation = useMutation({
    mutationFn: (id: string) => apiClient.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const handleRead = (id: string) => {
    mutation.mutate(id);
  };
  const handleId = (userId: string) => {
    setUserId(userId);
  };
  useEffect(() => {
    try {
      const setImage = async () => {
        const id = userId;
        const response = await apiClient.get<User>(`/users/${id}`);
        console.log("user data:", response.data.img);
        if (response) {
          const img = response.data.img;
          setImg(img);
        }
      };
      setImage();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  console.log("user id", userId);
  return (
    <div className="myGigs flex justify-center mt-20">
      {isLoading ? (
        "loading"
      ) : error ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <div className="title flex items-center justify-between">
            <h1 className="text-2xl my-5 font-bold">Messages</h1>
          </div>
          <table className="w-full table-auto h-full">
            <thead>
              <tr className="mb-6 ">
                <th className="text-left">
                  {currentUser?.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="text-left">Last Message</th>
                <th className="text-left">Date</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody className="space-x-3">
              {data?.map((c) => (
                <tr className="even:bg-blue-50" key={c.id}>
                  <td>
                    <img
                      src={userImg || "../../public/img/noavatar.jpg"}
                      style={{ height: 40, width: 40 }}
                      onLoadStart={() =>
                        currentUser?.isSeller
                          ? handleId(c.buyerId)
                          : handleId(c.sellerId)
                      }
                      alt="seller img"
                    />
                  </td>
                  <td>
                    <Link className="max-w-[360px]" to={`/message/${c.id}`}>
                      {c?.lastMessage?.substring(0, 100) || "No message"}...
                    </Link>
                  </td>
                  <td>
                    {c.updatedAt
                      ? moment(c.updatedAt).fromNow()
                      : "No date available"}
                  </td>
                  <td>
                    {((currentUser?.isSeller && !c.readBySeller) ||
                      (!currentUser?.isSeller && !c.readByBuyer)) && (
                      <button
                        className="py-2 px-3 text-white bg-green-500 hover:bg-green-400 cursor-pointer"
                        onClick={() => handleRead(c.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Messages;

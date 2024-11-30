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

  return (
    <div className="my-40">
      {isLoading ? (
        "loading"
      ) : error ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <div>
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <tr
                  className={
                    ((currentUser?.isSeller && !c.readBySeller) ||
                      (!currentUser?.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser?.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
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
                      <button onClick={() => handleRead(c.id)}>
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

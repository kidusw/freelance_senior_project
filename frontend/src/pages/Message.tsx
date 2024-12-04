import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";

interface User {
  _id: string;
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

interface Message {
  conversationId: string;
  userId: string;
  desc: string;
}

const Message = () => {
  const { id } = useParams();
  const [currentUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: () => apiClient.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message: Message) => {
      return apiClient.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form[0] as HTMLTextAreaElement;

    const desc = textarea.value;

    if (!id || !desc.trim()) return;

    mutation.mutate({
      conversationId: id,
      userId: currentUser?._id || "", // Add userId if required
      desc,
    });

    textarea.value = ""; // Reset input
  };

  return (
    <div className="message flex justify-center">
      <div className="container lg:w-[90%] m-12">
        <span className="breadcrumbs font-light text-xs text-gray-500">
          <Link to="/messages">Messages</Link> John Doe
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages my-7 p-12 flex flex-col gap-20 h-[500px] overflow-scroll">
            {data?.map((m: Message) => (
              <div
                className={
                  m.userId === currentUser?._id
                    ? "item owner flex gap-5 max-w-[600px] text-xl flex-row-reverse self-end"
                    : "item flex gap-5 max-w-[600px] text-xl"
                }
                key={m.conversationId}
              >
                <img
                  className="w-12 h-12 rounded-[50%]"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p className="p-5 bg-gray-100 rounded-e-lg">{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr className="h-0 border-[0.5px] my-5" />
        <form
          className="write flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <textarea
            typeof="text"
            cols={30}
            rows={10}
            className="w-[80%] h-[100px] p-3 border border-gray-200"
            placeholder="write a message"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-5 font-medium rounded-md w-[100px]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;

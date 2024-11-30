import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";

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
      userId: currentUser?.id || "", // Add userId if required
      desc,
    });

    textarea.value = ""; // Reset input
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> John Doe
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data?.map((m: Message) => (
              <div
                className={m.userId === currentUser?.id ? "owner item" : "item"}
                key={m.conversationId}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea typeof="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;

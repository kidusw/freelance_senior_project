import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import newRequest from "../utils/apiClient";
import Review from "./Review";

interface ReviewsProps {
  gigId: string;
}

interface User {
  _id: string;
  username: string;
  isSeller: true;
}

interface ReviewData {
  _id: string;
  gigId: string;
  star: number;
  desc: string;
  userId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ gigId }) => {
  const [currentUser, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Fetch reviews
  const { isLoading, error, data } = useQuery<ReviewData[]>({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // Mutation for adding a new review
  const mutation = useMutation({
    mutationFn: (review: { gigId: string; star: number; desc: string }) =>
      newRequest.post("/reviews", review).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", gigId] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const desc = form[0] as HTMLInputElement;
    const star = form[1] as HTMLSelectElement;

    mutation.mutate({ gigId, star: parseInt(star.value), desc: desc.value });
    form.reset();
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  console.log("current user from reviews:", currentUser);
  return (
    <div className="reviews mt-12">
      <h2 className="text-2xl">Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data?.map((review) => <Review key={review._id} review={review} />)}
      {!currentUser?.isSeller && (
        <div className="add">
          <h3>Add a review</h3>
          <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write your opinion" required />
            <select name="star" id="star" required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;

import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/apiClient";
const Review = ({ review }: any) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user flex items-center gap-2">
          <img
            className="pp w-8 h-8 rounded-full object-cover"
            src={data.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info flex flex-col gap-1">
            <span className="text-black font-medium">{data.username}</span>
            <div className="country flex items-center gap-2 text-gray-500">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars flex items-center gap-1 mb-4">
        {Array(review.star)
          .fill(0)
          .map((_, i) => (
            <img className="w-3 h-3" src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p className="text-black font-normal">{review.desc}</p>
      <div className="helpful flex items-center gap-2 my-5">
        <span>Helpful?</span>
        <img className="w-4" src="/img/like.png" alt="" />
        <span>Yes</span>
        <img className="w-4" src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;

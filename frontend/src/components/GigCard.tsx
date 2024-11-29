import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Gig {
  userId: number;
  title: string;
  desc: string;
  totalStars: number;
  price: number;
  starNumber: number;
  cat: string;
  cover: string;
  img: string[];
  id: number;
  shortTitle: string;
  shortDesc: string;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
  sales: number;
}

const GigCard = ({ item }: any) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res: any) => {
        return res.data;
      }),
  });
  console.log(data);
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "something went wrong"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

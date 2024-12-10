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
  img: string;
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
      <div className="gigCard w-[324px] h-[400px] border border-gray-300 mb-6">
        <img className="w-full h-[40%] object-cover" src={item.cover} alt="" />
        <div className="info py-2 px-5 flex flex-col gap-4">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "something went wrong"
          ) : (
            <div className="user flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-[50%]"
                src={data.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span className="font-medium">{data.username}</span>
            </div>
          )}
          <p className="text-gray-900 ">{item.desc}</p>
          <div className="star flex gap-1">
            <img
              className="text-[14px] font-semibold text-orange-400"
              src="./img/star.png"
              alt=""
            />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr className="h-0 border border-gray-300 " />
        <div className="detail py-2 px-5 flex items-center justify-between">
          <img
            className="w-4 h-4 cursor-pointer"
            src="./img/heart.png"
            alt=""
          />
          <div className="price">
            <span className="text-gray-500 text-[12px]">STARTING AT</span>
            <h2 className="text-gray-600 text-xl">$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

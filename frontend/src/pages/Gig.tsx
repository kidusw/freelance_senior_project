import React, { useState } from "react";
import Slider from "../components/Slide";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/apiClient";
import Reviews from "../components/Reviews";
import apiClient from "../utils/apiClient";
import CustomAlert from "../components/CustomeAler";

interface GigData {
  userId: string;
  title: string;
  images: string[];
  desc: string;
  totalStars: number;
  starNumber: number;
  price: number;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
  shortTitle: string;
}

interface UserData {
  img: string;
  username: string;
  country: string;
  desc: string;
}

const Gig = () => {
  const { id } = useParams<{ id: string }>();
  const [orderSubmitted, setOrder] = useState<boolean>(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setIsError] = useState<boolean>(false);

  const showAlert = (message: string, isError: boolean) => {
    setAlertMessage(message);
    setIsError(isError);
    setAlertVisible(true);

    setTimeout(() => setAlertVisible(false), 3000);
  };

  const { isLoading, isError, data } = useQuery<GigData>({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId || "";
  console.log(data?.title);
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery<UserData>({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: Boolean(userId),
  });

  if (isLoading) return <p>Loading gig details...</p>;
  if (isError) return <p>Failed to load gig details.</p>;
  if (isLoadingUser) return <p>Loading user details...</p>;
  if (errorUser) return <p>Failed to load user details.</p>;
  console.log(dataUser);

  const averageStars = data?.starNumber
    ? Math.round(data.totalStars / data.starNumber)
    : 0;
  console.log(data?.images);
  const handleOrder = async () => {
    try {
      const res = await apiClient.post(`/orders/${id}`);
      showAlert("Order submitted successfully!", false);
      console.log(res.data);
      console.log(res);
      console.log(orderSubmitted);
    } catch (err: any) {
      console.log(err.response.data);
      showAlert(err.response.data, true);
    }
  };

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Liverr Graphics & Design</span>
          <h1>{data?.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={dataUser?.img || "/img/noavatar.jpg"}
              alt={dataUser?.username || "User Avatar"}
            />
            <span>{dataUser?.username || "Unknown User"}</span>
            <div className="stars">
              {Array(averageStars)
                .fill(0)
                .map((_, i) => (
                  <img src="/img/star.png" alt="" key={i} />
                ))}
              <span>{averageStars}</span>
            </div>
          </div>
          <Slider cards={data?.images || []} />
          <h2>About This Gig</h2>
          <p>{data?.desc}</p>
          <Reviews gigId={id!} />
        </div>
        <div className="right">
          <div className="price">
            <h3>{data?.shortTitle}</h3>
            <h2>${data?.price}</h2>
          </div>
          <p>{data?.desc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="Delivery Time" />
              <span>{data?.deliveryTime} days</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="Revisions" />
              <span>{data?.revisionNumber}</span>
            </div>
          </div>
          <div className="features">
            {data?.features?.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gig;

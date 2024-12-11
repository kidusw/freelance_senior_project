import React, { useState } from "react";
// import Slider from "../components/Slide";
import ImageSlide from "../components/ImageSlide";
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
    <>
      <div className="my-20">
        {alertVisible && (
          <CustomAlert
            message={alertMessage}
            isError={error}
            // onClose={() => setAlertVisible(false)}
          />
        )}
      </div>

      <div className="gig flex justify-center lg:mt-32">
        <div className="container lg:w-[90%] py-7 px-0 flex gap-12">
          <div className="left flex-grow-[1] flex-shrink flex-basis-0 flex flex-col gap-5 ">
            <span className="breadcrumbs font-medium uppercase text-xs text-gray-500">
              Liverr Graphics & Design
            </span>
            <h1 className="text-3xl">{data?.title}</h1>
            <div className="user flex item-center gap-2">
              <img
                className="pp w-8 h-8 rounded-[50%] object-cover"
                src={dataUser?.img || "/img/noavatar.jpg"}
                alt={dataUser?.username || "User Avatar"}
              />
              <span className="text-xs font-medium">
                {dataUser?.username || "Unknown User"}
              </span>
              <div className="stars flex items-center gap-1">
                {Array(averageStars)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      className="h-3 w-3"
                      src="/img/star.png"
                      alt=""
                      key={i}
                    />
                  ))}
                <span className="text-xs font-semibold text-yellow-500">
                  {averageStars}
                </span>
              </div>
            </div>
            <ImageSlide images={data?.images || []} />
            <h2>About This Gig</h2>
            <p>{data?.desc}</p>
            <Reviews gigId={id!} />
          </div>
          <div className="right border border-gray-300 p-5 rounded-sm flex flex-col  gap-5 h-max   absolute top-[150px] right-5 w-[400px]">
            <div className="price flex items-center justify-between">
              <h3 className="text-2xl font-light">{data?.shortTitle}</h3>
              <h2 className="text-xl">${data?.price}</h2>
            </div>
            <p className="text-gray-500 my-2 mx-0">{data?.desc}</p>
            <div className="details flex items-center justify-between text-xs">
              <div className="item flex items-center gap-2">
                <img className="w-5" src="/img/clock.png" alt="Delivery Time" />
                <span>{data?.deliveryTime} days</span>
              </div>
              <div className="item  flex items-center gap-2">
                <img className="w-5" src="/img/recycle.png" alt="Revisions" />
                <span>{data?.revisionNumber}</span>
              </div>
            </div>
            <div className="features">
              {data?.features?.map((feature) => (
                <div
                  className="item flex items-center gap-2 font-light text-gray-500 mb-1"
                  key={feature}
                >
                  <img className="w-[14px]" src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              className="bg-green-500 p-2 text-white font-medium border-none text-xl cursor-pointer"
              onClick={handleOrder}
              to={`/gig/${id}`}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gig;

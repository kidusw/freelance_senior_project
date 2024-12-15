import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopCard from "./TopCard";
import { useState } from "react";
// import CatCard from "../catCard/CatCard";
interface Cards {
  id: number;
  img: string;
  pp: string;
  cat: string;
  username: string;
}

interface GigData {
  _id: string;
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
  cover: string;
}

interface Props {
  gigs: GigData[] | null;
}
const TopRated = ({ gigs }: Props) => {
  const settings = {
    dots: true, // Display navigation dots
    infinite: true, // Loop slides
    speed: 400, // Transition speed
    slidesToShow: 4, // Default number of slides visible
    slidesToScroll: 1, // Number of slides to scroll per arrow click
    autoplay: true,
    autoplaySpeed: 1700,

    responsive: [
      {
        breakpoint: 1024, // For tablet (<=1024px)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // For mobile (<=600px)
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="my-6">
      <div className="lg:w-[90%] mx-auto ">
        <h2 className="my-8 text-center text-4xl font-bold text-green-800 underline">
          Top Rated
        </h2>
        <Slider {...settings}>
          {gigs?.length !== 0 &&
            gigs?.map((gig) => (
              <TopCard
                userId={gig.userId}
                key={gig._id}
                _id={gig._id}
                img={gig.cover}
                pp={gig.cover}
                cat={gig.title}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default TopRated;

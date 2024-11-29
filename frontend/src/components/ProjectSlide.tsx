import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjCard from "./ProjectCard";
// import CatCard from "../catCard/CatCard";
interface Cards {
  id: number;
  img: string;
  pp: string;
  cat: string;
  username: string;
}
interface Props {
  cards: Cards[];
}
const ProjSlide = ({ cards }: Props) => {
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
          Projects
        </h2>
        <Slider {...settings}>
          {cards.length !== 0 &&
            cards.map((card) => (
              <ProjCard
                key={card.id}
                img={card.img}
                pp={card.pp}
                cat={card.cat}
                username={card.username}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default ProjSlide;

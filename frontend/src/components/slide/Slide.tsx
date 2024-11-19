import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Navigation module
import "swiper/swiper-bundle.css";
import "./Slide.scss";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Slide = ({ children }: Props) => {
  return (
    <div className="slide">
      <div className="container">
        <h3>Categories</h3>
        <Swiper
          modules={[Navigation, Pagination]} // Add Navigation module
          spaceBetween={10}
          slidesPerView={4}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true} // Enable navigation
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
};
export default Slide;

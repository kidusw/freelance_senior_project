import { Link } from "react-router-dom";

interface Props {
  title: string;
  desc: string;
  img: string;
  shortDesc: string;
}

const CatCard = ({ title, desc, img, shortDesc }: Props) => {
  return (
    <Link to={`/gigs/?cat=${shortDesc}`}>
      <div className="catCard w-[252px] h-[344px] text-white rounded-md cursor-pointer relative">
        <img
          className="w-full h-full object-cover rounded-md brightness-75"
          src={img}
          alt=""
        />
        <span className="desc font-semibold absolute text-white top-[15px] left-[15px]">
          {desc}
        </span>
        <span className="title font-semibold text-2xl absolute top-[40px] left-[15px]">
          {title}
        </span>
      </div>
    </Link>
  );
};
export default CatCard;

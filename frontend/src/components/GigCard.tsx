import { Link } from "react-router-dom";

interface Gig {
  id: number;
  img: string;
  pp: string;
  desc: string;
  price: number;
  star: number;
  username: string;
}

interface Props {
  item: Gig;
}

const GigCard = ({ item }: Props) => {
  return (
    <Link to={`/gig/${item.id}`} className="link">
      <div className="gigCard w-[324px] h-[400px] border border-gray-300 mb-6">
        <img className="w-full h-[40%] object-cover" src={item.img} alt="" />
        <div className="info py-2 px-5 flex flex-col gap-4">
          <div className="user flex items-center gap-2">
            <img className="w-6 h-6 rounded-[50%]" src={item.pp} alt="" />
            <span className="font-medium">{item.username}</span>
          </div>
          <p className="text-gray-900 ">{item.desc}</p>
          <div className="star flex gap-1">
            <img className="w-4 h-4" src="/public/img/star.png" alt="" />
            <span className="text-[14px] font-semibold text-orange-400">
              {item.star}
            </span>
          </div>
          <hr className="h-0 border border-gray-300 " />
          <div className="details py-2 px-5 flex items-center justify-between">
            <img
              className="w-4 h-4 cursor-pointer
            "
              src="/public/img//heart.png"
              alt=""
            />
            <div className="price ">
              <span className="text-gray-500 text-[12px]">STARTING AT</span>
              <h2 className="text-gray-600 text-xl">${item.price}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

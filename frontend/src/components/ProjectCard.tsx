import { Link } from "react-router-dom";

interface Props {
  img: string;
  pp: string;
  cat: string;
  username: string;
}

const ProjCard = ({ img, pp, cat, username }: Props) => {
  return (
    <Link to="/" className="link">
      <div className="w-[270px] h-[300px] rounded-sm cursor-pointer shadow-lg">
        <img className="w-full h-[70%] object-cover" src={img} alt="" />
        <div className="flex items-center gap-5 mt-3">
          <img
            className="w-10 h-10 rounded-[50%] object-cover"
            src={pp}
            alt=""
          />
          <div className="">
            <h2 className="text-xs font-semibold">{cat}</h2>
            <span className="text-xs">{username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProjCard;

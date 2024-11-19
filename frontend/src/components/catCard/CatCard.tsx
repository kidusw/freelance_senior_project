import { Link } from "react-router-dom";
import "./CatCard.scss";

interface Props {
  title: string;
  desc: string;
  img: string;
}

const CatCard = ({ title, desc, img }: Props) => {
  return (
    <Link to={`/gigs/?cat=design}`}>
      <div className="catCard">
        <img src={img} alt="" />
        <span className="desc">{desc}</span>
        <span className="title">{title}</span>
      </div>
    </Link>
  );
};
export default CatCard;

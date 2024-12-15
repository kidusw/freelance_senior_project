import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";

interface Props {
  _id: string;
  img: string;
  pp: string;
  cat: string;
  userId: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  img: string;
}

const TopCard = ({ img, pp, cat, _id, userId }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [userImg, setImg] = useState<string>("");
  useEffect(() => {
    const getUser = async () => {
      const response = await apiClient.get<User>(`/users/${userId}`);
      setUser(response.data);
      if (response.data.img) {
        setImg(response.data.img);
      }
      console.log("user data: ", response.data);
    };
    getUser();
  }, []);
  return (
    <Link to={`/gig/${_id}`} className="link">
      <div className="w-[270px] h-[300px] rounded-sm cursor-pointer shadow-lg">
        <img className="w-full h-[70%] object-cover" src={img} alt="" />
        <div className="flex items-center gap-5 mt-3">
          <img
            className="w-10 h-10 rounded-[50%] object-cover"
            src={userImg || "../../public/img/noavatar.jpg"}
            alt=""
          />
          <div className="">
            <h2 className="text-xs font-semibold">{cat}</h2>
            <h2 className="text-xs font-semibold">{user?.username}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default TopCard;

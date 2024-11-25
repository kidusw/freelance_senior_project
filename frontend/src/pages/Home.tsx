import { useEffect, useState } from "react";
import Featured from "../components/Featred";
import Features from "../components/Features";
import Slide from "../components/Slide";
import apiClient from "../utils/apiClient";
import { cards } from "../data";
const Home = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get("/auth/profile", {
          withCredentials: true,
        });
        console.log(response.data.user);
        setUsername(response.data.user.username);
      } catch (error: any) {
        alert(error.response?.data?.message || "An error occurred");
      }
    };
    getUserData();
  }, []);

  return (
    <div className="px-2">
      <h1 className="text-3xl font-bold underline text-center">Home</h1>
      {username && <h2>{username}</h2>}
      <Featured />
      <Slide cards={cards} />
      <Features />
    </div>
  );
};

export default Home;

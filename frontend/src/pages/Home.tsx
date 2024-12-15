import { useEffect, useState } from "react";
import Featured from "../components/Featred";
import Features from "../components/Features";
import Slide from "../components/Slide";
import apiClient from "../utils/apiClient";
import { cards, projects } from "../data";
import ProjSlide from "../components/ProjectSlide";
import TopRated from "../components/TopRated";

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

const Home = () => {
  const [gigs, setGig] = useState<GigData[] | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get("/auth/profile", {
          withCredentials: true,
        });
        const topGigs = await apiClient.get<GigData[]>("/gigs/topRated", {
          withCredentials: true,
        });
        console.log("error response: ", response.status);
        console.log(response.data.user);
        if (topGigs.data) {
          setGig(topGigs.data);
        }

        console.log(topGigs.data);
      } catch (error: any) {
        console.log(error.response?.data?.message || "An error occurred");
      }
    };
    getUserData();
  }, []);
  console.log("gigs: ", gigs);
  return (
    <div className="px-2">
      {/* <h1 className="text-3xl font-bold underline text-center">Home</h1> */}
      {/* {username && <h2>{username}</h2>} */}

      <Featured />
      <Slide cards={cards} />
      <Features />
      <ProjSlide cards={projects} />
      <TopRated gigs={gigs} />
    </div>
  );
};

export default Home;

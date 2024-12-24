import { useEffect, useRef, useState } from "react";
import GigCard from "../components/GigCard";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { gigs } from "../data";

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
}

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const [gigs, setGigs] = useState<GigData[] | null>(null);
  const { search } = useLocation();

  const fetchGigs = () => {
    const min = minRef.current?.value || 0;
    const max = maxRef.current?.value || 10000;
    return apiClient
      .get(`/gigs${search}&min=${min}&max=${max}&sort=${sort}`)
      .then((res) => res.data);
  };

  const { isLoading, isError, data, error, refetch } = useQuery<
    GigData[] | null
  >({
    queryKey: ["gigs", sort, search],
    queryFn: fetchGigs,
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setGigs(data);
    }
  }, []);

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  const applyFilters = () => {
    refetch();
  };

  useEffect(() => {
    if (minRef.current && maxRef.current) {
      refetch();
    }
  }, [sort]);
  console.log(error?.message.endsWith("403") && "You must be logged in!");
  return (
    <div className="my-10 gigs flex justify-center lg:mt-32">
      <div className="container lg:w-[90%] py-7 px-0 flex flex-col gap-4">
        <span className="breadcrumbs text-xs text-gray-500">
          {/* {gigs && gigs[0].title} */}
        </span>
        {/* <h1 className="text-3xl">{gigs && gigs[0].title}</h1> */}
        <p className="text-gray-600 font-medium">Explore the categories</p>
        <div className="menu flex items-center justify-between flex-wrap">
          <div className="left flex items-center flex-wrap gap-3 text-gray-500 font-medium">
            <span>Budget</span>
            <input
              className="p-1 border border-gray-300 outline-none placeholder:text-gray-500"
              ref={minRef}
              type="number"
              placeholder="min"
              defaultValue={0}
              min={0}
            />
            <input
              className="p-1 border border-gray-300 outline-none placeholder:text-gray-500"
              ref={maxRef}
              type="number"
              placeholder="max"
              defaultValue={10000}
              max={10000}
            />
            <button
              className="bg-green-600 text-white font-medium border-none cursor-pointer py-1 px-2 rounded-md"
              onClick={applyFilters}
            >
              Apply
            </button>
          </div>
          <div className="right flex items-center gap-2 relative">
            <span className="sortBy text-gray-500">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              className="w-4 cursor-pointer"
              src="./img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div
                className="rightMenu p-5 bg-white rounded-sm border
              border-gray-200 absolute top-[30px] right-0 flex flex-col
               gap-5 text-gray-600"
              >
                <span
                  className="cursor-pointer"
                  onClick={() => reSort("sales")}
                >
                  Best Selling
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => reSort("createdAt")}
                >
                  Newest
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="cards flex flex-wrap gap-5 justify-center">
          {isLoading
            ? "Loading..."
            : isError
            ? `${error?.message.endsWith("403") && "You must be logged in!"}`
            : data?.map((gig: GigData) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

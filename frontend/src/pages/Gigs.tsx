import React, { useEffect, useRef, useState } from "react";
import GigCard from "../components/GigCard";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

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

  const { search } = useLocation();

  const fetchGigs = () => {
    const min = minRef.current?.value || 0;
    const max = maxRef.current?.value || 10000;
    return apiClient
      .get(`/gigs${search}&min=${min}&max=${max}&sort=${sort}`)
      .then((res) => res.data);
  };

  const { isLoading, isError, data, error, refetch } = useQuery<GigData[]>({
    queryKey: ["gigs", sort, search],
    queryFn: fetchGigs,
  });
  console.log(data);
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

  return (
    <div className="my-10">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists.
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              defaultValue={0}
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              defaultValue={10000}
            />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("createdAt")}>Newest</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading..."
            : isError
            ? `Error: ${error.message || "Something went wrong"}`
            : data?.map((gig: GigData) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

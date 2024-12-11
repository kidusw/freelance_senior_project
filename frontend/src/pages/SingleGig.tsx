import React, { ChangeEvent, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import upload from "../utils/upload";

interface GigData {
  userId: string;
  title: string;
  images: string[];
  desc: string;
  totalStars: number;
  starNumber: number;
  price?: number;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
  shortTitle: string;
  cover: string;
}

const SingleGig = () => {
  const { id } = useParams<{ id: string }>();
  const [gigdata, setGigData] = useState<GigData | null>(null);
  const [price, setPrice] = useState<number>();
  const [updatedGig, setUpdatedGig] = useState<Partial<GigData>>({});
  const [isEditing, setEditing] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await apiClient.get<GigData>(`/gigs/single/${id}`, {
          withCredentials: true,
        });
        setGigData(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchGig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedGig((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = gigdata?.cover;
    if (file) {
      const url = await upload(file);
    }

    try {
      const response = await apiClient.put(
        `/gigs/edit/${id}`,
        { ...updatedGig, cover: url },
        {
          withCredentials: true,
        }
      );
      console.log("gig updated successfully:", response.data);
      setGigData(response.data);
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-40">
      <div>
        <h1>gig info</h1>
        <img
          src={gigdata?.cover}
          alt="Profile"
          style={{
            height: 50,
            width: 50,
            border: "0.8px solid black",
            borderRadius: 50,
          }}
        />
        {!isEditing ? (
          <>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="price"
                value={gigdata?.title}
                disabled
              />
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={gigdata?.price}
                disabled
              />
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Cover Picture
              </label>
            </div>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={
                  updatedGig.title !== undefined
                    ? updatedGig.title
                    : gigdata?.title || ""
                }
                onChange={handleChange}
              />
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={
                  updatedGig.price !== undefined
                    ? updatedGig.price
                    : gigdata?.price || ""
                }
                onChange={handleChange}
              />
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Cover Picture
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SingleGig;

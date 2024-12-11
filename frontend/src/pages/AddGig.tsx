import React, { useState, FormEventHandler } from "react";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // State to manage gig data
  const [gigData, setGigData] = useState({
    userId: "", // Assume this is set elsewhere
    title: "",
    cat: "",
    cover: "",
    images: [] as string[],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [] as string[],
    price: 0,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setGigData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a feature

  const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureInput(e.target.value);
  };

  // Add feature to the list
  const handleAddFeature = () => {
    const feature = featureInput.trim();
    if (feature) {
      setGigData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }));
      setFeatureInput(""); // Clear the input
    }
  };

  // Remove a feature
  const handleRemoveFeature = (feature: string) => {
    setGigData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSingleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSingleFile(e.target.files[0]);
    }
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = singleFile ? await upload(singleFile) : "";
      const images = await Promise.all(files.map((file) => upload(file)));
      setGigData((prev) => ({
        ...prev,
        cover,
        images,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // Mutation for creating the gig
  const mutation = useMutation({
    mutationFn: (gig: typeof gigData) => apiClient.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myGigs"] });
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Error creating gig:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(gigData);
  };
  console.log(gigData.features[0]);
  return (
    <div className="add mt-32 flex justify-center ">
      <div className="container lg:w-[80%] py-12 px-0">
        <h1 className="text-gray-500 font-light text-3xl mb-7">Add New Gig</h1>
        <form
          className="sections flex justify-around w-full flex-wrap"
          onSubmit={handleSubmit}
        >
          <div className="info flex flex-col gap-3 justify-between ">
            <label htmlFor="title">Title</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              name="title"
              id="title"
              placeholder="e.g. I will do something I'm really good at"
              value={gigData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="cat">Category</label>
            <select
              name="cat"
              id="cat"
              value={gigData.cat}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <label htmlFor="coverImage">Cover Image</label>
              <input
                name="coverImage"
                type="file"
                id="coverImage"
                onChange={handleSingleFile}
              />
              <label htmlFor="images">Upload Images</label>
              <input
                name="images"
                type="file"
                id="images"
                multiple
                onChange={handleMultipleFiles}
              />
              <button type="button" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label htmlFor="desc">Description</label>
            <textarea
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              name="desc"
              id="desc"
              placeholder="Brief description to introduce your service"
              rows={6}
              value={gigData.desc}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="details flex flex-col gap-3 justify-between">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              name="shortTitle"
              id="shortTitle"
              placeholder="e.g. One-page web design"
              value={gigData.shortTitle}
              onChange={handleChange}
              required
            />

            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              name="shortDesc"
              id="shortDesc"
              placeholder="Short description of your service"
              rows={4}
              value={gigData.shortDesc}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="deliveryTime">Delivery Time (days)</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
              name="deliveryTime"
              id="deliveryTime"
              value={gigData.deliveryTime}
              onChange={handleChange}
              min="1"
              required
            />

            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
              name="revisionNumber"
              id="revisionNumber"
              value={gigData.revisionNumber}
              onChange={handleChange}
              min="0"
              required
            />

            <label htmlFor="feature">Add Features</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              id="feature"
              name="feature"
              placeholder="e.g. page design"
              value={featureInput}
              onChange={handleFeatureInputChange}
            />
            <button type="submit" onClick={handleAddFeature}>
              Add
            </button>

            <div className="addedFeatures">
              {gigData.features.map((f, index) => (
                <div className="item flex items-center" key={index}>
                  <span>{f}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(f)}
                    className="ml-2 text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="price">Price ($)</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
              name="price"
              id="price"
              value={gigData.price}
              onChange={handleChange}
              min="1"
              required
            />
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

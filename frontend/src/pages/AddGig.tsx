import React, { useState, FormEventHandler } from "react";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState<File | null>(null);
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
  const handleFeature = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const featureInput = e.currentTarget.elements.namedItem(
      "feature"
    ) as HTMLInputElement;
    const feature = featureInput.value.trim();
    if (feature) {
      setGigData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }));
      featureInput.value = ""; // Clear input
    }
  };

  // Remove feature
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

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form className="sections" onSubmit={handleSubmit}>
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
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
              name="desc"
              id="desc"
              placeholder="Brief description to introduce your service"
              rows={6}
              value={gigData.desc}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="details">
            <label htmlFor="shortTitle">Service Title</label>
            <input
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
              type="number"
              name="revisionNumber"
              id="revisionNumber"
              value={gigData.revisionNumber}
              onChange={handleChange}
              min="0"
              required
            />

            <form onSubmit={handleFeature}>
              <label htmlFor="feature">Add Features</label>
              <input
                type="text"
                id="feature"
                name="feature"
                placeholder="e.g. page design"
              />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {gigData.features.map((f) => (
                <div className="item" key={f}>
                  {f}
                  <button type="button" onClick={() => handleRemoveFeature(f)}>
                    X
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="price">Price ($)</label>
            <input
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

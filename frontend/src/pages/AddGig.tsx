import React, { useState, FormEventHandler, useEffect } from "react";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
interface Category {
  name: string;
}
const Add = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    apiClient
      .get("/admin/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedCover = singleFile
        ? await imageCompression(singleFile, compressionOptions)
        : null;

      const cover = compressedCover ? await upload(compressedCover) : "";

      const compressedFiles = await Promise.all(
        files.map((file) => imageCompression(file, compressionOptions))
      );

      const images = await Promise.all(
        compressedFiles.map((file) => upload(file))
      );

      // Update the gig data state
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
    <div className="add mt-32 lg:max-w-[70%] mx-auto ">
      <div className="container  py-12 px-0">
        <h1 className=" font-light text-3xl mb-7">Add New Gig</h1>
        <form className="sections " onSubmit={handleSubmit}>
          <div>
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
          </div>

          <div className="my-8">
            <label htmlFor="cat">Category</label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              name="cat"
              id="cat"
              value={gigData.cat}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="mobile application">Mobile Application</option>
              <option value="photo editing">Photo editing</option>
              <option value="video editing">video editing</option>
              <option value="seo">SEO</option>
            </select>
          </div>

          <p className="">Select Images: </p>
          <div className="images flex gap-8 items-center">
            <div className="flex gap-2">
              <div className="">
                <label
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                  htmlFor="coverImage"
                >
                  Cover Image
                </label>
                <input
                  name="coverImage"
                  type="file"
                  id="coverImage"
                  className="hidden"
                  onChange={handleSingleFile}
                />
              </div>
              <div>
                <label
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                  htmlFor="images"
                >
                  Upload Images
                </label>
                <input
                  name="images"
                  type="file"
                  id="images"
                  multiple
                  className="hidden"
                  onChange={handleMultipleFiles}
                />
              </div>
            </div>

            <button
              className="py-2 px-4 bg-green-500 text-white rounded-lg"
              type="button"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <div className="my-8">
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
          <div className="my-8">
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
          </div>

          <div className="my-8">
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
          </div>

          <div className="my-8">
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
          </div>

          <div className="my-8">
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
          </div>

          <div className="">
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
          </div>
          <button
            className=" my-3 text-white py-2 px-3 bg-blue-600 cursor-pointer"
            type="submit"
            onClick={handleAddFeature}
          >
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
            {uploading ? (
              <button disabled type="submit">
                Create
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 text-center bg-blue-600 my-3 text-white hover:bg-blue-700"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

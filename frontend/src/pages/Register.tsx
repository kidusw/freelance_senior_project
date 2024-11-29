import React, { useState } from "react";
import upload from "../utils/upload";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsToggleOff } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
const Register = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();
  const [sellerButton, setSellerButton] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSeller = (e: any) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
    setSellerButton(!sellerButton);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const url = await upload(file);
    try {
      await apiClient.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
    } catch (err: any) {
      console.log(err.response.data.message);
      if (err.response.data.message) {
        setLoading(false);
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="mb-16">
        <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
      </div>
      {isLoading ? (
        <div className="text-center">
          <h4 className="text-gray-600 text-lg">Creating account...</h4>
          <span className="spinner-6 block w-8 h-8 rounded-full bg-black animate-ping"></span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols gap-8">
            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="johndoe"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Country
              </label>
              <input
                name="country"
                type="text"
                placeholder="Usa"
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Activate the seller account
              </label>
              {sellerButton ? (
                <BsToggle2On onClick={handleSeller} />
              ) : (
                <BsToggleOff onClick={handleSeller} />
              )}
            </div>

            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                placeholder="+1 234 567 89"
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
                Description
              </label>

              <textarea
                placeholder="A short description of yourself"
                name="desc"
                id=""
                cols={30}
                rows={10}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;

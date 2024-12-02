import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [searchInput, setInput] = useState();
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/gigs?search=${searchInput}`);
  };
  console.log(searchInput);
  return (
    <div className="flex justify-center items-center my-4 h-[600px] p-5 bg-green-950 text-white lg">
      <div className="flex items-center lg:w-[90%]">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl lg:text-5xl">
            Find the perfect <i className="font-light">freelance</i> services in{" "}
            <b className="font-black">Ethiopia</b>
          </h1>
          <div className="flex items-center justify-between bg-white rounded-md">
            <div className="flex items-center gap-3">
              <img
                className="w-[20px] h-[20px] m-[10px]"
                src="/img/search.png"
                alt=""
              />
              <input
                className="border-none outline-none lg:w-[500px] text-slate-900"
                type="text"
                placeholder="Building website"
                onChange={(e: any) => setInput(e.target.value)}
              />
            </div>
            <button
              className="bg-green-600 w-[120px] h-[45px] hover:bg-green-700"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap lg:items-center gap-3">
            <span className=" text-lg">Popular:</span>
            <button className="text-white bg-transparent border border-white px-1 py-2 rounded-2xl cursor-pointer text-sm">
              Web Design
            </button>
            <button className="text-white bg-transparent border border-white px-1 py-2 rounded-2xl cursor-pointer text-sm">
              Wordpress
            </button>
            <button className="text-white bg-transparent border border-white px-1 py-2 rounded-2xl cursor-pointer text-sm">
              Logo Design
            </button>
            <button className="text-white bg-transparent border border-white px-1 py-2 rounded-2xl cursor-pointer text-sm">
              AI Services
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <img src="/img/man2.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Featured;

import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import apiClient from "../utils/apiClient";

interface User {
  username: string;
  email: string;
  password: string;
  img?: string;
  country: string;
  phone?: string;
  desc?: string;
  isSeller?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handlelogout = async () => {
    logout();
    await apiClient.post("/auth/logout");
    localStorage.clear();
  };

  const [isActive, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [currentUser, setUser] = useState<User | null>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isSeller = useMemo(() => currentUser?.isSeller, [currentUser]);

  return (
    <div
      className={`py-3 flex flex-col items-center fixed top-0 w-full right-0 ease-in duration-500 z-50 ${
        isActive || pathname !== "/"
          ? "bg-white text-slate-900"
          : "bg-green-900 text-white"
      }`}
    >
      <div className="flex justify-between items-center py-4 w-full px-3 lg:w-[90%]">
        <div>
          <Link to="/">
            <span className="text-3xl font-bold underline pb-2 decoration-blue-300">
              Talent Habesha.
            </span>
          </Link>
        </div>
        <div
          className="block lg:hidden cursor-pointer ease-in duration-500"
          onClick={() => setMobileActive(!mobileActive)}
        >
          {mobileActive ? <IoMdClose size={39} /> : <IoIosMenu size={40} />}
        </div>
        <div className="hidden lg:flex justify-between gap-x-4 text-lg relative">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          {!isLoggedIn && <span>Sign in</span>}
          {!isSeller && <span>Become a Seller</span>}
          {!isLoggedIn && <button>Join</button>}
          {isLoggedIn && (
            <div
              className="flex ml-2 gap-x-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                className="w-8 h-8 rounded-md"
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt=""
              />
              <span className="text-md font-bold">{currentUser?.username}</span>
              <div
                className={`absolute top-12 right-2 bg-white p-3 rounded-md text-slate-700 text-md w-56 ${
                  open ? "flex flex-col" : "hidden"
                }`}
              >
                {isSeller && (
                  <>
                    <Link className="link" to="/gigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add new gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                {isLoggedIn ? (
                  <>
                    {" "}
                    <Link to={"/login"} onClick={handlelogout}>
                      Logout
                    </Link>
                    <Link to={"/profile"}>Profile</Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [moblieActive, setMoblieActive] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    });

    return () => {
      return window.addEventListener("scroll", () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
      });
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "john Doe",
    isSeller: true,
  };
  return (
    <div
      className={
        isActive || pathname !== "/"
          ? "bg-white text-slate-900 py-3 flex flex-col items-center fixed top-0 w-full right-0 ease-in duration-500"
          : "bg-green-900 text-white py-3 flex flex-col items-center fixed top-0 w-full right-0 ease-in duration-500"
      }
    >
      <div className="flex justify-between items-center py-4 w-full px-3 lg:w-[90%]">
        <div>
          <Link to={"/"}>
            <span className="text-3xl font-bold underline pb-2 decoration-blue-300">
              Habesha Talent.
            </span>
          </Link>
        </div>
        <div
          className="block lg:hidden cursor-pointer ease-in duration-500"
          onClick={() => setMoblieActive(!moblieActive)}
        >
          {moblieActive ? <IoMdClose size={39} /> : <IoIosMenu size={40} />}
        </div>
        <div className="hidden lg:justify-between gap-x-4 lg:flex text-lg relative">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentUser.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div
              className="flex ml-2  gap-x-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                className="w-8 h-8 rounded-md"
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt=""
              />
              <span className="text-md font-bold">{currentUser.username}</span>
              <div
                className={
                  open
                    ? "flex flex-col absolute top-12 right-2 bg-white p-3 rounded-md text-slate-700 text-md  w-56"
                    : "options hidden"
                }
              >
                {currentUser?.isSeller && (
                  <>
                    <Link className="link" to={"/gigs"}>
                      Gigs
                    </Link>
                    <Link className="link" to={"/add"}>
                      Add new gig
                    </Link>
                  </>
                )}
                <Link className="link" to={"/orders"}>
                  Orders
                </Link>
                <Link className="link" to={"/messages"}>
                  Messages
                </Link>
                <Link className="link" to={"/"}>
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {(isActive || pathname !== "/") && (
        <div className="hidden lg:block">
          <hr className="bg-slate-850 my-3 w-full" />
          <div className="lg:flex justify-center gap-x-5  text-slate-900 text-auto lg:px-3  ">
            <Link className="link" to={"/"}>
              Graphics & Design
            </Link>
            <Link className="link" to={"/"}>
              Video & Animation
            </Link>
            <Link className="link" to={"/"}>
              Writing & Transtation
            </Link>
            <Link className="link" to={"/"}>
              AI Services
            </Link>
            <Link className="link" to={"/"}>
              Digital Marketing
            </Link>
            <Link className="link" to={"/"}>
              Music & Audio
            </Link>
            <Link className="link" to={"/"}>
              Programming & Tech
            </Link>
            <Link className="link" to={"/"}>
              Business
            </Link>
            <Link className="link" to={"/"}>
              Lifestyle
            </Link>
          </div>
        </div>
      )}
      {/* moblie menu */}

      <div
        className={
          moblieActive
            ? "flex flex-col-reverse gap-y-2 items-start bg-transparent  w-full ps-5"
            : "hidden"
        }
      >
        <span>Business</span>
        <span>Explore</span>
        <span>English</span>
        <span>Sign in</span>
        {!currentUser.isSeller && <span>Become a Seller</span>}
        {!currentUser && <button>Join</button>}
        {currentUser && (
          <div
            className="flex ml-2  gap-x-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              className="w-8 h-8 rounded-md hidden"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt=""
            />
            <span className="text-md font-bold">{currentUser.username}</span>
            <div
              className={
                open
                  ? "flex flex-col absolute top-18 left-28 bg-white p-3 rounded-md text-slate-700 text-md  w-56"
                  : "options hidden"
              }
            >
              {currentUser?.isSeller && (
                <>
                  <Link className="link" to={"/gigs"}>
                    Gigs
                  </Link>
                  <Link className="link" to={"/add"}>
                    Add new gig
                  </Link>
                </>
              )}
              <Link className="link" to={"/orders"}>
                Orders
              </Link>
              <Link className="link" to={"/messages"}>
                Messages
              </Link>
              <Link className="link" to={"/"}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;

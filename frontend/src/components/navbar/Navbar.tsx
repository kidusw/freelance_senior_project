import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className={isActive || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <span className="text">Habesha Talent</span>
          </Link>

          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentUser.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt=""
              />
              <span>{currentUser.username}</span>
              <div className={open ? "options" : "options d-none"}>
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
        <>
          <hr />
          <div className="menu">
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
        </>
      )}
    </div>
  );
};
export default Navbar;

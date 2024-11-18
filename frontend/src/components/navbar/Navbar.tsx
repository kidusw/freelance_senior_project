import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className={isActive ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <span className="text">Habesha Talent</span>

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
              <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />
              <span>{currentUser.username}</span>
              <div className={open? "options": "options d-none"}>
                {currentUser?.isSeller && (
                  <>
                    <span>Gigs</span>
                    <span>Add new gig</span>
                  </>
                )}
                <span>Orders</span>
                <span>Messages</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isActive && (
        <>
          <hr />
          <div className="menu">
            <span>Test1</span>
            <span>Test 2</span>
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;

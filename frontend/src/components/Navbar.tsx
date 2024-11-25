import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handlelogout = async () => {
    logout();
    await apiClient.post("/auth/logout");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          {" "}
          <Link to={"/logout"} onClick={handlelogout}>
            Logout
          </Link>
          <Link to={"/profile"}>Profile</Link>
        </>
      ) : (
        <>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

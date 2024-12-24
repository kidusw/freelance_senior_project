import { FaUserAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { GiGamepadCross } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

interface StatData {
  users: number;
  sellers: number;
  categories: number;
}
const Admin = () => {
  const navigate = useNavigate();
  const [statData, setStatData] = useState<StatData>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getStatus() {
      try {
        setLoading(true);
        const response = await apiClient.get("/admin/status");
        if (response.status === 200) {
          console.log(response.data.values);
          setStatData({
            users: response.data.values.users,
            sellers: response.data.values.sellers,
            categories: response.data.values.categories,
          });
          console.log(statData);
          setLoading(false);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    }
    getStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen  mb-4">
      <div className="left flex flex-col items-center pt-1 gap-4 bg-slate-300 overflow-y-scroll py-10">
        <h3 className="text-2xl">Dashboard</h3>
        <Link
          className="bg-green-600 hover:bg-green-500 w-full text-center p-3 text-white rounded-lg"
          to="/admin/users"
        >
          Users
        </Link>
        <Link
          className="bg-yellow-600 hover:bg-yellow-500 w-full text-center p-3 text-white rounded-lg"
          to="/admin/sellers"
        >
          Sellers
        </Link>
        <Link
          className="bg-blue-600 hover:bg-blue-500 w-full text-center p-3 text-white rounded-lg"
          to="/admin/categories"
        >
          Categories
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 w-full text-center p-3 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="right px-10 py-5 bg-gray-200 overflow-y-scroll">
        {isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              data-original="#000000"
            />
          </svg>
        )}
        {!isLoading && error === "" && (
          <div className="summery flex justify-start gap-10 mb-10">
            <div className="users bg-green-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
              <div>
                <FaUserAlt size={50} fill="white" />
                <span className="font-bold">Users</span>
              </div>
              <h3 className="noOfUsers text-3xl font-light">
                {statData?.users}
              </h3>
            </div>
            <div className="sellers bg-yellow-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
              <div>
                <FaPersonDotsFromLine size={50} fill="white" />
                <span className="font-bold">Sellers</span>
              </div>
              <h3 className="noOfUsers text-3xl font-light">
                {statData?.sellers}
              </h3>
            </div>
            <div className="categories bg-blue-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
              <div>
                <MdCategory size={50} fill="white" />
                <span className="font-bold">Categories</span>
              </div>
              <h3 className="noOfUsers text-3xl font-light">
                {statData?.categories}
              </h3>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};
export default Admin;

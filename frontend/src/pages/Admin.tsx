import { FaUserAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { GiGamepadCross } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen mt-24 mb-4">
      <div className="left flex flex-col items-center pt-1 gap-4 bg-slate-300 overflow-y-scroll py-10">
        <h3 className="text-2xl">Dashboard</h3>
        <Link
          className="bg-green-600 hover:bg-green-500 w-full text-center p-3 text-white rounded-lg"
          to="/admin/users"
        >
          Users
        </Link>
        <Link
          className="bg-red-600 hover:bg-red-500 w-full text-center p-3 text-white rounded-lg"
          to="/admin/sellers"
        >
          Sellers
        </Link>
        <Link
          className="bg-blue-600 hover:bg-blue-500 w-full text-center p-3 text-white rounded-lg"
          to="/"
        >
          Gigs
        </Link>
        <Link
          className="bg-yellow-600 hover:bg-yello-500 w-full text-center p-3 text-white rounded-lg"
          to="/"
        >
          Categories
        </Link>
      </div>
      <div className="right px-10 py-5 bg-gray-200 overflow-y-scroll">
        <div className="summery flex justify-start gap-20 mb-10">
          <div className="users bg-green-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
            <div>
              <FaUserAlt size={50} fill="white" />
              <span className="font-bold">Users</span>
            </div>
            <h3 className="noOfUsers text-3xl font-light">304</h3>
          </div>
          <div className="sellers bg-red-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
            <div>
              <FaPersonDotsFromLine size={50} fill="white" />
              <span className="font-bold">Sellers</span>
            </div>
            <h3 className="noOfUsers text-3xl font-light">105</h3>
          </div>
          <div className="gigs bg-blue-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
            <div>
              <GiGamepadCross size={50} fill="white" />
              <span className="font-bold">Gigs</span>
            </div>
            <h3 className="noOfUsers text-3xl font-light">501</h3>
          </div>
          <div className="categories bg-yellow-600 w-36 h-36 text-white flex flex-col gap-4 pl-3 pt-2">
            <div>
              <MdCategory size={50} fill="white" />
              <span className="font-bold">Categories</span>
            </div>
            <h3 className="noOfUsers text-3xl font-light">11</h3>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Admin;

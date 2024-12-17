import { FormEvent, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isSeller: false;
}

let originalUsers: User[] = [];

const AdminUser = () => {
  let filterdUsers: User[] | [] = [];
  const [keyword, setKeyWord] = useState("");
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await apiClient.get("/admin/sellers");
        if (response.status === 200) {
          setLoading(true);
          originalUsers = [...response.data];
          setUsers(response.data);
          console.log(response.data);

          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = (val: string) => {
    if (val === "") {
      console.log(originalUsers);
      setUsers([...originalUsers]);
    } else {
      filterdUsers = users?.filter((user) => user.username.includes(val)) || [];
      setUsers([...filterdUsers]);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      const updatedUsers = users?.filter((user) => user._id !== id);
      setUsers(updatedUsers); // Optimistic update

      try {
        const response = await apiClient.delete(`/admin/deleteUser/${id}`);
        setMessage(response.data.message);
      } catch (err) {
        console.log(err);
        setUsers(users); // Revert state on failure
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {message !== "" && (
        <div className="bg-green-300 text-xl p-5 round-dm font-light">
          {message}
        </div>
      )}
      <div className="self-end">
        <input
          onChange={(e) => {
            console.log(e.target.value);
            handleSubmit(e.target.value);
          }}
          placeholder="filter by name"
          className="p-2 border border-gray-300"
          type="text"
        />
      </div>
      <div className="font-[sans-serif] overflow-x-auto">
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
        {error !== "" && (
          <h3 className="text-2xl text-red-500 text-center">{error}</h3>
        )}
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Email
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Password
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Status
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {users?.length !== 0 &&
              users?.map((user) => (
                <tr className="even:bg-blue-50">
                  <td className="p-4 text-sm text-black">{user.username}</td>
                  <td className="p-4 text-sm text-black">{user.email}</td>
                  <td className="p-4 text-sm text-black">
                    {user.password?.substring(0, 5)}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {user.isSeller ? "Seller" : "User"}
                  </td>
                  <td className="p-4 ms-5">
                    <button
                      className="mr-4"
                      title="Delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 fill-red-500 hover:fill-red-700"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        />
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUser;

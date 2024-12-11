import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

interface User {
  _id: string;
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

interface GigData {
  _id: string;
  userId: string;
  title: string;
  images: string[];
  desc: string;
  cover: string;
  totalStars: number;
  starNumber: number;
  price: number;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
  shortTitle: string;
  sales: number;
}

const MyGigs = () => {
  const [currentUser, setUser] = useState<User>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  //?userId=${currentUser.id}

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const { isLoading, error, data } = useQuery<GigData[]>({
    queryKey: ["myGigs", currentUser?._id],
    queryFn: () =>
      apiClient.get(`/gigs/?userId=${currentUser?._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myGigs"] });
    },
  });

  const deletionFunc = (id: string) => {
    mutation.mutate(id);
    navigate("/mygigs");
  };

  const handleDelete = () => {
    setDeleteUser(true);
  };
  return (
    <>
      <div className="myGigs flex justify-center mt-20">
        {!isLoading ? (
          <div className="container lg:w-[90%] py-12 px-0">
            <div className="title flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {currentUser?.isSeller ? "Gigs" : "Orders"}
              </h1>
              {currentUser?.isSeller && (
                <Link to="/add">
                  <button
                    className="bg-green-600 hover:bg-green-500 py-2 px-3 rounded-md
               text-white font-medium border-none cursor-pointer"
                  >
                    Add New Gig
                  </button>
                </Link>
              )}
            </div>
            <table className="w-full table-fixed h-full">
              <tr className="mb-6 ">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>
                <th className="text-left">Sales</th>
                <th className="text-left">Action</th>
              </tr>

              <tbody className="">
                {data?.map((gig: GigData) => (
                  <tr className="even:bg-blue-50" key={gig._id}>
                    <Link to={`/singlegig/${gig._id}`}>
                      <td>
                        <img
                          className="image w-12 h-6 object-cover"
                          src={gig.cover}
                          alt=""
                        />
                      </td>
                    </Link>
                    <td>{gig.title}</td>
                    <td>{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      {" "}
                      {deleteUser && (
                        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                            <svg
                              onClick={() => setDeleteUser(false)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                              viewBox="0 0 320.591 320.591"
                            >
                              <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                              ></path>
                              <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                              ></path>
                            </svg>

                            <div className="my-4 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-14 fill-red-500 inline"
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
                              <h4 className="text-gray-800 text-base font-semibold mt-4">
                                Are you sure you want to delete the gig?
                              </h4>

                              <div className="text-center space-x-4 mt-8">
                                <button
                                  type="button"
                                  className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                                  onClick={() => setDeleteUser(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
                                  onClick={() => deletionFunc(gig._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>

                    <td style={{ cursor: "pointer" }}>
                      <img
                        className="delete"
                        src="./img/delete.png"
                        alt=""
                        onClick={() => handleDelete()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default MyGigs;

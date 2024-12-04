import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const queryClient = useQueryClient();
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

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };
  return (
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
                  <td>
                    <img
                      className="image w-12 h-6 object-cover"
                      src={gig.cover}
                      alt=""
                    />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      // onClick={() => handleDelete(gig._id)}
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
  );
};

export default MyGigs;

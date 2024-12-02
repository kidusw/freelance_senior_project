import { Link } from "react-router-dom";
function MyGigs() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <div className="myGigs flex justify-center mt-20">
      <div className="container lg:w-[90%] py-12 px-0">
        <div className="title flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {currentUser.isSeller ? "Gigs" : "Orders"}
          </h1>
          {currentUser.isSeller && (
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
            <tr className="even:bg-blue-50">
              <td className="">
                <img
                  className="image w-12 h-6 object-cover"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Stunning concept art</td>
              <td>
                59.<sup>99</sup>
              </td>
              <td>13</td>
              <td>
                <img
                  className="delete w-5 cursor-pointer"
                  src="./img/delete.png"
                  alt=""
                />
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="">
                <img
                  className="image w-12 h-6 object-cover"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Stunning concept art</td>
              <td>
                59.<sup>99</sup>
              </td>
              <td>13</td>
              <td>
                <img
                  className="delete w-5 cursor-pointer"
                  src="./img/delete.png"
                  alt=""
                />
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="">
                <img
                  className="image w-12 h-6 object-cover"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Stunning concept art</td>
              <td>
                59.<sup>99</sup>
              </td>
              <td>13</td>
              <td>
                <img
                  className="delete w-5 cursor-pointer"
                  src="./img/delete.png"
                  alt=""
                />
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td className="">
                <img
                  className="image w-12 h-6 object-cover"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Stunning concept art</td>
              <td>
                59.<sup>99</sup>
              </td>
              <td>13</td>
              <td>
                <img
                  className="delete w-5 cursor-pointer"
                  src="./img/delete.png"
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;

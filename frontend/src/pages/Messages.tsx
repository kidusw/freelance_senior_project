import { Link } from "react-router-dom";
function Messages() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const message = ` Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  Necessitatibus aut temporibus saepe, voluptatibus voluptate
  aliquam maiores explicabo. Dignissimos quibusdam quisquam beatae
  ipsum, nam maxime accusamus numquam! Vel aspernatur amet
  veritatis.`;

  return (
    <div className="myGigs flex justify-center mt-20">
      <div className="container lg:w-[90%] py-12 px-0">
        <div className="title flex items-center justify-between">
          <h1 className="text-2xl my-5 font-bold">Messages</h1>
        </div>
        <table className="w-full table-auto h-full">
          <tr className="mb-6 ">
            <th className="text-left">Buyer</th>
            <th className="text-left">Last Message</th>
            <th className="text-left">Date</th>
            <th className="text-left">Action</th>
          </tr>
          <tbody className="space-x-3">
            <tr className="even:bg-blue-50">
              <td>John Doe</td>
              <td className="max-w-[360px]"><Link className="link" to="/message/2">{message.slice(0, 90) + "..."}</Link></td>
              <td>1 day a go</td>
              <td>
                <button className="py-2 px-3 text-white bg-green-500 hover:bg-green-400 cursor-pointer">
                  Mark as Read
                </button>
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td>John Doe</td>
              <td className="max-w-[360px]"><Link className="link" to="/message/2">{message.slice(0, 90) + "..."}</Link></td>
              <td>1 day a go</td>
              <td>
                <button className="py-2 px-3 text-white bg-green-500 hover:bg-green-400 cursor-pointer">
                  Mark as Read
                </button>
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td>John Doe</td>
              <td className="max-w-[360px]"><Link className="link" to="/message/2">{message.slice(0, 90) + "..."}</Link></td>
              <td>1 day a go</td>
              <td>
                <button className="py-2 px-3 text-white bg-green-500 hover:bg-green-400 cursor-pointer">
                  Mark as Read
                </button>
              </td>
            </tr>
            <tr className="even:bg-blue-50">
              <td>John Doe</td>
              <td className="max-w-[360px]"><Link className="link" to="/message/2">{message.slice(0, 90) + "..."}</Link></td>
              <td>1 day a go</td>
              <td>
                <button className="py-2 px-3 text-white bg-green-500 hover:bg-green-400 cursor-pointer">
                  Mark as Read
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Messages;

import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="message flex justify-center">
      <div className="container lg:w-[90%] m-12">
        <span className="breadcrumbs font-light text-xs text-gray-500">
          <Link to="/messages">Messages</Link> John Doe
        </span>
        <div className="messages my-7 p-12 flex flex-col gap-20 h-[500px] overflow-scroll">
          <div className="item flex gap-5 max-w-[600px] text-xl">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-gray-100 rounded-e-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="item owner flex gap-5 max-w-[600px] text-xl flex-row-reverse self-end">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-blue-500 text-white rounded-s-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>

          <div className="item flex gap-5 max-w-[600px] text-xl">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-gray-100 rounded-e-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="item owner flex gap-5 max-w-[600px] text-xl flex-row-reverse self-end">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-blue-500 text-white rounded-s-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>

          <div className="item flex gap-5 max-w-[600px] text-xl">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-gray-100 rounded-e-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="item owner flex gap-5 max-w-[600px] text-xl flex-row-reverse self-end">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-blue-500 text-white rounded-s-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>

          <div className="item flex gap-5 max-w-[600px] text-xl">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-gray-100 rounded-e-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className="item owner flex gap-5 max-w-[600px] text-xl flex-row-reverse self-end">
            <img
              className="w-12 h-12 rounded-[50%]"
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p className="p-5 bg-blue-500 text-white rounded-s-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
        </div>
        <hr className="h-0 border-[0.5px] my-5" />
        <div className="write flex items-center justify-between">
          <textarea
            cols={30}
            rows={10}
            className="w-[80%] h-[100px] p-3 border border-gray-200"
            placeholder="write a message"
          />
          <button className="bg-green-500 text-white p-5 font-medium rounded-md w-[100px]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;

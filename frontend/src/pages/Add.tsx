const Add = () => {
  return (
    <div className="add mt-32 flex justify-center ">
      <div className="container lg:w-[80%] py-12 px-0">
        <h1 className="text-gray-500 font-light text-3xl mb-7">Add New Gig</h1>
        <div className="sections flex justify-around w-full flex-wrap">
          <div className="info flex flex-col gap-3 justify-between ">
            <label htmlFor="">Title</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category</label>
            <select name="cats" id="cats">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" />
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple />
            <label htmlFor="">Description</label>
            <textarea
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              name=""
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols={2}
              rows={5}
            ></textarea>
            <button className="bg-green-500 text-white py-2">Create</button>
          </div>
          <div className="details flex flex-col gap-3 justify-between">
            <label htmlFor="">Service Title</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              name=""
              id=""
              placeholder="Short description of your service"
              cols={2}
              rows={5}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
            />
            <label htmlFor="">Revision Number</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
            />
            <label htmlFor="">Add Features</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. page design"
            />
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. file uploading"
            />
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. setting up a domain"
            />
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              placeholder="e.g. hosting"
            />
            <label htmlFor="">Price</label>
            <input
              className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

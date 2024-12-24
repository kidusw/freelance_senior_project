import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
interface Category {
  name: string;
}
const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    apiClient
      .get("/admin/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Optimistic update
    if (category.trim() === "") return;
    setCategories([...(categories ?? []), { name: category }]);
    apiClient
      .post("/admin/addCategory", { category })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setCategory("");
  };
  const handleDelete = (category: string) => {
    setCategories(categories?.filter((cat) => cat.name !== category));
    console.log(category);
    apiClient
      .delete("/admin/deleteCategory", { data: { name: category } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          placeholder="Add Category"
          className="py-2 px-2 min-w-[330px] outline-none border border-gray-300"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 rounded-sm text-white"
        >
          Add
        </button>
      </form>
      <table className=" min-w-[400px] bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">
              Category
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {categories?.map((category) => (
            <tr className="even:bg-blue-50" key={category.name}>
              <td className="p-4 text-sm text-black">{category?.name}</td>
              <td className="p-4">
                <button
                  className="mr-4"
                  title="Delete"
                  onClick={() => handleDelete(category.name)}
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
  );
};
export default AdminCategories;

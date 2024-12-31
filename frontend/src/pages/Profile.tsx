import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import upload from "../utils/upload";

interface Profile {
  _id: string;
  username: string;
  email: string;
  img: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Fetch the profile
  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/auth/profile", {
        withCredentials: true,
      });
      setProfile(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching profile");
    }
  };

  // Handle input changes for editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Submit updated profile data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = await upload(file);
    try {
      const response = await apiClient.put(
        "/users/edit",
        { ...updatedProfile, img: url },
        {
          withCredentials: true,
        }
      );
      console.log("Profile updated successfully:", response.data);
      setProfile(response.data.user); // Update the local state with the updated profile
      setEditing(false); // Exit editing mode
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="my-40 lg:max-w-[90%] flex justify-center">
      <div className="broder border-2 p-8 rounded-lg shadow-lg shadow-blue-300 border-blue-300 ">
        <h2 className="text-2xl mb-8 font-mono">
          Welcome, <span className="font-light"> {profile.username}</span>
        </h2>
        <img
          className="rounded-full w-[100px] h-[100px] mb-3"
          src={profile.img || "../../public/img/noavatar.jpg"}
          alt="Profile"
        />
        <h2 className="text-2xl mb-3 font-mono">
          Email: <span className="font-light">{profile.email}</span>
        </h2>
        <h2 className="text-2xl mb-3 font-mono">
          Username: <span className="font-light">{profile.username}</span>
        </h2>
        {!isEditing ? (
          <>
            <input hidden type="text" value={profile.username} disabled />
            <button
              className="py-2 px-4 bg-yellow-500 text-white rounded-md"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="mb-3 px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="text"
              name="username"
              value={
                updatedProfile.username !== undefined
                  ? updatedProfile.username
                  : profile.username || ""
              }
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              className="mb-3 px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              type="email"
              name="email"
              value={
                updatedProfile.email !== undefined
                  ? updatedProfile.email
                  : profile.email || ""
              }
              onChange={handleChange}
              placeholder="Email"
            />
            <label htmlFor="" className="text-gray-800 text-sm mb-2 block">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleFile}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
            />
            <div className="my-3">
              <button
                className="py-2 me-4 px-4 rounded-md bg-green-600 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="py-2 px-4 rounded-md bg-red-600 text-white"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;

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
    <div className="my-40">
      <h2>Welcome, {profile.username}</h2>
      <h2>Email: {profile.email}</h2>

      <img
        src={profile.img || "../../public/img/noavatar.jpg"}
        alt="Profile"
        style={{
          height: 50,
          width: 50,
          border: "0.8px solid black",
          borderRadius: 50,
        }}
      />
      {!isEditing ? (
        <>
          <input type="text" value={profile.username} disabled />
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

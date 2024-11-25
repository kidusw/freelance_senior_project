import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

interface Profile {
  username: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({ username: "" });
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState(null);

  const [isEditing, setEditing] = useState<boolean>(false);
  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/auth/profile", {
        withCredentials: true,
      });
      console.log(response.data.user);
      setProfile(response.data.user);
      setUsername(response.data.user.username);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching profile");
    }
  };
  const handleEdit = () => {
    setEditing(!isEditing);
  };
  const handleSave = () => {
    setEditing(!isEditing);
  };
  console.log(username);
  //   const fetchAdminData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/auth/admin", {
  //         withCredentials: true,
  //       });
  //       alert(response.data.message);
  //     } catch (err:any) {
  //       alert(err.response?.data?.message || "You do not have admin access");
  //     }
  //   };

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
    <div>
      <h2>Welcome, {profile.username}</h2>
      {!isEditing ? (
        <input type="text" name="username" value={profile.username} disabled />
      ) : (
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      )}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;

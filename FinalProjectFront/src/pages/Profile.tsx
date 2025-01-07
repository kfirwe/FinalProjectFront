import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import PostCard from "../components/PostCard";
import "./Profile.css";

interface UserProfile {
  email: string;
  username: string;
  phone: string;
  profileImage: string; // Base64-encoded image
}

interface Post {
  id: string;
  title: string;
  price: number;
  image: string;
  likes: number;
  comments: number;
}

const Profile = () => {
  const { token } = useContext(AuthContext) || {};
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch profile.");
        } else {
          setError("Failed to fetch profile.");
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/posts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch posts.");
        } else {
          setError("Failed to fetch posts.");
        }
      }
    };

    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/liked-posts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLikedPosts(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to fetch liked posts."
          );
        } else {
          setError("Failed to fetch liked posts.");
        }
      }
    };

    if (token) {
      fetchProfile();
      fetchPosts();
      fetchLikedPosts();
    }
  }, [token]);

  const handleEditField = async (field: string) => {
    try {
      const updatedData = { [field]: editedValue };
      const response = await axios.put(
        "http://localhost:5000/api/users/",
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data.user);
      setEditingField(null);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Failed to update ${field}.`);
      } else {
        setError(`Failed to update ${field}.`);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(response.data.user);
      setSelectedImage(null);
      setEditingField(null);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update image.");
      } else {
        setError("Failed to update image.");
      }
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditedValue("");
    setSelectedImage(null);
  };

  if (!profile) return <p className="loading-text">Loading...</p>;

  return (
    <div className="profile-container container">
      <h1 className="mb-4 profile-title">Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Left Section: User Details */}
        <div className="col-md-4 user-details">
          <div className="card profile-card shadow-sm">
            <div className="profile-image-container">
              <img
                src={
                  profile.profileImage
                    ? `data:image/png;base64,${profile.profileImage}`
                    : "/default_user.png" // Default image path
                }
                alt={profile.username || "User"}
                className="card-img-top profile-image"
              />
              <FaEdit
                className="edit-icon top-right"
                onClick={() => {
                  setEditingField("profileImage");
                  setEditedValue("");
                }}
              />
              {editingField === "profileImage" && (
                <div>
                  <input
                    type="file"
                    id="imageUpload"
                    className="form-control mb-2"
                    onChange={(e) =>
                      setSelectedImage(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={handleImageUpload}
                  >
                    Save Image
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="editable-field">
                <p className="card-text">
                  <strong>Email:</strong>{" "}
                  {editingField === "email" ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={profile.email}
                        onChange={(e) => setEditedValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2 mt-2"
                        onClick={() => handleEditField("email")}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {profile.email}
                      <FaEdit
                        className="edit-icon"
                        onClick={() => setEditingField("email")}
                      />
                    </>
                  )}
                </p>
              </div>
              <div className="editable-field">
                <p className="card-text">
                  <strong>Phone:</strong>{" "}
                  {editingField === "phone" ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={profile.phone}
                        onChange={(e) => setEditedValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2 mt-2"
                        onClick={() => handleEditField("phone")}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {profile.phone}
                      <FaEdit
                        className="edit-icon"
                        onClick={() => setEditingField("phone")}
                      />
                    </>
                  )}
                </p>
              </div>
              <div className="editable-field">
                <p className="card-text">
                  <strong>Username:</strong>{" "}
                  {editingField === "username" ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={profile.username}
                        onChange={(e) => setEditedValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2 mt-2"
                        onClick={() => handleEditField("username")}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {profile.username}
                      <FaEdit
                        className="edit-icon"
                        onClick={() => setEditingField("username")}
                      />
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Posts and Liked Posts */}
        <div className="col-md-8">
          <div className="scroll-section shadow-sm">
            <h5>Liked Posts</h5>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <div key={post.id} className="mb-3">
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <p className="text-muted">No liked posts found.</p>
            )}
          </div>

          <div className="scroll-section shadow-sm mt-4">
            <h5>My Posts</h5>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="mb-3">
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <p className="text-muted">No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

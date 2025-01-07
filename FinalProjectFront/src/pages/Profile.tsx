import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

interface UserProfile {
  displayName: string;
  bio: string;
  profileImage: string;
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
  const [profile, setProfile] = useState<UserProfile>({
    displayName: "John Doe",
    bio: "Welcome to my profile!",
    profileImage: "/default-profile.png",
  });
  const [posts, setPosts] = useState<Post[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    // Fetch user's posts (replace with API call)
    setPosts([
      {
        id: "1",
        title: "My Old Laptop",
        price: 500,
        image: "/laptop.jpg",
        likes: 3,
        comments: 2,
      },
    ]);
  }, []);

  const handleEditProfile = () => {
    // Save updated profile (replace with API call)
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleDeletePost = (id: string) => {
    // Delete post API call
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Profile</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={profile.profileImage}
            alt={profile.displayName}
            className="img-fluid rounded-circle mb-3"
          />
          {isEditing ? (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                value={editedProfile.displayName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    displayName: e.target.value,
                  })
                }
              />
              <textarea
                className="form-control mb-2"
                value={editedProfile.bio}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bio: e.target.value })
                }
              />
              <button className="btn btn-success" onClick={handleEditProfile}>
                Save
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h3>{profile.displayName}</h3>
              <p>{profile.bio}</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h3>My Posts</h3>
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 mb-3" key={post.id}>
                <PostCard {...post} />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

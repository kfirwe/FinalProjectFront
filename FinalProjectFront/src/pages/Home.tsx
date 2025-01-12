import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

interface Post {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  likes: number;
  comments: number;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data.posts);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch posts.");
        } else {
          setError("Failed to fetch posts.");
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Products for Sale</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

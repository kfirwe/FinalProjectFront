import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

interface Post {
  id: string;
  title: string;
  price: number;
  image: string;
  likes: number;
  comments: number;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts (replace with API call)
    setPosts([
      {
        id: "1",
        title: "Laptop for Sale",
        price: 1000,
        image: "/laptop.jpg",
        likes: 5,
        comments: 2,
      },
      {
        id: "2",
        title: "iPhone 13",
        price: 800,
        image: "/iphone.jpg",
        likes: 10,
        comments: 4,
      },
    ]);
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Products for Sale</h1>
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

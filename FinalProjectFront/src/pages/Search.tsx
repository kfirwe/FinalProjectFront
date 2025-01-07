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

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    // Fetch posts (replace with API call)
    setPosts([
      {
        id: "1",
        title: "Gaming Laptop",
        price: 1200,
        image: "/gaming-laptop.jpg",
        likes: 8,
        comments: 3,
      },
      {
        id: "2",
        title: "Used Phone",
        price: 400,
        image: "/used-phone.jpg",
        likes: 5,
        comments: 2,
      },
    ]);
  }, []);

  const handleSearch = () => {
    // Filter posts (replace with backend API search)
    setPosts((prevPosts) =>
      prevPosts.filter((post) => {
        const matchesQuery = query
          ? post.title.toLowerCase().includes(query.toLowerCase())
          : true;
        const matchesMinPrice = minPrice ? post.price >= minPrice : true;
        const matchesMaxPrice = maxPrice ? post.price <= maxPrice : true;

        return matchesQuery && matchesMinPrice && matchesMaxPrice;
      })
    );
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Search</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Min price"
            value={minPrice === "" ? "" : minPrice}
            onChange={(e) =>
              setMinPrice(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Max price"
            value={maxPrice === "" ? "" : maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-3" key={post.id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

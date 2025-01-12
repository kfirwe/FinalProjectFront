import React, { useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

interface Post {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  likes: number;
  comments: number;
}

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts", {
        params: {
          query,
          minPrice: minPrice === "" ? undefined : minPrice,
          maxPrice: maxPrice === "" ? undefined : maxPrice,
        },
      });
      setPosts(response.data.posts);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to search posts.");
      } else {
        setError("Failed to search posts.");
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Search</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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

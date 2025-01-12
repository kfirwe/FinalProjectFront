import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { token } = useContext(AuthContext) || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png"]; // Allowed types
      if (!validImageTypes.includes(file.type)) {
        setError("Only JPG and PNG images are allowed.");
        setImage(null);
        setPreview(null);
        return;
      }

      // If valid, set the image and generate a preview
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) {
      setError("Title and price are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (description) formData.append("description", description);
    formData.append("price", price.toString());
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Post created successfully!");
      setError(null);
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview(null);
      setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create post.");
      } else {
        setError("Failed to create post.");
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Create a Post</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-3">
              <label>Preview:</label>
              <img
                src={preview}
                alt="Preview"
                className="img-fluid mt-2 rounded"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

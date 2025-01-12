import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import axiosInstance from "../instances/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API call to login endpoint
      const response = await axiosInstance.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Extract token from response
      const token = response.data.token;

      // Save the token in context or local storage
      authContext?.login(token);

      // Clear error state and redirect to home page
      setError(null);
      navigate("/");
    } catch (err: unknown) {
      // Handle errors from API
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Invalid credentials. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form
        className="w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleLogin}
      >
        <h2 className="mb-4 text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
        <p className="text-center mt-3">
          Didn’t sign up? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

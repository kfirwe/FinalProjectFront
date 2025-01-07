import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeToken = "fakeToken123"; // Replace with real token
    authContext?.login(fakeToken);
    navigate("/dashboard");
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form
        className="w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleLogin}
      >
        <h2 className="mb-4 text-center">Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

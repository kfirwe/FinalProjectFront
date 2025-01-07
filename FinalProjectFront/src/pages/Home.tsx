import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 text-success">Welcome to My App!</h1>
      <p className="lead">
        Manage your content, posts, and more. Login or sign up to get started.
      </p>
      <Link to="/login" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

export default Home;

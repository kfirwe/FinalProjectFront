import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" autoClose={3000} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;

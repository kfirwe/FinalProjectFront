import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;

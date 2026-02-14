import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";

// ✅ Backend base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <App />
      </AuthProvider>
    </BrowserRouter>
  
);

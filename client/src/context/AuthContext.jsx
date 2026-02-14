


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   /* ================= TOKEN HANDLER ================= */

//   const setAuthToken = (token) => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       localStorage.setItem("token", token);
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//       localStorage.removeItem("token");
//     }
//   };

//   /* ================= LOAD USER ON REFRESH ================= */

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         setAuthToken(token);
//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         setUser({ id: decoded.id });
//       } catch {
//         setAuthToken(null);
//         setUser(null);
//       }
//     }

//     setInitialLoading(false);
//   }, []);

//   /* ================= AUTH HANDLERS ================= */

//   // LOGIN
//   const login = async (email, password) => {
//     try {
//       setLoading(true);
//       const res = await axios.post("/api/auth/login", { email, password });
//       setAuthToken(res.data.token);
//       setUser(res.data.user);
//       toast.success("Login successful 🎉");
//       return true;
//     } catch (err) {
//       if (err.response?.data?.requireOTP) {
//         throw new Error("VERIFY_EMAIL");
//       }
//       toast.error(err.response?.data?.message || "Login failed");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // SIGNUP
//   const signup = async (name, email, password) => {
//     try {
//       setLoading(true);
//       const res = await axios.post("/api/auth/signup", {
//         name,
//         email,
//         password,
//       });
//       toast.success(res.data.message);
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY OTP
//   const verifyOTP = async (email, otp) => {
//     try {
//       setLoading(true);
//       await axios.post("/api/auth/verify-otp", { email, otp });
//       toast.success("Email verified successfully");
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FORGOT PASSWORD
//   const forgotPassword = async (email) => {
//     try {
//       setLoading(true);
//       await axios.post("/api/auth/forgot-password", { email });
//       toast.success("OTP sent for password reset");
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // RESET PASSWORD
//   const resetPassword = async (email, otp, newPassword) => {
//     try {
//       setLoading(true);
//       await axios.post("/api/auth/reset-password", {
//         email,
//         otp,
//         newPassword,
//       });
//       toast.success("Password reset successful");
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Reset failed");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // LOGOUT
//   const logout = () => {
//     setAuthToken(null);
//     setUser(null);
//     toast.success("Logged out");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         signup,
//         verifyOTP,
//         forgotPassword,
//         resetPassword,
//         logout,
//       }}
//     >
//       {!initialLoading && children}
//     </AuthContext.Provider>
//   );
// };

// /* ================= CUSTOM HOOK ================= */

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };































import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ================= TOKEN HANDLER ================= */

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };

  /* ================= LOAD USER ON REFRESH ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setAuthToken(token);
        setUser(JSON.parse(storedUser));
      } catch {
        setAuthToken(null);
        setUser(null);
      }
    }

    setInitialLoading(false);
  }, []);

  /* ================= AUTH HANDLERS ================= */

  // LOGIN
const login = async (email, password) => {
  try {
    setLoading(true);

    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    setAuthToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login successful 🎉");
    return res.data.user;

  } catch (err) {
    // 🔥 ONLY TRIGGER OTP ON REAL 403
    if (
      err.response?.status === 403 &&
      err.response?.data?.requireOTP === true
    ) {
      throw new Error("VERIFY_EMAIL");
    }

    toast.error(err.response?.data?.message || "Login failed");
    throw err;
  } finally {
    setLoading(false);
  }
};


  // SIGNUP
  const signup = async (name, email, password, role = "user") => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
      toast.success(res.data.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/verify-otp", { email, otp });
      toast.success("Email verified successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("OTP sent for password reset");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const resetPassword = async (email, otp, newPassword) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out");
  };

  /* ================= ROLE HELPERS ================= */

  const isUser = user?.role === "user";
  const isOrganizer = user?.role === "organizer";

  const userDashboardPath = "/dashboard/user";
  const organizerDashboardPath = "/dashboard/organizer";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        verifyOTP,
        forgotPassword,
        resetPassword,
        logout,

        // 🔥 ROLE HELPERS
        isUser,
        isOrganizer,
        userDashboardPath,
        organizerDashboardPath,
      }}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

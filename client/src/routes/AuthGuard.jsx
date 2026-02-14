
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * requireAuth = true  → only logged-in users allowed
 * requireAuth = false → only logged-out users allowed
 */
const AuthGuard = ({ requireAuth, allowedRoles, children }) => {
  const {
    user,
    loading,
    userDashboardPath,
    organizerDashboardPath,
  } = useAuth();

  if (loading) return null; // you can add loader here

  // 1. 🔐 PROTECTED ROUTES (Dashboard, Profile, etc.)
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // 2. 🛡️ ROLE-BASED ACCESS CONTROL
  if (requireAuth && user && allowedRoles) {
    if (!allowedRoles.includes(user.role)) {
      // Unauthorized role -> Redirect to their allowed dashboard
      const redirectPath =
        user.role === "organizer" ? organizerDashboardPath : userDashboardPath;
      return <Navigate to={redirectPath} replace />;
    }
  }

  // 3. 🚫 PUBLIC ROUTES (Auth page blocked after login)
  if (!requireAuth && user) {
    const redirectPath =
      user.role === "organizer"
        ? organizerDashboardPath
        : userDashboardPath;

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthGuard;





import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />

      {/* Offset for fixed navbar */}
      <div className="pt-17 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;

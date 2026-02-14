import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* Offset for fixed navbar */}
      <div className="pt-17 min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;

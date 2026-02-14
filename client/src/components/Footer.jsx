import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Eventify</h3>
          <p>Manage and discover events effortlessly.</p>
        </div>
        {/* <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p>Email: support@eventify.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
        </div> */}
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <p>LinkedIn | Instagram | Twitter</p>
        </div>
      </div>
      {/* <p className="text-center text-sm mt-8">
        © 2026 Event Management System
      </p> */}
    </footer>
  );
};

export default Footer;

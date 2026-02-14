


import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import About from "./pages/About";
import Auth from "./pages/Auth";

import UserDashboard from "./pages/Dashboard/UserDashboard";
import OrganizerDashboard from "./pages/Dashboard/OrganizerDashboard";

import AuthGuard from "./routes/AuthGuard";

import CreateEvent from "./pages/Events/CreateEvent";
import MyEvents from "./pages/Events/MyEvents";
import EditEvent from "./pages/Events/EditEvent";

// 🔥 NEW PAGES
import SeatSelection from "./pages/Events/SeatSelection";
import Payment from "./pages/Events/Payment";
import MyBookings from "./pages/Events/MyBookings";
import Ticket from "./pages/Events/Ticket";
import ScanTicket from "./pages/Events/ScanTicket";
import EventRegistrations from "./pages/Dashboard/EventRegistrations";
import OrganizerEvents from "./pages/Dashboard/OrganizerEvents";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC PAGES (WITH FOOTER) ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/about" element={<About />} />

        {/* ================= BOOKING FLOW ================= */}
        <Route
          path="/events/:id/seats"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["user"]}>
              <SeatSelection />
            </AuthGuard>
          }
        />

        <Route
          path="/events/:id/payment"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["user"]}>
              <Payment />
            </AuthGuard>
          }
        />

        {/* ================= USER DASHBOARD ================= */}
        <Route
          path="/dashboard/user"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["user"]}>
              <UserDashboard />
            </AuthGuard>
          }
        />
        
        <Route
  path="/dashboard/user/my-bookings"
  element={
    <AuthGuard requireAuth={true} allowedRoles={["user"]}>
      <MyBookings/>
    </AuthGuard>
  }
/>



      <Route
  path="/ticket/:id"
  element={
    <AuthGuard requireAuth={true}>
      <Ticket />
    </AuthGuard>
  }
/>





        {/* ================= ORGANIZER DASHBOARD ================= */}
        <Route
          path="/dashboard/organizer"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
              <OrganizerDashboard />
            </AuthGuard>
          }
        />

        {/* ================= ORGANIZER EVENT ROUTES ================= */}
        <Route
          path="/events/create"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
              <CreateEvent />
            </AuthGuard>
          }
        />

        <Route
          path="/events/myEvents"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
              <MyEvents />
            </AuthGuard>
          }
        />

        <Route
          path="/events/edit/:id"
          element={
            <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
              <EditEvent />
            </AuthGuard>
          }
        />

        <Route
  path="/dashboard/organizer/scan"
  element={
    <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
      <ScanTicket />
    </AuthGuard>
  }
/>



<Route
  path="/dashboard/organizer/events/:eventId/registrations"
  element={
    <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
      <EventRegistrations />
    </AuthGuard>
  }
/>



<Route
  path="/dashboard/organizer/registrations"
  element={
    <AuthGuard requireAuth={true} allowedRoles={["organizer"]}>
      <OrganizerEvents />
    </AuthGuard>
  }
/>





      </Route>


      {/* ================= AUTH PAGES (NO FOOTER) ================= */}
      <Route element={<AuthLayout />}>
        <Route
          path="/auth"
          element={
            <AuthGuard requireAuth={false}>
              <Auth />
            </AuthGuard>
          }
        />

<Route
  path="/profile"
  element={
    <AuthGuard requireAuth={true}>
      <Profile />
    </AuthGuard>
  }
/>






      </Route>
    </Routes>
  );
}

export default App;














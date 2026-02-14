import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pdfRef = useRef(null);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TICKET ================= */
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTicket(res.data);
      } catch {
        toast.error("Ticket not found");
        navigate("/dashboard/user");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id, navigate]);

  /* ================= DOWNLOAD PDF ================= */
  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(`Event-Ticket-${ticket._id}.pdf`);
  };

  if (loading) {
    return (
      <div className="pt-20 text-center text-gray-500">Loading ticket…</div>
    );
  }

  if (!ticket) return null;

  const qrData = ticket._id;

  const styles = {
    footer: {
      borderTop: "1px solid #e5e7eb",
      padding: "24px 32px",
      fontSize: "13px",
      color: "#4b5563",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 font-medium hover:underline"
      >
        ← Back
      </button>

      {/* ================= VISIBLE TICKET (Tailwind, unchanged) ================= */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10">
          <h1 className="text-4xl font-extrabold">{ticket.event.title}</h1>
          <p className="mt-2 opacity-90">
            {ticket.event.date} • {ticket.event.time}
          </p>
          <p className="opacity-80">
            📍 {ticket.event.venue}, {ticket.event.location}
          </p>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold text-indigo-600 mb-2">Attendee</h2>
            <p>{ticket.user.name}</p>
            <p>{ticket.user.email}</p>

            <hr className="my-4" />

            <h2 className="text-xl font-bold text-indigo-600 mb-2">Ticket</h2>
            <p>
              Seat: <strong>{ticket.seatNumber}</strong>
            </p>
            <p>
              Amount:{" "}
              <strong>
                {ticket.amount === 0 ? "Free" : `₹${ticket.amount}`}
              </strong>
            </p>
            <p>
              Status: <strong>{ticket.status.toUpperCase()}</strong>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <QRCodeCanvas value={qrData} size={180} />

            <p className="text-sm text-gray-500 mt-2">Scan at entry gate</p>
          </div>
        </div>
      </div>

      {/* ================= PDF-ONLY TICKET (NO TAILWIND) ================= */}
      <div
        ref={pdfRef}
        style={{
          width: "794px", // Desktop width
          height: "1123px", // A4 height
          padding: "40px",
          backgroundColor: "#ffffff",
          position: "absolute",
          left: "-9999px",
          top: 0,
          fontFamily: "Arial, sans-serif",
          color: "#111827",
        }}
      >
        <div
          style={{
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "6px" }}>
            {ticket.event.title}
          </h1>
          <p>
            {ticket.event.date} • {ticket.event.time}
          </p>
          <p>
            {ticket.event.venue}, {ticket.event.location}
          </p>
        </div>

        <div style={{ display: "flex", marginTop: "40px", gap: "40px" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: "#4f46e5" }}>Attendee Details</h2>
            <p>
              <strong>Name:</strong> {ticket.user.name}
            </p>
            <p>
              <strong>Email:</strong> {ticket.user.email}
            </p>

            <hr style={{ margin: "20px 0" }} />

            <h2 style={{ color: "#4f46e5" }}>Ticket Info</h2>
            <p>
              <strong>Seat:</strong> {ticket.seatNumber}
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              {ticket.amount === 0 ? "Free" : `₹${ticket.amount}`}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status.toUpperCase()}
            </p>

            <p style={{ fontSize: "12px", marginTop: "10px" }}>
              Booking ID: {ticket._id}
            </p>
          </div>

          <div style={{ width: "220px", textAlign: "center" }}>
            <QRCodeCanvas value={qrData} size={180} />
            <p style={{ fontSize: "12px", marginTop: "8px" }}>
              Show QR at entry
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <p>• Valid for one entry only</p>
          <p>• Do not share your QR code</p>
          <p>• Organizer reserves the right to deny invalid tickets</p>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="max-w-4xl mx-auto flex gap-4 mt-8">
        <button
          onClick={downloadPDF}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-lg"
        >
          📄 Download Ticket
        </button>

        <button
          onClick={() => navigate(`/events/${ticket.event._id}`)}
          className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl text-lg"
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default Ticket;

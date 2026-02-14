import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import toast from "react-hot-toast";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const ScanTicket = () => {
  const scannerRef = useRef(null);
  const startedRef = useRef(false);

  const [result, setResult] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null); // ✅ NEW
  const navigate = useNavigate();

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          console.log("SCANNED:", decodedText);

          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
          }

          setResult(decodedText);

          try {
            const res = await axios.post(
              `/api/bookings/${decodedText}/use`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );

            setTicketInfo(res.data); // ✅ STORE ATTENDEE INFO
            toast.success("✅ Entry Allowed");
          } catch (err) {
            toast.error(err.response?.data?.message || "❌ Invalid Ticket");
          }
        },
      )
      .catch(() => {
        toast.error("Camera access denied");
      });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 py-10">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-indigo-600 font-semibold flex items-center"
        >
          ← Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-5 text-center">
            Scan Event Ticket
          </h1>

          {/* Scanner */}
          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-xl"></div>

            <div
              id="reader"
              className="w-[92%] h-[92%] rounded-lg overflow-hidden bg-black"
            />

            <div className="absolute left-4 right-4 top-1/2 h-[2px] bg-indigo-500 animate-pulse"></div>
          </div>

          {/* Attendee Result (ONLY THIS ADDED) */}
          {ticketInfo && (
            <div className="mt-5 text-center w-full">
              <h2 className="text-xl font-bold text-green-600 mb-2">
                ✅ Entry Allowed
              </h2>

              <p className="text-lg font-semibold">
                👤 {ticketInfo.attendee?.name}
              </p>

              <p className="text-gray-700">
                🎟 Seat: <strong>{ticketInfo.seat}</strong>
              </p>

              <p className="text-gray-700">
                📅 Event: <strong>{ticketInfo.event}</strong>
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl"
              >
                Scan Next Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanTicket;

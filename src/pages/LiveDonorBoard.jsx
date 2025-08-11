import React, { useState } from "react";
import "../styles/LiveDonorBoard.css";

const LiveDonorBoard = () => {
  const [donors, setDonors] = useState([
    { id: 1, name: "Ravi Sharma", bloodGroup: "A+", location: "Delhi", contact: "9878586946" },
    { id: 2, name: "Priya Mehta", bloodGroup: "B-", location: "Lucknow", contact: "8765432109" },
    { id: 3, name: "Amit Verma", bloodGroup: "O+", location: "Mumbai", contact: "7654321098" },
  ]);

  const hospitals = {
    Delhi: "AIIMS Hospital",
    Lucknow: "SGPGI Hospital",
    Mumbai: "Kokilaben Hospital",
  };

  const bookDonor = (id) => {
    const donor = donors.find((d) => d.id === id);
    const hospital = hospitals[donor.location] || "Nearest Government Hospital";

    // Generate random time slot
    const hours = Math.floor(Math.random() * 4) + 9; // Between 9 AM - 12 PM
    const minutes = Math.floor(Math.random() * 60);
    const timeSlot = `${hours}:${minutes.toString().padStart(2, "0")} AM`;

    // Simulate sending WhatsApp message
    const whatsappMsg = `Hello ${donor.name},%0AYou are requested to donate blood.%0ADetails:%0ABlood Group: ${donor.bloodGroup}%0ALocation: ${donor.location}%0AHospital: ${hospital}%0ATime Slot: ${timeSlot}`;
    const whatsappURL = `https://wa.me/91${donor.contact}?text=${whatsappMsg}`;

    alert(
      `✅ Booking confirmed!\n` +
      `Donor: ${donor.name}\n` +
      `Blood Group: ${donor.bloodGroup}\n` +
      `Location: ${donor.location}\n` +
      `Contact: ${donor.contact}\n` +
      `🏥 Hospital Assigned: ${hospital}\n` +
      `⏰ Time Slot: ${timeSlot}`
    );

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Remove booked donor
    setDonors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="donor-board">
      <h2 className="donor-title">Live Blood Donation Requests</h2>

      <div className="donor-list">
        {donors.length === 0 ? (
          <p className="no-donors">No active blood donations available right now.</p>
        ) : (
          donors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <div>
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>Location:</strong> {donor.location}</p>
                <p><strong>Contact:</strong> {donor.contact}</p>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button
                  onClick={() => window.open(`tel:${donor.contact}`)}
                  style={{
                    backgroundColor: "#b30000", // theme red
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  📞 Call
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/91${donor.contact}?text=Hello%20${donor.name},%20I%20need%20blood%20urgently.`
                    )
                  }
                  style={{
                    backgroundColor: "#138f3e", // softer WhatsApp green
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  💬 WhatsApp
                </button>

                <button
                  onClick={() => bookDonor(donor.id)}
                  style={{
                    backgroundColor: "#d43f00", // warm orange-red for theme match
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveDonorBoard;

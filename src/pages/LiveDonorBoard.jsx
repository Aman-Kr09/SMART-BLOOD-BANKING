import React, { useState } from "react";
import "../styles/LiveDonorBoard.css";

const LiveDonorBoard = () => {
  // Dummy initial donor list (simulate data from Donate page)
  const [donors, setDonors] = useState([
    { id: 1, name: "Ravi Sharma", bloodGroup: "A+", location: "Delhi" , contact: "9878586946"},
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

    alert(
      `✅ Booking confirmed!\nDonor: ${donor.name}\nBlood Group: ${donor.bloodGroup}\nLocation: ${donor.location}\nContact: ${donor.contact}\n🏥 Hospital Assigned: ${hospital}`
    );

    // Remove the booked donor
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
              <button onClick={() => bookDonor(donor.id)} className="book-btn">
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveDonorBoard;

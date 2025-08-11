import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "../styles/HospitalDashboard.css";
import "../styles/HospitalHeader.css";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const hospital =
    JSON.parse(localStorage.getItem("hospitalData")) || {
      name: "Hospital",
      id: "HSP000",
    };

  const [donors, setDonors] = useState([]);
  const [stats, setStats] = useState({
    activeCases: 3,
    availableBeds: 7,
    freeRooms: ["C-101", "C-104", "C-110"],
  });

  useEffect(() => {
    const dummyDonors = [
      {
        id: 1,
        name: "Ravi Kumar",
        donorNumber: "+919878586946",
        bloodGroup: "B+",
        Acceptor: "Anurag",
        status: "Booked",
      },
      {
        id: 2,
        name: "Neha Sharma",
        donorNumber: "+918764956839",
        bloodGroup: "A-",
        Acceptor: "Sandeep",
        status: "Booked",
      },
    ];
    setDonors(dummyDonors);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hospitalData");
    navigate("/hospital-login");
  };

  // Generate Certificate PDF
  const generateCertificate = (donor) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Blood Donation Certificate", 60, 30);
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 20, 50);
    doc.setFontSize(20);
    doc.text(`${donor.name}`, 20, 65);
    doc.setFontSize(16);
    doc.text(
      `has donated blood (${donor.bloodGroup}) on behalf of ${hospital.name}.`,
      20,
      80
    );
    doc.text("We appreciate your valuable contribution!", 20, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120);
    return doc.output("blob");
  };

  // Generate Blood Donation Card PDF
  const generateDonationCard = (donor) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Blood Donation Card", 70, 30);
    doc.setFontSize(14);
    doc.text(`Name: ${donor.name}`, 20, 50);
    doc.text(`Blood Group: ${donor.bloodGroup}`, 20, 65);
    doc.text(`Acceptor Name: ${donor.Acceptor}`, 20, 80);
    doc.text(`Contact: ${donor.donorNumber}`, 20, 95);
    doc.text(`Hospital: ${hospital.name}`, 20, 110);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 20, 125);
    return doc.output("blob");
  };

  const markCompleted = (id) => {
    const donor = donors.find((d) => d.id === id);
    if (donor) {
      // Generate both PDFs
      const certBlob = generateCertificate(donor);
      const cardBlob = generateDonationCard(donor);

      // Create download links
      const certUrl = URL.createObjectURL(certBlob);
      const cardUrl = URL.createObjectURL(cardBlob);

      // Open WhatsApp with pre-filled message
      const message = encodeURIComponent(
        `Hello ${donor.name},\n\nThank you for donating blood!\n\nHere is your Certificate: ${certUrl}\nHere is your Donation Card: ${cardUrl}\n\nRegards,\n${hospital.name}`
      );
      window.open(`https://wa.me/${donor.donorNumber}?text=${message}`, "_blank");
    }

    // Update stats & remove donor from active list
    setDonors((prev) => prev.filter((donor) => donor.id !== id));
    setStats((prev) => ({
      ...prev,
      activeCases: prev.activeCases - 1,
      availableBeds: prev.availableBeds + 1,
    }));
  };

  return (
    <div className="hospital-dashboard">
      {/* Header Section */}
      <div className="hospital-header">
        <h2>🏥 {hospital.name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Stats Section */}
      <div className="stats-boxes">
        <div className="stat-card">
          <h3>{stats.activeCases}</h3>
          <p>Current Cases</p>
        </div>
        <div className="stat-card">
          <h3>{stats.availableBeds}</h3>
          <p>Available Beds</p>
        </div>
        <div className="stat-card">
          <h3>{stats.freeRooms.join(", ")}</h3>
          <p>Free Rooms</p>
        </div>
      </div>

      {/* Donor Requests */}
      <h3>Live Donor Bookings</h3>
      <div className="donor-list">
        {donors.length === 0 ? (
          <p>No active bookings.</p>
        ) : (
          donors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Acceptor:</strong> {donor.Acceptor}</p>
              <p><strong>Contact:</strong> {donor.donorNumber}</p>
              <p><strong>Status:</strong> {donor.status}</p>
              <button onClick={() => markCompleted(donor.id)}>
                Mark as Completed
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;

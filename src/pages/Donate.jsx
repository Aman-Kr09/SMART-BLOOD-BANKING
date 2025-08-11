import React, { useState } from "react";
import "../styles/Donate.css";

const Donate = () => {
  const [formData, setFormData] = useState({
    blood_type: "",
    units: "",
    donation_date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading
      const token = localStorage.getItem("token"); // Assuming token is stored here after login
      const res = await fetch("http://localhost:4000/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setLoading(false); // Stop loading
      alert(result.message || "Donation submitted successfully!");
      setFormData({
        blood_type: "",
        units: "",
        donation_date: "",
      });
    } catch (err) {
      setLoading(false); // Stop loading in case of error
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate Blood</h2>
      <form onSubmit={handleSubmit} className="donate-form">
        <label>
          Blood Type:
          <select
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        <label>
          Units:
          <input
            type="number"
            name="units"
            min="1"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Donation Date:
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
};

export default Donate;

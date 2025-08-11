import React, { useState } from 'react';
import '../styles/TopDonors.css';
import axios from "axios";

const TopDonors = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setBloodGroup(e.target.value);
    setError('');
    setDonors([]);
  };

  const fetchDonors = async () => {
    if (!bloodGroup) {
      setError('Please enter a blood group.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/top-donors', {
        bloodGroup: bloodGroup,
      });
      setDonors(response.data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-donors-container">
      <h2>Find Top 5 Donors</h2>
      <input
        type="text"
        placeholder="Enter Blood Group (e.g., O positive)"
        value={bloodGroup}
        onChange={handleInputChange}
      />
      <button onClick={fetchDonors}>Get Top Donors</button>

      {loading && (
        <div className="falling-drops-container">
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
        </div>
      )}

      {error && <p>{error}</p>}

      {donors.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Group</th>
              <th>Predicted Score</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.ID}</td>
                <td>{donor['Blood Group']}</td>
                <td>{donor['Predicted Donor Score'].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopDonors;

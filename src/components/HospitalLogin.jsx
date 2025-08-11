import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HospitalLogin = () => {
  const [hospitalId, setHospitalId] = useState("");
  const [name, setName] = useState("");
  const [beds, setBeds] = useState(20);
  const [rooms, setRooms] = useState(10);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!hospitalId || !name) return alert("All fields are required!");

    const hospitalData = {
      hospitalId,
      name,
      beds,
      rooms,
    };

    localStorage.setItem("hospitalData", JSON.stringify(hospitalData));
    setTimeout(() => navigate("/hospital-dashboard"), 100);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Hospital Login</h2>
      <input
        style={styles.input}
        placeholder="Government Hospital ID"
        value={hospitalId}
        onChange={(e) => setHospitalId(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label style={{fontSize: '14px', color: '#555', marginTop: '10px'}}>Total Beds (Enter the total number of beds available in your hospital):</label>
      <input
        style={styles.input}
        type="number"
        placeholder="Total Beds"
        value={beds}
        onChange={(e) => setBeds(parseInt(e.target.value))}
      />
      <label style={{fontSize: '14px', color: '#555', marginTop: '10px'}}>Total Rooms (Enter the total number of rooms in your hospital):</label>
      <input
        style={styles.input}
        type="number"
        placeholder="Total Rooms"
        value={rooms}
        onChange={(e) => setRooms(parseInt(e.target.value))}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login / Register
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    color: "#c0392b",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default HospitalLogin;

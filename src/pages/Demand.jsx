import React, { useState } from 'react';
import '../styles/Demand.css';
import axios from "axios";

const Demand = () => {
  const [date, setDate] = useState('');
  const [population, setPopulation] = useState('');
  const [events, setEvents] = useState('');
  const [historicalUsage, setHistoricalUsage] = useState('');
  const [admissions, setAdmissions] = useState('');
  const [donorsAvailable, setDonorsAvailable] = useState('');
  const [temperature, setTemperature] = useState('');
  const [predictedDemand, setPredictedDemand] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handlePopulationChange = (e) => {
    setPopulation(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handleEventsChange = (e) => {
    setEvents(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handleHistoricalUsageChange = (e) => {
    setHistoricalUsage(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handleAdmissionsChange = (e) => {
    setAdmissions(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handleDonorsAvailableChange = (e) => {
    setDonorsAvailable(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
    setError('');
    setPredictedDemand(null);
  };

  const fetchDemandPrediction = async () => {
    if (
      !date ||
      !population ||
      !events ||
      !historicalUsage ||
      !admissions ||
      !donorsAvailable ||
      !temperature
    ) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setPredictedDemand(null);

      // Ensure all values are numbers
      const payload = {
        Date: date,
        Population: Number(population),
        Events: Number(events),
        HistoricalBloodUsage: Number(historicalUsage),
        HospitalAdmissions: Number(admissions),
        BloodDonorsAvailable: Number(donorsAvailable),
        Temperature: Number(temperature)
      };

      const response = await axios.post('http://localhost:4000/predict', payload);
      if (response.data && typeof response.data.PredictedBloodDemand !== 'undefined') {
        setPredictedDemand(response.data.PredictedBloodDemand);
      } else {
        setError('Invalid response from server.');
        console.error('Response:', response.data);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demand-container">
      <h2>Predict Blood Demand</h2>
      <input
        type="date"
        placeholder="Select Date"
        value={date}
        onChange={handleDateChange}
      />
      <input
        type="number"
        placeholder="Enter Population"
        value={population}
        onChange={handlePopulationChange}
      />
      <input
        type="number"
        placeholder="Events (number)"
        value={events}
        onChange={handleEventsChange}
      />
      <input
        type="number"
        placeholder="Historical Blood Usage"
        value={historicalUsage}
        onChange={handleHistoricalUsageChange}
      />
      <input
        type="number"
        placeholder="Hospital Admissions"
        value={admissions}
        onChange={handleAdmissionsChange}
      />
      <input
        type="number"
        placeholder="Blood Donors Available"
        value={donorsAvailable}
        onChange={handleDonorsAvailableChange}
      />
      <input
        type="number"
        placeholder="Temperature (°C)"
        value={temperature}
        onChange={handleTemperatureChange}
      />
      <button onClick={fetchDemandPrediction} disabled={loading}>
        {loading ? 'Predicting...' : 'Get Predicted Demand'}
      </button>

      {loading && (
        <div className="falling-drops-container">
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {predictedDemand !== null && (
        <div className="prediction-result">
          <h3>Predicted Blood Demand: {Number(predictedDemand).toFixed(2)} units</h3>
        </div>
      )}
    </div>
  );
};

export default Demand;

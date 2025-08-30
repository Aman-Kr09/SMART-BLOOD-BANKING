import React, { useState } from 'react';
import '../styles/Demand.css';
import axios from "axios";
import { 
  FaExclamationTriangle, 
  FaFire, 
  FaBell, 
  FaHeartbeat, 
  FaChartLine,
  FaCalendarAlt,
  FaUsers,
  FaThermometerHalf,
  FaHospital,
  FaClock,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from "react-icons/fa";

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
  const [isEmergency, setIsEmergency] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('normal');

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

  const handleEmergencyToggle = (e) => {
    setIsEmergency(e.target.checked);
    if (e.target.checked) {
      setUrgencyLevel('high');
    } else {
      setUrgencyLevel('normal');
    }
  };

  const handleUrgencyChange = (e) => {
    setUrgencyLevel(e.target.value);
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

      const response = await axios.post('http://localhost:5000/predict', payload);
      if (response.data && typeof response.data.PredictedBloodDemand !== 'undefined') {
        setPredictedDemand(response.data.PredictedBloodDemand);
        
        // If this is an emergency request, add it to emergency requests
        if (isEmergency) {
          const emergencyRequest = {
            id: Date.now(),
            bloodGroup: "Any", // Could be made configurable
            hospital: "Local Hospital", // Could be made configurable
            urgency: urgencyLevel === 'high' ? 'Critical' : 'High',
            units: Math.ceil(response.data.PredictedBloodDemand),
            contact: "Emergency Contact", // Could be made configurable
            description: `Emergency blood demand prediction: ${Math.ceil(response.data.PredictedBloodDemand)} units needed`,
            createdAt: new Date().toISOString(),
            status: "Active",
            predictedDemand: response.data.PredictedBloodDemand
          };
          
          const existingRequests = JSON.parse(localStorage.getItem('emergencyRequests') || '[]');
          localStorage.setItem('emergencyRequests', JSON.stringify([emergencyRequest, ...existingRequests]));
        }
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

  const getUrgencyColor = () => {
    switch (urgencyLevel) {
      case 'critical':
        return '#e74c3c';
      case 'high':
        return '#f39c12';
      case 'normal':
        return '#3498db';
      default:
        return '#3498db';
    }
  };

  const getUrgencyIcon = () => {
    switch (urgencyLevel) {
      case 'critical':
        return <FaFire />;
      case 'high':
        return <FaExclamationTriangle />;
      case 'normal':
        return <FaBell />;
      default:
        return <FaBell />;
    }
  };

  return (
    <div className="demand-container">
      <div className="demand-header">
        <h2><FaChartLine /> Predict Blood Demand</h2>
        <p>Use AI to predict blood demand and plan accordingly</p>
      </div>

      {/* Emergency Toggle Section */}
      <div className={`emergency-toggle-section ${isEmergency ? 'emergency-active' : ''}`}>
        <div className="emergency-toggle-header">
          <FaExclamationTriangle className="emergency-icon" />
          <h3>Emergency Blood Request</h3>
        </div>
        <div className="emergency-controls">
          <label className="emergency-checkbox">
            <input
              type="checkbox"
              checked={isEmergency}
              onChange={handleEmergencyToggle}
            />
            {/* <span className="checkmark"></span> */}
            <span className="label-text">This is an emergency request</span>
          </label>
          
          {isEmergency && (
            <div className="urgency-selector">
              <label>Urgency Level:</label>
              <select 
                value={urgencyLevel} 
                onChange={handleUrgencyChange}
                className={`urgency-select ${urgencyLevel}`}
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="demand-form">
        <div className="form-grid">
          <div className="form-group">
            <label>
              <FaCalendarAlt /> Date
            </label>
            <input
              type="date"
              placeholder="Select Date"
              value={date}
              onChange={handleDateChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaUsers /> Population
            </label>
            <input
              type="number"
              placeholder="Enter Population"
              value={population}
              onChange={handlePopulationChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaCalendarAlt /> Events (number)
            </label>
            <input
              type="number"
              placeholder="Events (number)"
              value={events}
              onChange={handleEventsChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaChartLine /> Historical Blood Usage
            </label>
            <input
              type="number"
              placeholder="Historical Blood Usage"
              value={historicalUsage}
              onChange={handleHistoricalUsageChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaHospital /> Hospital Admissions
            </label>
            <input
              type="number"
              placeholder="Hospital Admissions"
              value={admissions}
              onChange={handleAdmissionsChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaUsers /> Blood Donors Available
            </label>
            <input
              type="number"
              placeholder="Blood Donors Available"
              value={donorsAvailable}
              onChange={handleDonorsAvailableChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FaThermometerHalf /> Temperature (°C)
            </label>
            <input
              type="number"
              placeholder="Temperature (°C)"
              value={temperature}
              onChange={handleTemperatureChange}
              className="form-input"
            />
          </div>
        </div>

        <button 
          onClick={fetchDemandPrediction} 
          disabled={loading}
          className={`predict-btn ${isEmergency ? 'emergency' : ''} ${urgencyLevel}`}
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Predicting...
            </>
          ) : (
            <>
              {isEmergency ? getUrgencyIcon() : <FaChartLine />}
              {isEmergency ? 'Get Emergency Prediction' : 'Get Predicted Demand'}
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="falling-drops-container">
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
          <div className="blood-drop">🩸</div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <FaTimesCircle />
          <span>{error}</span>
        </div>
      )}

      {predictedDemand !== null && (
        <div className={`prediction-result ${isEmergency ? 'emergency' : ''}`}>
          <div className="result-header">
            <h3>
              {isEmergency ? <FaExclamationTriangle /> : <FaChartLine />}
              Predicted Blood Demand
            </h3>
            {isEmergency && (
              <div className={`emergency-badge ${urgencyLevel}`}>
                {getUrgencyIcon()}
                {urgencyLevel.toUpperCase()} URGENCY
              </div>
            )}
          </div>
          
          <div className="result-content">
            <div className="demand-value">
              <span className="value">{Number(predictedDemand).toFixed(2)}</span>
              <span className="unit">units</span>
            </div>
            
            <div className="demand-analysis">
              <div className="analysis-item">
                <FaArrowUp className="trend-icon up" />
                <span>Expected increase in demand</span>
              </div>
              <div className="analysis-item">
                <FaClock className="time-icon" />
                <span>Based on current trends</span>
              </div>
              {isEmergency && (
                <div className="analysis-item emergency">
                  <FaBell className="alert-icon" />
                  <span>Emergency protocols activated</span>
                </div>
              )}
            </div>
          </div>

          {isEmergency && (
            <div className="emergency-actions">
              <button className="emergency-action-btn primary">
                <FaBell />
                Alert All Donors
              </button>
              <button className="emergency-action-btn secondary">
                <FaHospital />
                Contact Hospitals
              </button>
              <button className="emergency-action-btn tertiary">
                <FaUsers />
                Mobilize Volunteers
              </button>
            </div>
          )}
        </div>
      )}

      {/* Information Section */}
      <div className="info-section">
        <div className="info-header">
          <FaInfoCircle />
          <h4>How to Use This Tool</h4>
        </div>
        <div className="info-content">
          <div className="info-item">
            <FaCalendarAlt />
            <div>
              <strong>Date:</strong> Select the date for which you want to predict demand
            </div>
          </div>
          <div className="info-item">
            <FaUsers />
            <div>
              <strong>Population:</strong> Enter the population size of the area
            </div>
          </div>
          <div className="info-item">
            <FaChartLine />
            <div>
              <strong>Historical Data:</strong> Provide past blood usage and admission data
            </div>
          </div>
          <div className="info-item">
            <FaThermometerHalf />
            <div>
              <strong>Temperature:</strong> Current temperature affects donation patterns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand;

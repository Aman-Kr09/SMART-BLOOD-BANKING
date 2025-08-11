import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the trained model
model = joblib.load('models/blood_donation_model.pkl')
df = pd.read_csv("blood_demand_data.csv")

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        date = data.get("Date")
        population = data.get("Population")
        events = data.get("Events")
        historical_usage = data.get("HistoricalBloodUsage")
        admissions = data.get("HospitalAdmissions")
        donors_available = data.get("BloodDonorsAvailable")
        temperature = data.get("Temperature")

        # Validate date
        if not date:
            return jsonify({"error": "Date is required"}), 400
        date = pd.to_datetime(date)
        day_of_week = date.dayofweek
        month = date.month

        # Validate required fields
        for field in [population, events, historical_usage, admissions, donors_available, temperature]:
            if field is None:
                return jsonify({"error": "All fields are required"}), 400

        input_data = pd.DataFrame([{
            'DayOfWeek': day_of_week,
            'Month': month,
            'Population': population,
            'Events': events,
            'HistoricalBloodUsage': historical_usage,
            'HospitalAdmissions': admissions,
            'BloodDonorsAvailable': donors_available,
            'Temperature': temperature
        }])

        prediction = model.predict(input_data)
        return jsonify({"PredictedBloodDemand": float(prediction[0])})
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)

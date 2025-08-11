from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import traceback

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    raise ValueError("GOOGLE_API_KEY not set in environment variables.")

# Configure the Gemini model
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def home():
    return "Welcome to the Gemini Chatbot API! Use /chat to interact."

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        allowed_topics = [
            # Smart Blood Banking
            "Smart Blood Banking", "Blood Demand Prediction", "Blood Supply Chain Optimization",
            "Real-Time Blood Monitoring", "Smart Blood Donation System", "Automated Blood Management",
            "Data-Driven Blood Bank", "Blood Inventory Forecasting",

            # Predicting Blood Demand
            "Blood Demand Forecasting", "Predictive Analytics for Blood Banking",
            "Machine Learning Blood Demand Prediction", "Data-Driven Blood Demand Planning",
            "Blood Usage Patterns", "Demand Prediction Models", "Time Series Analysis for Blood Demand",

            # Identifying Potential Donors
            "Potential Donor Identification", "Donor Prediction Algorithms",
            "Donor Pattern Recognition", "Machine Learning Donor Prediction",
            "Donor Database Management", "Predictive Donor Analytics",
            "Donor Availability Prediction",

            # Donor-Recipient Matching
            "Donor Matching Algorithms", "Blood Group Matching", "Recipient Compatibility Analysis",
            "Blood Type Compatibility", "Donor-Recipient Matching System",
            "Optimized Blood Matching", "Cross-Matching Blood Types",

            # Blood Donation Camps
            "Blood Donation Camp Management", "Camp Promotion Strategies",
            "Donation Camp Scheduling", "Donor Outreach Programs", "Community Blood Drives",
            "Camp Location Optimization", "Volunteer Management",

            # Promotion and Awareness
            "Donor Engagement", "Blood Donation Promotion", "Social Media Promotion for Blood Donation",
            "Awareness Campaigns", "Blood Donation Drive Promotion",
            "Promotional Strategies for Blood Banks",

            # Donor Management
            "Donor Database Management", "Donor Retention Strategies", "Donor Communication",
            "Tracking Donor History", "Managing Donor Data", "Donor Record Maintenance",
            "Donation Frequency Monitoring",

            # Technology and Data Integration
            "Artificial Intelligence in Blood Banking", "Data Analytics for Blood Banks",
            "Integration with Health Databases", "Data-Driven Decision Making",
            "Smart Blood Bank Management System", "Mobile App for Blood Donation",

            # Healthcare and Safety
            "Donor Health Monitoring", "Blood Safety and Quality Control", "Post-Donation Health Tracking",
            "Compliance with Blood Safety Standards", "Emergency Blood Availability",
            "Health Data Privacy",

            # Machine Learning and Data Science Keywords
            "Time Series Analysis", "Regression Models", "Clustering Techniques",
            "Anomaly Detection", "Deep Learning Models", "Classification Algorithms",
            "Feature Engineering", "Data Visualization for Blood Trends"
        ]

        if not any(topic.lower() in user_message.lower() for topic in allowed_topics):
            return jsonify({"response": "Sorry, I can only answer questions about Blood Banking."})

        response = model.generate_content(user_message, generation_config={"max_output_tokens": 300})
        text = response.candidates[0].content.parts[0].text
        return jsonify({"response": text})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

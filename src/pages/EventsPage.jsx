import React, { useState } from "react";
import "../styles/EventsPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Blood Donation Camp - AIIMS",
      date: "2025-08-15",
      location: "AIIMS Hospital, Delhi",
      description: "Organized by Red Cross Society. Join us in saving lives."
    },
    {
      id: 2,
      title: "Blood Donation Awareness Seminar",
      date: "2025-08-20",
      location: "Town Hall, Lucknow",
      description: "Learn about the importance of regular blood donation."
    },
    {
      id: 3,
      title: "Mega Blood Donation Drive",
      date: "2025-08-25",
      location: "City Convention Center, Mumbai",
      description: "An initiative by Rotary Club to collect 500+ units of blood."
    },
    {
      id: 4,
      title: "Youth Blood Donors Meet",
      date: "2025-08-28",
      location: "NIT Delhi Campus",
      description: "Awareness and motivation for youth to donate blood regularly."
    },
    {
      id: 5,
      title: "Blood Donation Marathon",
      date: "2025-09-01",
      location: "Bangalore Palace Grounds",
      description: "Run for a cause and donate blood after the marathon."
    },
    {
      id: 6,
      title: "Corporate Blood Camp - Infosys",
      date: "2025-09-05",
      location: "Infosys Campus, Pune",
      description: "Employees and public welcome to donate blood."
    },
    {
      id: 7,
      title: "Medical Camp & Blood Drive",
      date: "2025-09-08",
      location: "Govt. Medical College, Chennai",
      description: "Free health checkup along with blood donation opportunity."
    },
    {
      id: 8,
      title: "World Blood Donor Day Celebration",
      date: "2025-09-12",
      location: "Jawaharlal Nehru Stadium, Delhi",
      description: "Celebrate the heroes who donate blood and save lives."
    },
    {
      id: 9,
      title: "Rural Blood Awareness Camp",
      date: "2025-09-15",
      location: "Block Development Office, Jaipur",
      description: "Educating rural communities about voluntary blood donation."
    },
    {
      id: 10,
      title: "Blood Donation & Wellness Fair",
      date: "2025-09-20",
      location: "Science City, Kolkata",
      description: "Blood donation along with wellness workshops and yoga sessions."
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      alert("Please fill all required fields");
      return;
    }
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: "", date: "", location: "", description: "" });
  };

  return (
    <div className="events-container">
      <h2>Upcoming Blood Donation Camps & Seminars</h2>

      {/* Event List */}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h4>{event.title}</h4>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      {/* Add Event Form */}
      <div className="add-event">
        <h3>Add a New Event</h3>
        <form onSubmit={addEvent}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={newEvent.description}
            onChange={handleChange}
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;

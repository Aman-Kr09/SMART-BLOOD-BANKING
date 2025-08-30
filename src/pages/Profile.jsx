import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(() => localStorage.getItem('profilePhoto') || "https://i.pravatar.cc/150?img=12");

  // Handle photo change and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target.result);
        localStorage.setItem('profilePhoto', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/api/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <img
              src={photo}
              alt="Profile"
              className="profile-avatar"
            />
            <label htmlFor="profile-photo-input" className="profile-photo-edit-btn" title="Change photo">
              <span role="img" aria-label="edit">✏️</span>
            </label>
            <input
              id="profile-photo-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
          </div>
          <div>
            <h2 className="profile-name">{user.fullname}</h2>
            <p className="profile-username">@{user.username}</p>
          </div>
        </div>

        <div className="profile-info-row">
          <ul className="profile-details-list">
            <li><strong>Email:</strong> {user.email || 'N/A'}</li>
            <li><strong>Username:</strong> {user.username || 'N/A'}</li>
            <li><strong>Registered On:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</li>
            <li><strong>Blood Group:</strong> {user.bloodGroup || 'N/A'}</li>
            <li><strong>Location:</strong> {user.address || 'N/A'}</li>
            <li><strong>Phone Number:</strong> {user.phone || 'N/A'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

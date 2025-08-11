import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

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
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="profile-avatar"
          />
          <div>
            <h2 className="profile-name">{user.fullname}</h2>
            <p className="profile-username">@{user.username}</p>
          </div>
        </div>

        <div className="profile-info-row">
          <div className="detail-item">
            <label>Phone Number</label>
            <p>{user.phone}</p>
          </div>
          <div className="detail-item">
            <label>Address</label>
            <p>{user.address}</p>
          </div>
        </div>
      </div>

      <div className="donations-card">
        <h3 className="donations-title">Recent Donations</h3>
        <ul className="donation-list">
          <li>🩸 Donated A+ blood at Red Cross Center - May 12, 2025</li>
          <li>🩸 Donated B+ blood at City Hospital - May 4, 2025</li>
          <li>🩸 Donated O- blood at Community Camp - Aug 20, 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

import axios from 'axios';
import React from 'react';
import ProfilePage from './ProfilePage';

export default async function Profile() {
  let appliedData = [];

  try {
    const res = await axios.get(`http://localhost:3000/api/applied`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    appliedData = res.data;
  } catch (error) {
    console.error('Error fetching applied colleges:', error.message);
  }

  const profileData = appliedData[0] || {}; // Safe fallback

  return (
    <div>
      <ProfilePage profileData={profileData} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const Profile = ({ userEmail, setUserEmail, setIsAdmin }) => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/user-profile');
        const data = await response.json();
        setProfileData(data);
        setFormData({
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
          country: data.country
        });
      } catch (error) {
        console.error('Failed to fetch profile data');
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    setUserEmail('');
    setIsAdmin(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/update-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsEditing(false);
        // Optionally refresh profile data
        const updatedResponse = await fetch('/user-profile');
        const updatedData = await updatedResponse.json();
        setProfileData(updatedData);
      }
    } catch (error) {
      console.error('Failed to update address');
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      
      {!isEditing ? (
        <div>
          <p>{profileData.business_name}</p>
          <p>{profileData.contact_number}</p>
          <p>{profileData.email}</p>
          <p>{profileData.address1}</p>
          <p>{profileData.city}, {profileData.state} {profileData.postal_code}</p>
          <p>{profileData.country}</p>
          
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <form onSubmit={handleSaveAddress}>
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={formData.address1}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={formData.address2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
          
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
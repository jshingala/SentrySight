import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file

function Profile({ userEmail, setUserEmail, setIsAdmin }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: userEmail,
        business_name: '',
        contact_number: '',
        share: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        edit_address: false
    });

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchUserData = fetch(`http://localhost:3306/user-profile?email=${userEmail}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch user data");
                return response.json();
            })
            .catch(error => console.error("Error fetching user data:", error));
    
        const fetchCountries = fetch("https://restcountries.com/v3.1/all")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch countries");
                return response.json();
            })
            .then(data => data.map(country => country.name.common).sort())
            .catch(error => console.error("Error fetching countries:", error));
    
        Promise.all([fetchUserData, fetchCountries])
            .then(([userData, countries]) => {
                console.log('Fetched user data:', userData);  // Add this log
                if (userData) {
                    setUserData(prevData => ({
                        ...prevData,
                        ...userData
                    }));
                }
                setCountries(countries || []);
            });
    }, [userEmail]);    
    
    const handleLogout = () => {
        // Clear the userEmail from localStorage and reset the state
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        setUserEmail(''); // Reset the userEmail state to ''
        setIsAdmin(false);
        
        navigate('/');
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const { address1, address2, city, state, postal_code } = userData;
    
        if (!address1 || !city || !state || !postal_code || !selectedCountry) {
            alert("Please fill out all required fields!");
            return;
        }
    
        fetch('http://localhost:3306/update-address', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                address1,
                address2,
                city,
                state,
                postal_code,
                country: selectedCountry
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    // Fetch updated user data to reflect the changes
                    fetch(`http://localhost:3306/user-profile?email=${userEmail}`)
                        .then(response => response.json())
                        .then(updatedData => {
                            setUserData(prevData => ({
                                ...prevData,
                                ...updatedData,
                                edit_address: false
                            }));
                        });
                } else {
                    alert('Failed to update address');
                }
            })
            .catch(error => console.error("Error updating address:", error));
    };     

    return (
        <section className="profile">
            <h2 className="profile-title">Profile</h2>
            
            <div>
            {!userData.edit_address && (
         <>
             <div className="info-grid">
                <label className="bold-label">Business Name:</label>
                <span>{userData.business_name}</span>

                <label className="bold-label">Phone:</label>
                <span>{userData.contact_number}</span>

                <label>Email:</label>
                <span>{userData.email}</span>

                <label className="bold-label">Address 1:</label>
                <span>{userData.address1}</span>

                <label className="bold-label">Address 2:</label>
                <span>{userData.address2}</span>

                <label>City:</label>
                <span>{userData.city}</span>

                <label>State:</label>
                <span>{userData.state}</span>

                <label>Postal Code:</label>
                <span>{userData.postal_code}</span>

                <label>Country:</label>
                <span>{userData.country}</span>
                </div>
            <button
                type="button"
                className="edit-button"
                onClick={() => {
                setUserData((prevData) => ({
                    ...prevData,
                    edit_address: true,
                }));
                setSelectedCountry(userData.country || "");
                }}
            >
                Edit
            </button>
            </>
        )}

            {userData.edit_address && (
            <form onSubmit={handleSubmit} className="edit-form-grid">
                <div>
                <label>Address Line 1:</label>
                <input
                    type="text"
                    name="address1"
                    value={userData.address1}
                    onChange={handleChange}
                    required
                    placeholder="Address Line 1"
                />
                </div>
                <div>
                <label>Address Line 2:</label>
                <input
                    type="text"
                    name="address2"
                    value={userData.address2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                />
                </div>
                <div>
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                />
                </div>
                <div>
                <label>State/Province/Region:</label>
                <input
                    type="text"
                    name="state"
                    value={userData.state}
                    onChange={handleChange}
                    required
                    placeholder="State/Province/Region"
                />
                </div>
                <div>
                <label>Postal Code:</label>
                <input
                    type="text"
                    name="postal_code"
                    value={userData.postal_code}
                    onChange={handleChange}
                    required
                    placeholder="Postal Code"
                />
                </div>
                <div>
                <label>Country:</label>
                <select
                    name="country"
                    value={selectedCountry || userData.country}
                    onChange={(e) => {
                    const country = e.target.value;
                    setSelectedCountry(country);
                    setUserData((prevData) => ({ ...prevData, country }));
                    }}
                    required
                >
                    <option value="" disabled>-- Select a Country --</option>
                    <option value="United States">United States</option>
                    <option value="" disabled>-----------------------------------</option>
                    {countries
                    .filter((country) => country !== "United States")
                    .map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
                </div>

                <div className="edit-buttons">
                <button type="submit" className="edit-button">Done</button>
                <button
                    type="button"
                    className="edit-button"
                    onClick={() => {
                    setUserData({ ...userData, edit_address: false });
                    }}
                >
                    Cancel
                </button>
                </div>
            </form>
            )}

            </div>
            <button type="button" onClick={handleLogout} className="logout-button">Sign Out</button>
        </section>
    );
}

export default Profile;
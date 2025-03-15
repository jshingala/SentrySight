import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <section className="container">
            <div className="card" style={{ maxWidth: "800px", margin: "40px auto" }}>
                <h2 className="text-center" style={{ marginBottom: "24px" }}>Profile</h2>
                
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Business Name:</label>
                    <span className="text-light">{userData.business_name}</span>
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Phone:</label>
                    <span className="text-light">{userData.contact_number}</span>
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Email:</label>
                    <span className="text-light">{userData.email}</span>
                </div>
                
                <div style={{ marginBottom: "24px" }}>
                    {!userData.edit_address && (
                        <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
                            <div style={{ marginBottom: "8px" }}><b>Address 1:</b> <span className="text-light">{userData.address1}</span></div>
                            <div style={{ marginBottom: "8px" }}><b>Address 2:</b> <span className="text-light">{userData.address2}</span></div>
                            <div style={{ marginBottom: "8px" }}><b>City:</b> <span className="text-light">{userData.city}</span></div>
                            <div style={{ marginBottom: "8px" }}><b>State:</b> <span className="text-light">{userData.state}</span></div>
                            <div style={{ marginBottom: "8px" }}><b>Postal Code:</b> <span className="text-light">{userData.postal_code}</span></div>
                            <div style={{ marginBottom: "16px" }}><b>Country:</b> <span className="text-light">{userData.country}</span></div>
                            
                            <button
                                type="button"
                                className="btn"
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
                        </div>
                    )}
                    
                    {userData.edit_address && (
                        <form onSubmit={handleSubmit} className="card" style={{ marginTop: "20px", padding: "20px" }}>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>Address Line 1:</b></label>
                                <input
                                    type="text"
                                    name="address1"
                                    value={userData.address1}
                                    onChange={handleChange}
                                    required
                                    placeholder="Address Line 1"
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>Address Line 2:</b></label>
                                <input
                                    type="text"
                                    name="address2"
                                    value={userData.address2}
                                    onChange={handleChange}
                                    placeholder="Address Line 2"
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>City:</b></label>
                                <input
                                    type="text"
                                    name="city"
                                    value={userData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="City"
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>State/Province/Region:</b></label>
                                <input
                                    type="text"
                                    name="state"
                                    value={userData.state}
                                    onChange={handleChange}
                                    required
                                    placeholder="State/Province/Region"
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>Postal Code:</b></label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={userData.postal_code}
                                    onChange={handleChange}
                                    required
                                    placeholder="Postal Code"
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: "24px" }}>
                                <label style={{ display: "block", marginBottom: "4px" }}><b>Country:</b></label>
                                <select
                                    name="country"
                                    value={selectedCountry || userData.country}
                                    onChange={(e) => {
                                        const country = e.target.value;
                                        setSelectedCountry(country);
                                        setUserData((prevData) => ({ ...prevData, country }));
                                    }}
                                    required
                                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #444" }}
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
                            
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button type="submit" className="btn">Done</button>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "#e65100" }}
                                    onClick={() => {
                                        setUserData({
                                            ...userData,
                                            edit_address: false,
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>                
                    )}
                </div>
                
                <div className="text-center">
                    <button type="button" onClick={handleLogout} className="btn" style={{ backgroundColor: "#e65100" }}>
                        Sign Out
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Profile;
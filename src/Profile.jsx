import React from "react";
import { useNavigate } from "react-router-dom";
import './CSS.css'; // Import the CSS file

function Profile({ setUserEmail }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the userEmail from localStorage and reset the state
        localStorage.removeItem('userEmail');
        setUserEmail(''); // Reset the userEmail state to ''
        
        // Optionally navigate to the login page or home page
        navigate('/');
      };

    return (
        <section className="profile">
            <h2 className="profile-title">This is Profile</h2>
            <div>
                This is Profile
            </div>

            <button type="button" onClick={handleLogout}>Logout</button>
        </section>
    );
}

export default Profile;

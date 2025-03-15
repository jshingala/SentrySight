import React, { useEffect, useState } from "react";

const Questionnaire_Client = ({ clientEmail }) => {
  const [clientData, setClientData] = useState({
    business_name: '',
    industry_type: '',
    num_employees: 0,
    dailyVisitors: 0,
    hasDetectionTech: false,
    safetyMeasures: [false, false, false, false],
    currentEffectiveness: 0,
    interestInAI: false,
    priorityLevel: 0,
    responseSpeedImportance: 0,
    comments: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3306/questionnaire_client?email=${clientEmail}`)
      .then(response => response.json())
      .then(data => {
        console.log("Raw API response:", data); // Log raw response
        setClientData(prevData => ({
          ...prevData,
          ...data
        }));
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, [clientEmail]);

  return (
    <section className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "40px auto", padding: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "30px" }}>
          Admin Questionnaire
        </h2>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Client Email</p>
            <h3>{clientEmail}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Business Name</p>
            <h3>{clientData.business_name}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Industry Type</p>
            <h3>{clientData.industry_type}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Number of Employees</p>
            <h3>{clientData.num_employees}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Number of Daily Visitors</p>
            <h3>{clientData.dailyVisitors}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Does this company have firearm detection technology?</p>
            <h3>{clientData.hasDetectionTech ? "Yes" : "No"}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "10px" }}>Safety Measures in Place</p>
            <p style={{ margin: "5px 0" }}>Surveillance cameras: <span className="text-light">{clientData.safetyMeasures[0] ? "Yes" : "No"}</span></p>
            <p style={{ margin: "5px 0" }}>Security guards: <span className="text-light">{clientData.safetyMeasures[1] ? "Yes" : "No"}</span></p>
            <p style={{ margin: "5px 0" }}>Panic buttons: <span className="text-light">{clientData.safetyMeasures[2] ? "Yes" : "No"}</span></p>
            <p style={{ margin: "5px 0" }}>Emergency lockdown procedures: <span className="text-light">{clientData.safetyMeasures[3] ? "Yes" : "No"}</span></p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Current Effectiveness of Safety Measures</p>
            <h3>{clientData.currentEffectiveness}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Interest in AI Firearm Detection Technology</p>
            <h3>{clientData.interestInAI ? "Yes" : "No"}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Priority Level for Firearm Detection</p>
            <h3>{clientData.priorityLevel}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Importance of Police Response Speed</p>
            <h3>{clientData.responseSpeedImportance}</h3>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: "20px", padding: "15px" }}>
          <div className="text-center">
            <p style={{ marginBottom: "5px" }}>Comments</p>
            <p className="text-light">{clientData.comments}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire_Client;
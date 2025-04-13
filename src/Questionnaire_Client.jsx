import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField } from "@mui/material";
import "./Questionnaire.css"; 

const Questionnaire_Client = ({clientEmail}) => {
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
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-container" textAlign="center" >
        <Typography variant="h4" className="title">
          Admin Questionnaire
        </Typography>
        <div className="client_info">
            <div>
                <h3>Client Email</h3>
                {clientEmail}
            </div>
            <div>
                <h3>Business Name</h3>
                {clientData.business_name}
            </div>
            <div>
                <h3>Industry Type</h3>
                {clientData.industry_type}
            </div>
            <div>
                <h3>Number of Employees:</h3> {clientData.num_employees}
            </div>
            <div>
                <h3>Number of Daily Visitors:</h3> {clientData.dailyVisitors}
            </div>
            <div>
                <h3>Does this company has firearm detection technology?</h3> {clientData.hasDetectionTech ? "Yes" : "No"}
            </div>
            <div>
                <h3>Safety Measures in Place</h3>
                <p>Surveillance cameras: {clientData.safetyMeasures[0] ? "Yes" : "No"}</p>
                <p>Security guards: {clientData.safetyMeasures[1] ? "Yes" : "No"}</p>
                <p>Panic buttons: {clientData.safetyMeasures[2] ? "Yes" : "No"}</p>
                <p>Emergency lockdown procedures: {clientData.safetyMeasures[3] ? "Yes" : "No"}</p> 
            </div>
            <div>
                <h3>Current Effectiveness of Safety Measures:</h3> {clientData.currentEffectiveness}
            </div>
            <div>
                <h3>Interest in AI Firearm Detection Technology:</h3> {clientData.interestInAI ? "Yes" : "No"}
            </div>
            <div>
                <h3>Priority Level for Firearm Detection:</h3> {clientData.priorityLevel}
            </div>
            <div>
                <h3>Importance of Police Response Speed:</h3> {clientData.responseSpeedImportance}
            </div>
            <div>
                <h3>Comments:</h3> {clientData.comments}
            </div>
        </div>
      </Box>
    </Container>
  );
};

export default Questionnaire_Client;

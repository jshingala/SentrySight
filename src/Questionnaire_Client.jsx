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
      <Box className="questionnaire-container" textAlign="center">
        <Typography variant="h4" className="title">
          Admin Questionnaire
        </Typography>

        <div>
            Client Email
            <h3>{clientEmail}</h3>
        </div>
        <div>
            Business Name
            <h3>{clientData.business_name}</h3>
        </div>
        <div>
            Industry Type
            <h3>{clientData.industry_type}</h3>
        </div>
        <div>
            Number of Employees: {clientData.num_employees}
        </div>
        <div>
            Number of Daily Visitors: {clientData.dailyVisitors}
        </div>
        <div>
            Does this company has firearm detection technology? {clientData.hasDetectionTech ? "Yes" : "No"}
        </div>
        <div>
            Safety Measures in Place
            <h3>Surveillance cameras: {clientData.safetyMeasures[0] ? "Yes" : "No"}</h3>
            <h3>Security guards: {clientData.safetyMeasures[1] ? "Yes" : "No"}</h3>
            <h3>Panic buttons: {clientData.safetyMeasures[2] ? "Yes" : "No"}</h3>
            <h3>Emergency lockdown procedures: {clientData.safetyMeasures[3] ? "Yes" : "No"}</h3>
        </div>
        <div>
            Current Effectiveness of Safety Measures: {clientData.currentEffectiveness}
        </div>
        <div>
            Interest in AI Firearm Detection Technology: {clientData.interestInAI ? "Yes" : "No"}
        </div>
        <div>
            Priority Level for Firearm Detection: {clientData.priorityLevel}
        </div>
        <div>
            Importance of Police Response Speed: {clientData.responseSpeedImportance}
        </div>
        <div>
            Comments: {clientData.comments}
        </div>
      </Box>
    </Container>
  );
};

export default Questionnaire_Client;

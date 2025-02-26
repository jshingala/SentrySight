import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import "./Questionnaire.css"; 

const Questionnaire_Client = ({clientEmail}) => {
    const [clientData, setClientData] = useState({
            business_name: '',
            industry_type: '',
            num_employees: '',
            dailyVisitors: '',
            hasDetectionTech: '',
            safetyMeasures: [],
            currentEffectiveness: 3,
            interestInAI: '',
            priorityLevel: 3,
            responseSpeedImportance: 3,
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

        <Box mt={3} width="100%">
            <label>
                Client Email: {clientEmail}
            </label>
        </Box>
      </Box>
    </Container>
  );
};

export default Questionnaire_Client;

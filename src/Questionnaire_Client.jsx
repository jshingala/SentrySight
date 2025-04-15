import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Paper, Divider, CircularProgress } from "@mui/material";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3306/questionnaire_client?email=${clientEmail}`)
        .then(response => response.json())
        .then(data => {
            console.log("Raw API response:", data); // Log raw response
            setClientData(prevData => ({
            ...prevData,
            ...data
            }));
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });
    }, [clientEmail]);   

    // Helper function to render ratings as text
    const getRatingText = (value) => {
        if (value <= 2) return `Low (${value}/10)`;
        if (value <= 6) return `Medium (${value}/10)`;
        return `High (${value}/10)`;
    };

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-container-compact" textAlign="center">
        <Typography variant="h4" className="title">
          Client Assessment
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          Detailed information for {clientData.business_name || clientEmail}
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress style={{ color: "#635bff" }} />
          </Box>
        ) : (
          <div className="client_info_compact">
            <div className="client-summary-section">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <div className="info-card">
                    <span className="info-label">Business Name</span>
                    <span className="info-value">{clientData.business_name}</span>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="info-card">
                    <span className="info-label">Email</span>
                    <span className="info-value">{clientEmail}</span>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="info-card">
                    <span className="info-label">Industry</span>
                    <span className="info-value">{clientData.industry_type}</span>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className="client-details-section">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <div className="detail-card">
                    <h3>Business Size</h3>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <span className="detail-label">Employees</span>
                        <span className="detail-value">{clientData.num_employees}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span className="detail-label">Daily Visitors</span>
                        <span className="detail-value">{clientData.dailyVisitors}</span>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <div className="detail-card">
                    <h3>Security Status</h3>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <span className="detail-label">Has Detection</span>
                        <span className="detail-value highlight">{clientData.hasDetectionTech ? "Yes" : "No"}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span className="detail-label">Effectiveness</span>
                        <span className="detail-value">{getRatingText(clientData.currentEffectiveness)}</span>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className="safety-interest-section">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <div className="detail-card">
                    <h3>Safety Measures</h3>
                    <div className="measures-grid">
                      <div className={`measure-item ${clientData.safetyMeasures[0] ? 'active' : 'inactive'}`}>
                        <span>Surveillance</span>
                      </div>
                      <div className={`measure-item ${clientData.safetyMeasures[1] ? 'active' : 'inactive'}`}>
                        <span>Security Guards</span>
                      </div>
                      <div className={`measure-item ${clientData.safetyMeasures[2] ? 'active' : 'inactive'}`}>
                        <span>Panic Buttons</span>
                      </div>
                      <div className={`measure-item ${clientData.safetyMeasures[3] ? 'active' : 'inactive'}`}>
                        <span>Lockdown Proc.</span>
                      </div>
                    </div>
                  </div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <div className="detail-card">
                    <h3>Interest Assessment</h3>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <span className="detail-label">AI Interest</span>
                        <span className="detail-value highlight">{clientData.interestInAI ? "Yes" : "No"}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span className="detail-label">Priority Level</span>
                        <span className="detail-value">{getRatingText(clientData.priorityLevel)}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span className="detail-label">Response Speed</span>
                        <span className="detail-value">{getRatingText(clientData.responseSpeedImportance)}</span>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>

            {clientData.comments && (
              <div className="comments-section">
                <h3>Additional Comments</h3>
                <p className="comments">{clientData.comments}</p>
              </div>
            )}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Questionnaire_Client;


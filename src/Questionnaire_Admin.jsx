import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";
import "./Questionnaire.css"; 

const companies = [
  { name: "Company A", email: "testing@csus.edu" },
  { name: "Company B", email: "testing1@csus.edu" },
  { name: "Company C", email: "testing2@csus.edu" },
];

const Questionnaire_Admin = ({setClientEmail}) => {
  const navigate = useNavigate();

  const handleNavigation = (email) => {
    navigate(`/questionnaire?email=${email}`);
  };

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-container" textAlign="center">
        <Typography variant="h4" className="title">
          Admin Questionnaire
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          Select a company to manage its questionnaire.
        </Typography>

        <Box mt={3} width="100%">
          {companies.map((company, index) => (
            <Button
              key={index}
              variant="contained"
              className="submit-button"
              onClick={() => {
                handleNavigation(company.email);
                setClientEmail(company.email);
              }}
              style={{
                margin: "10px 0",
                width: "100%",
                padding: "15px",
                fontSize: "1.2rem",
                textTransform: "none"
              }}
            >
              {company.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Questionnaire_Admin;

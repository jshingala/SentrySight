import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";
import "./Questionnaire.css";

const Questionnaire_Admin = ({ setClientEmail }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);  // Store fetched companies
  const [page, setPage] = useState(1);  // Track the current page
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3306/companies?page=${page}`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then(data => {
        console.log("Fetched companies:", data);
        setCompanies(Array.isArray(data.companies) ? data.companies : []);
        setTotalCompanies(data.totalCompanies || 0);
      })
      .catch(error => {
        console.error("Error fetching companies:", error);
        setCompanies([]);
        setTotalCompanies(0);
      });
  }, [page]);
  
  const handleNavigation = (email) => {
    setClientEmail(email);
    navigate("/questionnaire_C");  // Update with correct route
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
              onClick={() => handleNavigation(company.email)}
              style={{
                margin: "10px 0",
                width: "100%",
                padding: "15px",
                fontSize: "1.2rem",
                textTransform: "none"
              }}
            >
              {company.business_name} ({company.email})
            </Button>
          ))}
        </Box>

        {/* Pagination Controls */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button 
            variant="contained" 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Typography variant="h6">Page {page}</Typography>
          <Button 
            variant="contained" 
            disabled={page * 10 >= totalCompanies} // Disable if on last page
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Questionnaire_Admin;
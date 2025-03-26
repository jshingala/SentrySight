import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box, Select, MenuItem, TextField } from "@mui/material";
import "./Questionnaire.css";

const Questionnaire_Admin = ({ setClientEmail }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);  // For search results
  const [page, setPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [sortBy, setSortBy] = useState("az");  // Sorting state
  const [searchTerm, setSearchTerm] = useState("");  // Search input state

  useEffect(() => {
    fetch(`http://localhost:3306/companies?page=${page}`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then(data => {
        console.log("Fetched companies:", data);
        const fetchedCompanies = Array.isArray(data.companies) ? data.companies : [];

        // Sort and filter companies on fetch
        const sortedCompanies = sortCompanies(fetchedCompanies, sortBy);
        setCompanies(sortedCompanies);
        filterCompanies(sortedCompanies, searchTerm);  // Apply filtering on fetch
        setTotalCompanies(data.totalCompanies || 0);
      })
      .catch(error => {
        console.error("Error fetching companies:", error);
        setCompanies([]);
        setFilteredCompanies([]);
        setTotalCompanies(0);
      });
  }, [page, sortBy, searchTerm]);

  // Navigation handler
  const handleNavigation = (email) => {
    setClientEmail(email);
    navigate("/questionnaire_C");
  };

  // Sorting function
  const sortCompanies = (companies, criterion) => {
    return [...companies].sort((a, b) => {
      if (criterion === "az") {
        return a.business_name.localeCompare(b.business_name);  // A to Z
      }
      if (criterion === "za") {
        return b.business_name.localeCompare(a.business_name);  // Z to A
      }
      if (criterion === "newest") {
        return new Date(b.submit_date) - new Date(a.submit_date);  // Newest first
      }
      if (criterion === "oldest") {
        return new Date(a.submit_date) - new Date(b.submit_date);  // Oldest first
      }
      return 0;
    });
  };

  // Search filtering function
  const filterCompanies = (companies, term) => {
    if (!term) {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.business_name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-container" textAlign="center">
        <Typography variant="h4" className="title">Admin Questionnaire</Typography>
        <Typography variant="subtitle1" className="subtitle" textAlign="center" mt={5}>
        Select a company to manage its questionnaire.
        </Typography>

        {/* Search and Sorting Controls */}
        <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
          <TextField
            label="Search by Company Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "60%" }}
          />
          
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ minWidth: "180px" }}
          >
            <MenuItem value="az">Sort A to Z</MenuItem>
            <MenuItem value="za">Sort Z to A</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </Box>

        {/* Company List */}
        <Box mt={3} width="100%">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
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
                  textTransform: "none",
                  display: "inline",
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <span className="business-info">
                  {company.business_name} ({company.email})
                </span>
                <div style={{ marginTop: "8px" }}>
                  <p className="submit-date">Submit Date: {new Date(company.submit_date).toLocaleString()}</p>
                </div>
              </Button>
            ))
          ) : (
            <Typography>No companies found</Typography>
          )}
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
            disabled={page * 10 >= totalCompanies}
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

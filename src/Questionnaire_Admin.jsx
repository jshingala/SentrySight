import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box, Select, MenuItem, TextField, CircularProgress } from "@mui/material";
import "./Questionnaire.css";

const Questionnaire_Admin = ({ setClientEmail }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);  // For search results
  const [page, setPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [sortBy, setSortBy] = useState("az");  // Sorting state
  const [searchTerm, setSearchTerm] = useState("");  // Search input state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching companies:", error);
        setCompanies([]);
        setFilteredCompanies([]);
        setTotalCompanies(0);
        setLoading(false);
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

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-container" textAlign="center">
        <Typography variant="h4" className="title">Admin Questionnaire</Typography>
        <Typography variant="subtitle1" className="subtitle">Select a company to manage its questionnaire.</Typography>

        {/* Search and Sorting Controls */}
        <Box className="search-sort-container">
          <TextField
            placeholder="Search by Company Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            style={{ minWidth: "140px" }}
          >
            <MenuItem value="az">Sort A to Z</MenuItem>
            <MenuItem value="za">Sort Z to A</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </Box>

        {/* Company List as Table */}
        {loading ? (
          <Box className="loading-state">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          filteredCompanies.length > 0 ? (
            <table className="companies-table">
              <tbody>
                {filteredCompanies.map((company, index) => (
                  <tr 
                    key={index} 
                    className="company-row"
                    onClick={() => handleNavigation(company.email)}
                  >
                    <td className="company-name-cell">
                      <Typography className="company-name">
                        {company.business_name}
                      </Typography>
                    </td>
                    <td className="company-email-cell">
                      <Typography className="company-email">
                        {company.email}
                      </Typography>
                    </td>
                    <td className="date-cell">
                      <span className="submit-date">
                        {formatDate(company.submit_date)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography className="empty-state">No companies found</Typography>
          )
        )}

        {/* Pagination Controls */}
        <Box className="pagination-controls">
          <Button 
            className="nav-button"
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            variant="contained"
          >
            Previous
          </Button>
          <Typography className="page-indicator">Page {page}</Typography>
          <Button 
            className="nav-button"
            disabled={page * 10 >= totalCompanies}
            onClick={() => setPage(page + 1)}
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Questionnaire_Admin;
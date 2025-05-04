import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Questionnaire.css";

const Questionnaire_Admin = ({ setClientEmail }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [sortBy, setSortBy] = useState("az");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [emailSubject, setEmailSubject] = useState("Follow-up on your Questionnaire Submission");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3306/companies?page=${page}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        const fetchedCompanies = Array.isArray(data.companies) ? data.companies : [];
        const sortedCompanies = sortCompanies(fetchedCompanies, sortBy);
        setCompanies(sortedCompanies);
        filterCompanies(sortedCompanies, searchTerm);
        setTotalCompanies(data.totalCompanies || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setCompanies([]);
        setFilteredCompanies([]);
        setTotalCompanies(0);
        setLoading(false);
      });
  }, [page, sortBy, searchTerm]);

  const handleCompanyClick = (company) => {
    setClientEmail(company.email);
    navigate("/questionnaire_C");
  };

  const handleOpenEmailModal = (company) => {
    setSelectedCompany(company);
    setEmailSubject(`Follow-up on ${company.business_name}`);
    setEmailMessage(`Hello ${company.business_name},\n\nWe would like to discuss your recent questionnaire submission.`);
    setOpenEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
    setSelectedCompany(null);
  };

  const handleSendEmail = () => {
    console.log("Sending email to", selectedCompany?.email);
    console.log("Subject:", emailSubject);
    console.log("Message:", emailMessage);
    handleCloseEmailModal();
  };

  const sortCompanies = (companies, criterion) => {
    return [...companies].sort((a, b) => {
      if (criterion === "az") return a.business_name.localeCompare(b.business_name);
      if (criterion === "za") return b.business_name.localeCompare(a.business_name);
      if (criterion === "newest") return new Date(b.submit_date) - new Date(a.submit_date);
      if (criterion === "oldest") return new Date(a.submit_date) - new Date(b.submit_date);
      return 0;
    });
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container maxWidth={false} disableGutters className="Questionnaire">
      <Box className="questionnaire-container" textAlign="center">
        <Typography variant="h4" className="title">
          Admin Questionnaire
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          Select a company to manage its questionnaire.
        </Typography>

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
        ) : filteredCompanies.length > 0 ? (
          <table className="companies-table">
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={index} className="company-row">
                  <td
                    className="company-name-cell"
                    onClick={() => handleCompanyClick(company)}
                  >
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
                  <td>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenEmailModal(company)}
                    >
                      Email
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography className="empty-state">No companies found</Typography>
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

      {/* Email Modal */}
      <Dialog
        open={openEmailModal}
        onClose={handleCloseEmailModal}
        sx={{ "& .MuiDialog-paper": { borderRadius: "10px" } }}
      >
        <DialogTitle sx={{ color: "black" }}>
          Send Email to {selectedCompany?.business_name}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={6}
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleCloseEmailModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Questionnaire_Admin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire_Admin = ({ setClientEmail }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]); // Store fetched companies
  const [page, setPage] = useState(1); // Track the current page
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
    navigate("/questionnaire_C"); // Update with correct route
  };

  return (
    <section className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "40px auto", padding: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "20px" }}>
          Admin Questionnaire
        </h2>
        <p className="text-center text-light" style={{ marginBottom: "30px" }}>
          Select a company to manage its questionnaire.
        </p>
        
        <div style={{ marginTop: "30px", width: "100%" }}>
          {companies.map((company, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => handleNavigation(company.email)}
              style={{
                margin: "10px 0",
                width: "100%",
                padding: "15px",
                fontSize: "1.2rem",
                display: "block"
              }}
            >
              {company.business_name} ({company.email})
            </button>
          ))}
        </div>
        
        {/* Pagination Controls */}
        <div style={{ 
          marginTop: "30px", 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center" 
        }}>
          <button
            className="btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            style={{ 
              opacity: page === 1 ? 0.5 : 1,
              cursor: page === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <p style={{ margin: "0", fontSize: "1.1rem" }}>Page {page}</p>
          
          <button
            className="btn"
            disabled={page * 10 >= totalCompanies} // Disable if on last page
            onClick={() => setPage(page + 1)}
            style={{ 
              opacity: page * 10 >= totalCompanies ? 0.5 : 1,
              cursor: page * 10 >= totalCompanies ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire_Admin;
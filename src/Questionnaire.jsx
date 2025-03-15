import { Form, Formik } from 'formik';
import React, { useEffect, useState } from "react";
import * as yup from 'yup';

const validationSchema = yup.object({
  businessName: yup.string().required('Business name is required'),
  industryType: yup.string().required('Industry type is required'),
  numEmployees: yup.number().required('Number of employees is required'),
  dailyVisitors: yup.number().required('Daily visitors is required'),
  hasDetectionTech: yup.string().required('Selection is required'),
  safetyMeasures: yup.array().min(1, 'Select at least one safety measure'),
});

const Questionnaire = ({userEmail}) => {
  const [values, setValues] = useState ({
    businessName: '',
    industryType: '',
    numEmployees: '',
    dailyVisitors: '',
    hasDetectionTech: '',
    safetyMeasures: [],
    currentEffectiveness: 3,
    interestInAI: '',
    priorityLevel: 3,
    responseSpeedImportance: 3,
    concerns: ''
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!userEmail) {
      alert("Please login to submit your questionnaire");
      return;
    }

    console.log('Submitting form with values:', values);
    
    fetch('http://localhost:3306/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        businessName: values.businessName,
        industryType: values.industryType,
        numEmployees: values.numEmployees,
        dailyVisitors: values.dailyVisitors,
        hasDetectionTech: values.hasDetectionTech,
        safetyMeasures: values.safetyMeasures,
        currentEffectiveness: values.currentEffectiveness,
        interestInAI: values.interestInAI,
        priorityLevel: values.priorityLevel,
        responseSpeedImportance: values.responseSpeedImportance,
        concerns: values.concerns
      })
    })      
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
            // If there's an error, display it to the user
            this.setState({ errorMessage: data.error });
          } else {
            alert("Submitted Successfully");
            window.location.href = "/questionnaire";
            this.setState({ successMessage: "Submitted successfully!", errorMessage: '' });
          }
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ errorMessage: error.message });
      });
  };

  // Prevent scroll wheel from changing number inputs
  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type="number"]');

    const handleWheel = (event) => {
      if (document.activeElement === event.target) {
        event.preventDefault();
      }
    };

    numberInputs.forEach((input) => {
      input.addEventListener('wheel', handleWheel);
    });

    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', handleWheel);
      });
    };
  }, []);

  return (
    <section className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "40px auto", padding: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "20px" }}>
          Firearm Detection Safety Assessment
        </h2>
        <p className="text-center text-light" style={{ marginBottom: "30px" }}>
          This survey assesses your current safety measures and explores the benefits of AI firearm detection technology.
        </p>

        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form>
              <h3 style={{ marginBottom: "16px" }}>Business Information</h3>

              {/* Business Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Business Name*
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: touched.businessName && errors.businessName ? "1px solid red" : "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                />
                {touched.businessName && errors.businessName && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.businessName}</p>
                )}
              </div>

              {/* Industry Type */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Industry Type*
                </label>
                <input
                  type="text"
                  name="industryType"
                  value={values.industryType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: touched.industryType && errors.industryType ? "1px solid red" : "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                />
                {touched.industryType && errors.industryType && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.industryType}</p>
                )}
              </div>

              {/* Number of Employees */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Number of Employees*
                </label>
                <input
                  type="number"
                  name="numEmployees"
                  value={values.numEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: touched.numEmployees && errors.numEmployees ? "1px solid red" : "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                />
                {touched.numEmployees && errors.numEmployees && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.numEmployees}</p>
                )}
              </div>

              {/* Daily Visitors */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Daily Visitors*
                </label>
                <input
                  type="number"
                  name="dailyVisitors"
                  value={values.dailyVisitors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: touched.dailyVisitors && errors.dailyVisitors ? "1px solid red" : "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                />
                {touched.dailyVisitors && errors.dailyVisitors && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.dailyVisitors}</p>
                )}
              </div>

              {/* Has Detection Technology */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Do you currently have firearm detection technology?*
                </label>
                <select
                  name="hasDetectionTech"
                  value={values.hasDetectionTech}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: touched.hasDetectionTech && errors.hasDetectionTech ? "1px solid red" : "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {touched.hasDetectionTech && errors.hasDetectionTech && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.hasDetectionTech}</p>
                )}
              </div>

              {/* Safety Measures */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                  Safety Measures in Place*
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    'Surveillance cameras',
                    'Security guards',
                    'Panic buttons',
                    'Emergency lockdown procedures',
                  ].map((measure) => (
                    <div key={measure} style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        id={measure}
                        checked={values.safetyMeasures.includes(measure)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFieldValue('safetyMeasures', [
                              ...values.safetyMeasures,
                              measure,
                            ]);
                          } else {
                            setFieldValue(
                              'safetyMeasures',
                              values.safetyMeasures.filter(
                                (item) => item !== measure
                              )
                            );
                          }
                        }}
                        style={{ marginRight: "10px" }}
                      />
                      <label htmlFor={measure}>{measure}</label>
                    </div>
                  ))}
                </div>
                {touched.safetyMeasures && errors.safetyMeasures && (
                  <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{errors.safetyMeasures}</p>
                )}
              </div>

              {/* Current Effectiveness */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                  Current Effectiveness of Safety Measures: {values.currentEffectiveness}
                </label>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={values.currentEffectiveness}
                  onChange={(e) => setFieldValue('currentEffectiveness', e.target.value)}
                  style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>0 (Not effective)</span>
                  <span>5 (Very effective)</span>
                </div>
              </div>

              {/* Interest in AI */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Interest in AI Firearm Detection Technology
                </label>
                <select
                  name="interestInAI"
                  value={values.interestInAI}
                  onChange={handleChange}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes, definitely</option>
                  <option value="possibly">Possibly, I would like more information</option>
                  <option value="no">No, I am not interested</option>
                </select>
              </div>

              {/* Priority Level */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                  Priority Level for Firearm Detection: {values.priorityLevel}
                </label>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={values.priorityLevel}
                  onChange={(e) => setFieldValue('priorityLevel', e.target.value)}
                  style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>0 (Low priority)</span>
                  <span>5 (High priority)</span>
                </div>
              </div>

              {/* Response Speed Importance */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                  Importance of Police Response Speed: {values.responseSpeedImportance}
                </label>
                <input 
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={values.responseSpeedImportance}
                  onChange={(e) => setFieldValue('responseSpeedImportance', e.target.value)}
                  style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>0 (Not important)</span>
                  <span>5 (Very important)</span>
                </div>
              </div>

              {/* Concerns */}
              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Concerns about AI Detection Technology
                </label>
                <textarea
                  name="concerns"
                  rows="4"
                  value={values.concerns}
                  onChange={handleChange}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "white"
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn"
                style={{ width: "100%", padding: "12px", fontSize: "1.1rem" }}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Questionnaire;
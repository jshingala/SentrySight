import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import './Questionnaire.css';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

// Validation schemas for each step
const validationSchemas = [
  // Step 1 - Business Information
  Yup.object({
    businessName: Yup.string().required('Business name is required'),
    industryType: Yup.string().required('Industry type is required'),
    numEmployees: Yup.number().required('Number of employees is required'),
    dailyVisitors: Yup.number().required('Daily visitors is required'),
  }),
  // Step 2 - Current Safety Measures
  Yup.object({
    hasDetectionTech: Yup.string().required('Selection is required'),
    safetyMeasures: Yup.array().min(1, 'Select at least one safety measure'),
    currentEffectiveness: Yup.number().required('Rating is required'),
  }),
  // Step 3 - AI Firearm Detection Integration
  Yup.object({
    interestInAI: Yup.string().required('Selection is required'),
    priorityLevel: Yup.number().required('Priority level is required'),
    responseSpeedImportance: Yup.number().required('Importance rating is required'),
  }),
];

const Questionnaire = ({ userEmail }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
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
    concerns: '',
    otherSuggestions: '',
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, value) => {
    const { checked } = e.target;
    
    // If "None of the above" is selected, clear other selections
    if (value === 'None of the above') {
      if (checked) {
        setFormData({
          ...formData,
          safetyMeasures: [value],
        });
      } else {
        setFormData({
          ...formData,
          safetyMeasures: [],
        });
      }
      return;
    }
    
    // If any other option is selected, remove "None of the above"
    let updatedMeasures = [...formData.safetyMeasures];
    
    if (checked) {
      updatedMeasures = updatedMeasures.filter(measure => measure !== 'None of the above');
      updatedMeasures.push(value);
    } else {
      updatedMeasures = updatedMeasures.filter(measure => measure !== value);
    }
    
    setFormData({
      ...formData,
      safetyMeasures: updatedMeasures,
    });
  };

  // Handle slider changes
  const handleSliderChange = (name) => (e, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Validate the current step
  const validateStep = async () => {
    try {
      await validationSchemas[activeStep].validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  // Handle next button click
  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await validateStep();
    if (!isValid) return;
    
    if (!userEmail) {
      alert("Please login to submit your questionnaire");
      return;
    }

    try {
      const response = await fetch('http://localhost:3306/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          ...formData
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        alert("Submitted Successfully");
        window.location.href = "/questionnaire";
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
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

  // Form step content
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography variant="h6" className="section-title">
              Business Information
            </Typography>
            
            <Box className="form-field">
              <Typography>1. Business Name:</Typography>
              <TextField
                name="businessName"
                data-testid="businessName"
                value={formData.businessName}
                onChange={handleChange}
                error={!!errors.businessName}
                helperText={errors.businessName}
                fullWidth
              />
            </Box>

            <Box className="form-field">
              <Typography>2. Industry Type (e.g., retail, office, restaurant):</Typography>
              <TextField
                name="industryType"
                data-testid="industryType"
                value={formData.industryType}
                onChange={handleChange}
                error={!!errors.industryType}
                helperText={errors.industryType}
                fullWidth
              />
            </Box>

            <Box className="form-field">
              <Typography>3. Number of employees at this location:</Typography>
              <TextField
                name="numEmployees"
                data-testid="numEmployees"
                type="number"
                value={formData.numEmployees}
                onChange={handleChange}
                error={!!errors.numEmployees}
                helperText={errors.numEmployees}
                fullWidth
              />
            </Box>

            <Box className="form-field">
              <Typography>4. Approx. daily customers or visitors:</Typography>
              <TextField
                name="dailyVisitors"
                data-testid="dailyVisitors"
                type="number"
                value={formData.dailyVisitors}
                onChange={handleChange}
                error={!!errors.dailyVisitors}
                helperText={errors.dailyVisitors}
                fullWidth
              />
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" className="section-title">
              Current Safety Measures
            </Typography>
            
            <Box className="form-field">
              <Typography>5. Do you currently have any firearm detection technology installed?</Typography>
              <RadioGroup
                name="hasDetectionTech"
                data-testid="hasDetectionTech"
                value={formData.hasDetectionTech}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {errors.hasDetectionTech && (
                <Typography color="error">{errors.hasDetectionTech}</Typography>
              )}
            </Box>

            <Box className="form-field">
              <Typography>6. What other safety measures are in place? (Check all that apply)</Typography>
              <Box className="checkbox-group">
                {[
                  'Surveillance cameras',
                  'Security guards',
                  'Panic buttons',
                  'Emergency lockdown procedures',
                  'None of the above'
                ].map((measure) => (
                  <FormControlLabel
                    key={measure}
                    control={
                      <Checkbox
                        checked={formData.safetyMeasures.includes(measure)}
                        onChange={(e) => handleCheckboxChange(e, measure)}
                        data-testid="checkbox-group"
                      />
                    }
                    label={measure}
                  />
                ))}
              </Box>
              {errors.safetyMeasures && (
                <Typography color="error">{errors.safetyMeasures}</Typography>
              )}
            </Box>

            <Box className="form-field">
              <Typography>7. How effective are your current measures in preventing gun violence incidents?</Typography>
              <Box className="slider-container">
                <Typography variant="caption">Not Effective</Typography>
                <Slider
                  name="currentEffectiveness"
                  data-testid="currentEffectiveness"
                  value={formData.currentEffectiveness}
                  onChange={handleSliderChange('currentEffectiveness')}
                  step={1}
                  min={1}
                  max={5}
                  marks
                  valueLabelDisplay="on"
                />
                <Typography variant="caption">Very Effective</Typography>
              </Box>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" className="section-title">
              AI Firearm Detection Integration
            </Typography>
            
            <Box className="form-field">
              <Typography>8. Interested in AI firearm detection with instant law enforcement alerts?</Typography>
              <RadioGroup
                name="interestInAI"
                data-testid="interestInAI"
                value={formData.interestInAI}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes, definitely" />
                <FormControlLabel value="possibly" control={<Radio />} label="Possibly, need more info" />
                <FormControlLabel value="no" control={<Radio />} label="No, not interested" />
              </RadioGroup>
              {errors.interestInAI && (
                <Typography color="error">{errors.interestInAI}</Typography>
              )}
            </Box>

            <Box className="form-field">
              <Typography>9. Priority for improving firearm detection:</Typography>
              <Box className="slider-container">
                <Typography variant="caption">Low Priority</Typography>
                <Slider
                  name="priorityLevel"
                  data-testid="priorityLevel"
                  value={formData.priorityLevel}
                  onChange={handleSliderChange('priorityLevel')}
                  step={1}
                  min={1}
                  max={5}
                  marks
                  valueLabelDisplay="on"
                />
                <Typography variant="caption">High Priority</Typography>
              </Box>
            </Box>

            <Box className="form-field">
              <Typography>10. Importance of police response speed:</Typography>
              <Box className="slider-container">
                <Typography variant="caption">Not Important</Typography>
                <Slider
                  name="responseSpeedImportance"
                  data-testid="responseSpeedImportance"
                  value={formData.responseSpeedImportance}
                  onChange={handleSliderChange('responseSpeedImportance')}
                  step={1}
                  min={1}
                  max={5}
                  marks
                  valueLabelDisplay="on"
                />
                <Typography variant="caption">Extremely Important</Typography>
              </Box>
            </Box>

            <Box className="form-field">
              <Typography>11. Concerns about integrating AI firearm detection?</Typography>
              <TextField
                name="concerns"
                data-testid="concerns"
                multiline
                rows={4}
                value={formData.concerns}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box className="form-field">
              <Typography>12. Other thoughts or suggestions on safety improvements?</Typography>
              <TextField
                name="otherSuggestions"
                data-testid="otherSuggestions"
                multiline
                rows={4}
                value={formData.otherSuggestions}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box className="questionnaire-content">
        <Typography variant="h4" className="title">
          Security Enhancement Questionnaire
        </Typography>
        <Typography variant="body1" className="subtitle">
          Help us understand your needs to provide the best security solution.
        </Typography>

        
  {/* Smoother progress bar implementation */}
  <Box sx={{ 
    width: '100%', 
    backgroundColor: 'rgba(124, 100, 222, 0.2)',
    borderRadius: '18px',
    marginBottom: '40px',
    position: 'relative',
    height: '36px',
    overflow: 'hidden' // Added to ensure the animated content stays within borders
  }}>
    <Box sx={{
      position: 'absolute',
      width: `${(activeStep + 1) * 33.33}%`,
      height: '100%',
      background: 'linear-gradient(90deg,rgb(61, 61, 186) 0%,rgb(73, 48, 199) 100%)',
      borderRadius: '18px',
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' // Smoother transition
    }} />
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '500',
      fontSize: '0.9rem',
      zIndex: 2 // Ensure text stays on top
    }}>
      Step {activeStep + 1} of 3
    </Box>
  </Box>
        <form onSubmit={handleSubmit}>
          <Box className="step-content">
            {getStepContent()}
          </Box>

          <Box className="buttons-container">
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handlePrevious}
              className="prev-button"
            >
              Previous
            </Button>
            
            {activeStep === 2 ? (
              <Button
                variant="contained"
                type="submit"
                className="submit-button"
              >
                Submit Questionnaire
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                className="next-button"
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Questionnaire;
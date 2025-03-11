import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './Questionnaire.css'; // Import the CSS file
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

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

  //Guarantees special characters will be escaped
  const escape = (str) => {
    if (!str) return str;

    if (typeof str !== 'string'){
      str = str.toString()
    }

    return str
    .replace(/\\/g, '\\textbackslash') 
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\~{}')
    .replace(/\^/g, '\\textasciicircum');
};


//Sanitizes business_name -> file_name to resolve .tex filename errors
const sanitize = (str) => {
  if (!str) return str;

   str = str
    .replace(/\\/g, '') 
    .replace(/&/g, '')
    .replace(/%/g, '')
    .replace(/\$/g, '')
    .replace(/@/, '')
    .replace(/#/g, '')
    .replace(/_/g, '')
    .replace(/{/g, '')
    .replace(/}/g, '')
    .replace(/~/g, '')
    .replace(/\^/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_'); //trim excess underscores

    return str;
}



  //Generates latex document
  const latexContent = `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\begin{document}

  \\section*{Firearm Detection Safety Assessment}

  \\textbf{Business Name:} ${escape(values.businessName)} \\\\
  \\textbf{Industry Type:} ${escape(values.industryType)} \\\\
  \\textbf{Number of Employees:} ${escape(values.numEmployees)} \\\\
  \\textbf{Daily Visitors:} ${escape(values.dailyVisitors)} \\\\
  \\textbf{Has Detection Technology:} ${escape(values.hasDetectionTech)} \\\\
  \\textbf{Safety Measures:} ${escape(values.safetyMeasures.join(', '))} \\\\
  \\textbf{Current Effectiveness:} ${escape(values.currentEffectiveness)} \\\\
  \\textbf{Interest in AI:} ${escape(values.interestInAI)} \\\\
  \\textbf{Priority Level for Firearm Detection:} ${escape(values.priorityLevel)} \\\\
  \\textbf{Importance of Police Response Speed:} ${escape(values.responseSpeedImportance)} \\\\
  \\textbf{Concerns:} ${escape(values.concerns)} \\\\

  \\end{document}
  `;

    // const doc = new jsPDF();

    // doc.setFontSize(16);
    // doc.text('Firearm Detection Safety Assessment', 20, 20);

    // doc.setFontSize(12);
    // doc.text(`Business Name: ${values.businessName}`, 20, 40);
    // doc.text(`Industry Type: ${values.industryType}`, 20, 50);
    // doc.text(`Number of Employees: ${values.numEmployees}`, 20, 60);
    // doc.text(`Daily Visitors: ${values.dailyVisitors}`, 20, 70);
    // doc.text(`Has Detection Technology: ${values.hasDetectionTech}`, 20, 80);
    // doc.text(`Safety Measures: ${values.safetyMeasures.join(', ')}`, 20, 90);
    // doc.text(`Current Effectiveness: ${values.currentEffectiveness}`, 20, 100);
    // doc.text(`Interest in AI: ${values.interestInAI}`, 20, 110);
    // doc.text(`Priority Level for Firearm Detection:  ${values.priorityLevel}, 20, 100`)
    // doc.text(`Importance of Police Response Speed:  ${values.responseSpeedImportance}, 20, 100`)
    // doc.text(`Concerns: ${values.concerns}`, 20, 120);

    // doc.save('questionnaire_submission.pdf');



    //Donwloads latex document for testing
    const blob = new Blob([latexContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitize(values.businessName)}_questionnaire_submission.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    fetch('http://localhost:3306/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        latex: latexContent,
        formValues: values
      })
    })      
      .then(response => {
        //console.log(response);
        return response.json()
      })
      .then(data => {
        if (data.error) {
            // If there's an error, display it to the user
            this.setState({ errorMessage: data.error });
          }else {
            alert("Submitted Successfully");
            window.location.href = "/questionnaire";
            this.setState({ successMessage: "Submitted successfully!", errorMessage: '' });
          }
      })
      .catch(error => {
        console.error('Error:', error);

        this.setState({ errorMessage: error.message });   //display the UNIQUE key error to the user
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
  }, []); // Runs only once after the component mounts
  


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
  }, []); // Runs only once after the component mounts

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box mt={5} p={4}>
        <Typography variant="h4" gutterBottom className="title">
          Firearm Detection Safety Assessment
        </Typography>
        <Typography variant="body1" className="subtitle" mb={4}>
          This survey assesses your current safety measures and explores the benefits of AI firearm detection technology.
        </Typography>

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
              <Typography variant="h6" className="title" mb={2}>
                Business Information
              </Typography>

              {/* Business Name */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Business Name"
                  name="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.businessName && Boolean(errors.businessName)}
                  helperText={touched.businessName && errors.businessName}
                  fullWidth
                />
              </FormControl>

              {/* Industry Type */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Industry Type"
                  name="industryType"
                  value={values.industryType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.industryType && Boolean(errors.industryType)}
                  helperText={touched.industryType && errors.industryType}
                  fullWidth
                />
              </FormControl>

              {/* Number of Employees */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Number of Employees"
                  name="numEmployees"
                  type="number"
                  value={values.numEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.numEmployees && Boolean(errors.numEmployees)}
                  helperText={touched.numEmployees && errors.numEmployees}
                  fullWidth
                />
              </FormControl>

              {/* Daily Visitors */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Daily Visitors"
                  name="dailyVisitors"
                  type="number"
                  value={values.dailyVisitors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.dailyVisitors && Boolean(errors.dailyVisitors)
                  }
                  helperText={touched.dailyVisitors && errors.dailyVisitors}
                  fullWidth
                />
              </FormControl>

              {/* Has Detection Technology */}
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Do you currently have firearm detection technology?"
                  name="hasDetectionTech"
                  value={values.hasDetectionTech}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.hasDetectionTech &&
                    Boolean(errors.hasDetectionTech)
                  }
                  helperText={
                    touched.hasDetectionTech && errors.hasDetectionTech
                  }
                  fullWidth
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </FormControl>

              {/* Safety Measures */}
              <FormControl fullWidth margin="normal">
                <FormLabel>Safety Measures in Place</FormLabel>
                <Box display="flex" flexDirection="column">
                  {[
                    'Surveillance cameras',
                    'Security guards',
                    'Panic buttons',
                    'Emergency lockdown procedures',
                  ].map((measure) => (
                    <FormControlLabel
                      key={measure}
                      control={
                        <Checkbox
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
                        />
                      }
                      label={measure}
                    />
                  ))}
                </Box>
              </FormControl>

              {/* Current Effectiveness */}
              <FormControl fullWidth margin="normal">
                <FormLabel>Current Effectiveness of Safety Measures</FormLabel>
                <Slider
                  name="currentEffectiveness"
                  value={values.currentEffectiveness}
                  onChange={(e, newValue) => setFieldValue('currentEffectiveness', newValue)} // Smooth state update
                  step={0.1} 
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

              {/* Interest in AI */}
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Interest in AI Firearm Detection Technology"
                  name="interestInAI"
                  value={values.interestInAI}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="yes">Yes, definitely</MenuItem>
                  <MenuItem value="possibly">
                    Possibly, I would like more information
                  </MenuItem>
                  <MenuItem value="no">No, I am not interested</MenuItem>
                </TextField>
              </FormControl>

              {/* Priority Level */}
              <FormControl fullWidth margin="normal">
                <FormLabel>Priority Level for Firearm Detection</FormLabel>
                <Slider
                  name="priorityLevel"
                  value={values.priorityLevel}
                  onChange={(e, newValue) => setFieldValue('priorityLevel', newValue)} // Smooth state update
                  step={0.1} 
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

              {/* Response Speed Importance */}
              <FormControl fullWidth margin="normal">
                <FormLabel>Importance of Police Response Speed</FormLabel>
                <Slider
                  name="responseSpeedImportance"
                  value={values.responseSpeedImportance}
                  onChange={(e, newValue) => setFieldValue('responseSpeedImportance', newValue)} // Smooth state update
                  step={0.1} 
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

              {/* Concerns */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Concerns about AI Detection Technology"
                  name="concerns"
                  multiline
                  rows={4}
                  value={values.concerns}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                className="submit-button"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Questionnaire;

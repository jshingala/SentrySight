import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
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

import './Questionnaire.css'

const validationSchema = yup.object({
  businessName: yup.string().required('Business name is required'),
  industryType: yup.string().required('Industry type is required'),
  numEmployees: yup.number().required('Number of employees is required'),
  dailyVisitors: yup.number().required('Daily visitors is required'),
  hasDetectionTech: yup.string().required('Selection is required'),
  safetyMeasures: yup.array().min(1, 'Select at least one safety measure'),
});

const initialValues = {
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
  additionalThoughts: '',
};

const Questionnaire = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} p={4} bgcolor="grey.900" borderRadius={2} color="white">
        <Typography variant="h4" align="center" gutterBottom color="purple">
          Firearm Detection Safety Assessment
        </Typography>
        <Typography variant="body1" align="center" color="grey.400" mb={4}>
          This survey assesses your current safety measures and explores the benefits of AI firearm detection technology.
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
            <Form>
              <Typography variant="h6" color="purple" mb={2}>
                Business Information
              </Typography>

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

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Daily Visitors"
                  name="dailyVisitors"
                  type="number"
                  value={values.dailyVisitors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dailyVisitors && Boolean(errors.dailyVisitors)}
                  helperText={touched.dailyVisitors && errors.dailyVisitors}
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Do you currently have firearm detection technology?"
                  name="hasDetectionTech"
                  value={values.hasDetectionTech}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.hasDetectionTech && Boolean(errors.hasDetectionTech)}
                  helperText={touched.hasDetectionTech && errors.hasDetectionTech}
                  fullWidth
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Safety Measures in Place</FormLabel>
                <Box display="flex" flexDirection="column">
                  {['Surveillance cameras', 'Security guards', 'Panic buttons', 'Emergency lockdown procedures'].map((measure) => (
                    <FormControlLabel
                      key={measure}
                      control={<Checkbox />}
                      label={measure}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue('safetyMeasures', [...values.safetyMeasures, measure]);
                        } else {
                          setFieldValue('safetyMeasures', values.safetyMeasures.filter((item) => item !== measure));
                        }
                      }}
                    />
                  ))}
                </Box>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Current Effectiveness of Safety Measures</FormLabel>
                <Slider
                  name="currentEffectiveness"
                  value={values.currentEffectiveness}
                  onChange={(e, newValue) => setFieldValue('currentEffectiveness', newValue)}
                  step={1}
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

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
                  <MenuItem value="possibly">Possibly, I would like more information</MenuItem>
                  <MenuItem value="no">No, I am not interested</MenuItem>
                </TextField>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Priority Level for Firearm Detection</FormLabel>
                <Slider
                  name="priorityLevel"
                  value={values.priorityLevel}
                  onChange={(e, newValue) => setFieldValue('priorityLevel', newValue)}
                  step={1}
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Importance of Police Response Speed</FormLabel>
                <Slider
                  name="responseSpeedImportance"
                  value={values.responseSpeedImportance}
                  onChange={(e, newValue) => setFieldValue('responseSpeedImportance', newValue)}
                  step={1}
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </FormControl>

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

              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
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

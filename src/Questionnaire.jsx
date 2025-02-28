import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "./Questionnaire.css"; // Import the CSS file
import { useTranslation } from "./context/TranslationContext"; // Import translation hook
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
} from "@mui/material";

const validationSchema = yup.object({
  businessName: yup.string().required("Business name is required"),
  industryType: yup.string().required("Industry type is required"),
  numEmployees: yup.number().required("Number of employees is required"),
  dailyVisitors: yup.number().required("Daily visitors is required"),
  hasDetectionTech: yup.string().required("Selection is required"),
  safetyMeasures: yup.array().min(1, "Select at least one safety measure"),
});

const Questionnaire = ({ userEmail }) => {
  const [values, setValues] = useState({
    businessName: "",
    industryType: "",
    numEmployees: "",
    dailyVisitors: "",
    hasDetectionTech: "",
    safetyMeasures: [],
    currentEffectiveness: 3,
    interestInAI: "",
    priorityLevel: 3,
    responseSpeedImportance: 3,
    concerns: "",
  });

  const { translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    async function updateTranslations() {
      const texts = {
        title: "Firearm Detection Safety Assessment",
        subtitle: "This survey assesses your current safety measures and explores the benefits of AI firearm detection technology.",
        businessInfo: "Business Information",
        businessName: "Business Name",
        industryType: "Industry Type",
        numEmployees: "Number of Employees",
        dailyVisitors: "Daily Visitors",
        detectionTech: "Do you currently have firearm detection technology?",
        safetyMeasures: "Safety Measures in Place",
        effectiveness: "Current Effectiveness of Safety Measures",
        interestAI: "Interest in AI Firearm Detection Technology",
        priority: "Priority Level for Firearm Detection",
        responseSpeed: "Importance of Police Response Speed",
        concerns: "Concerns about AI Detection Technology",
        submit: "Submit",
      };

      const translated = {};
      for (const key in texts) {
        translated[key] = await translateText(texts[key], language);
      }
      setTranslatedText(translated);
    }

    updateTranslations();
  }, [language, translateText]);

  return (
    <Container maxWidth="md" className="Questionnaire">
      <Box mt={5} p={4}>
        <Typography variant="h4" gutterBottom className="title">
          {translatedText.title || "Firearm Detection Safety Assessment"}
        </Typography>
        <Typography variant="body1" className="subtitle" mb={4}>
          {translatedText.subtitle || "This survey assesses your current safety measures and explores the benefits of AI firearm detection technology."}
        </Typography>

        <Formik initialValues={values} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
          {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
            <Form>
              <Typography variant="h6" className="title" mb={2}>
                {translatedText.businessInfo || "Business Information"}
              </Typography>

              {/* Business Name */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label={translatedText.businessName || "Business Name"}
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
                  label={translatedText.industryType || "Industry Type"}
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
                  label={translatedText.numEmployees || "Number of Employees"}
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
                  label={translatedText.dailyVisitors || "Daily Visitors"}
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

              {/* Has Detection Technology */}
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label={translatedText.detectionTech || "Do you currently have firearm detection technology?"}
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

              {/* Safety Measures */}
              <FormControl fullWidth margin="normal">
                <FormLabel>{translatedText.safetyMeasures || "Safety Measures in Place"}</FormLabel>
                <Box display="flex" flexDirection="column">
                  {["Surveillance cameras", "Security guards", "Panic buttons", "Emergency lockdown procedures"].map((measure) => (
                    <FormControlLabel
                      key={measure}
                      control={
                        <Checkbox
                          checked={values.safetyMeasures.includes(measure)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue("safetyMeasures", [...values.safetyMeasures, measure]);
                            } else {
                              setFieldValue("safetyMeasures", values.safetyMeasures.filter((item) => item !== measure));
                            }
                          }}
                        />
                      }
                      label={measure}
                    />
                  ))}
                </Box>
              </FormControl>

              {/* Concerns */}
              <FormControl fullWidth margin="normal">
                <TextField
                  label={translatedText.concerns || "Concerns about AI Detection Technology"}
                  name="concerns"
                  multiline
                  rows={4}
                  value={values.concerns}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" variant="contained" size="large" fullWidth className="submit-button">
                {translatedText.submit || "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Questionnaire;

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { address } = require('framer-motion/client');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "db-test.cj42emkqsiy5.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "admin2024!",
  database: "Business_Prod",
  port: 3306
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.get('/questionnaire_client', (req, res) => {
  const email = req.query.email;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const userQuery = "SELECT business_id, business_name FROM Business WHERE email = ?";
  con.query(userQuery, [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });

      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      const q_Query = `SELECT * FROM Questionnaire WHERE business_id = ?`;

      con.query(q_Query, [user.business_id], (err, q_results) => {
          if (err) return res.status(500).json({ error: 'Database query error' });

          const questionnaire = q_results[0] || {};
          res.json({
              businessName: user.businessName | '',
              industryType: questionnaire.industry_type | '',
              numEmployees: questionnaire.num_employees | '',
              dailyVisitors: questionnaire.num_visitors | '',
              hasDetectionTech: questionnaire.en_detection | '',
              safetyMeasures: [questionnaire.safety_0, questionnaire.safety_1, 
                questionnaire.safety_2, questionnaire.safety_3] | [],
              currentEffectiveness: questionnaire.effectiveness | 3,
              interestInAI: questionnaire.interest | '',
              priorityLevel: questionnaire.priority | 3,
              responseSpeedImportance: questionnaire.police_speed | 3,
              concerns: questionnaire.comments | ''
          });
      });
  });
});

// New endpoint to get user profile information
app.get('/user-profile', (req, res) => {
  const email = req.query.email;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const userQuery = "SELECT business_id, business_name, contact_number FROM Business WHERE email = ?";
  con.query(userQuery, [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });

      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      const addressQuery = `SELECT address1, address2, city, state, postal_code, country FROM Business_address WHERE business_id = ?`;

      con.query(addressQuery, [user.business_id], (err, addressResults) => {
          if (err) return res.status(500).json({ error: 'Database query error' });

          const address = addressResults[0] || {};
          res.json({
              business_name: user.business_name || '',
              contact_number: user.contact_number || '',
              address1: address.address1 || '',
              address2: address.address2 || '',
              city: address.city || '',
              state: address.state || '',
              postal_code: address.postal_code || '',
              country: address.country || ''
          });
      });
  });
});


app.post('/update-address', (req, res) => {
  const { email, address1, address2, city, state, postal_code, country } = req.body;

  if (!email || !address1 || !city || !state || !postal_code || !country) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

    // Get the business_id through the email and then update the data
  const addressQuery = `
    UPDATE Business_address
    SET address1 = ?, address2 = ?, city = ?, state = ?, postal_code = ?, country = ?
    WHERE business_id = (SELECT business_id FROM Business WHERE email=?)`;

  con.query(addressQuery, [address1, address2, city, state, postal_code, country, email], (err, updateResults) => {
    if (err) return res.status(500).json({ error: 'Database update error' });

    // Check if any row was affected
    if (updateResults.affectedRows === 0) {
      return res.status(404).json({ error: 'Address update failed' });
    }

    // Success response
    res.json({ message: 'Address updated successfully' });
  });
});

// Login system - get the database and see if there is matching email & password
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({ error: 'Please fill out your email or password.' });
  }

  const query = "SELECT email, login_password, isAdmin FROM Business WHERE email = ?";
  con.query(query, [email], (err, results)=>{
    if (err) {
      console.log('Error type:', err.code);
    }

    if (results.length > 0){  //If the email exists
      const checkPassword = results[0].login_password;
      //console.log('Detected login password for the id: ' + checkPassword);

      if (checkPassword === password){
        res.json({ message: 'Login data matches!', results });
      }else{
        res.status(400).json({ error: 'Incorrect password.' })
      }
    }else{
      res.status(404).json({ error: 'Email not found.' });
    }
  })
});

// Putting data into the database
app.post('/sign-up', (req, res) => {
  const { email, password, business_name, contact_number, _share } = req.body;

  if (email && password && business_name && contact_number) {
    // Step 1: Insert data into Business table
    const query = `INSERT INTO Business (email, login_password, business_name, contact_number, _share) 
                   VALUES (?, ?, ?, ?, ?)`;
    con.query(query, [email, password, business_name, contact_number, _share], (err, results) => {
      if (err) {
        console.log('Error type:', err.code);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists!' });
        }
        return res.status(500).json({ error: 'Database error during business insertion' });
      }

      // Step 2: Get the business_id using the email
      const getBusinessIdQuery = `SELECT business_id FROM Business WHERE email = ?`;

      con.query(getBusinessIdQuery, [email], (err, rows) => {
        if (err) {
          console.log('Error fetching business_id:', err.code);
          return res.status(500).json({ error: 'Error fetching business_id' });
        }

        if (rows.length === 0) {
          return res.status(404).json({ error: 'Business not found' });
        }

        const businessId = rows[0].business_id;

        // Step 3: Insert data into Business_address table with NULL values
        const addressQuery = `INSERT INTO Business_address (business_id, address1, address2, city, state, postal_code, country)
                              VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL)`;

        con.query(addressQuery, [businessId], (err, addressResults) => {
          if (err) {
            console.log('Error inserting into Business_address:', err.code);
            return res.status(500).json({ error: 'Error inserting address data' });
          }

          res.json({ message: 'Data inserted successfully', businessResults: results, addressResults });
        });
      });
    });
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

app.post('/questionnaire', (req, res) => {
  const {
    email,
    businessName,
    industryType,
    numEmployees,
    dailyVisitors,
    hasDetectionTech,
    safetyMeasures,
    currentEffectiveness,
    interestInAI,
    priorityLevel,
    responseSpeedImportance,
    concerns
  } = req.body;

  // Get business_id from Business table
  const businessQuery = `SELECT business_id FROM Business WHERE email = ?`;
  con.query(businessQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query error", details: err });
  
    if (results.length === 0) return res.status(404).json({ error: "Business not found" });
  
    const businessId = results[0].business_id;
  
    // Check if the business_id exists in the Questionnaire table
    const countQuery = "SELECT COUNT(*) AS count FROM Questionnaire WHERE business_id = ?";
    con.query(countQuery, [businessId], (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: "Error counting existing data", details: err });
      }
  
      const count = countResult[0].count; // Get actual count value from the result
  
      if (count > 0) {
        // If the business_id exists, update the row
        const questionnaireQuery = `
          UPDATE Questionnaire 
          SET industry_type = ?, num_employees = ?, num_visitors = ?, en_detection = ?, 
              safety_0 = ?, safety_1 = ?, safety_2 = ?, safety_3 = ?, 
              effectiveness = ?, interest = ?, priority = ?, police_speed = ?, comments = ? 
          WHERE business_id = ?`;
  
        con.query(questionnaireQuery, [
          industryType,
          numEmployees,
          dailyVisitors,
          hasDetectionTech === "yes" ? 1 : 0,
          safetyMeasures.includes("Surveillance cameras") ? 1 : 0,
          safetyMeasures.includes("Security guards") ? 1 : 0,
          safetyMeasures.includes("Panic buttons") ? 1 : 0,
          safetyMeasures.includes("Emergency lockdown procedures") ? 1 : 0,
          currentEffectiveness,
          interestInAI === "yes" ? 1 : interestInAI === "possibly" ? 0 : -1,
          priorityLevel,
          responseSpeedImportance,
          concerns || "",
          businessId // This goes at the end for the WHERE clause
        ], (err, result) => {
          if (err) return res.status(500).json({ error: "Error updating questionnaire", details: err });
  
          res.status(200).json({ message: "Questionnaire updated successfully", result });
        });
  
      } else {
        // If the business_id does NOT exist, insert a new row
        const q_business_name = "SELECT business_name FROM Business WHERE business_id = ?";
        con.query(q_business_name, [businessId], (err, nameResult) => {
          if (err) {
            return res.status(500).json({ error: "Error counting existing data", details: err });
          }

          const bN = nameResult[0].business_name;

          const insertQuery = `
          INSERT INTO Questionnaire 
          (business_id, business_name, industry_type, num_employees, num_visitors, en_detection, 
           safety_0, safety_1, safety_2, safety_3, 
           effectiveness, interest, priority, police_speed, comments) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
          con.query(insertQuery, [
            businessId,
            bN,
            industryType,
            numEmployees,
            dailyVisitors,
            hasDetectionTech === "yes" ? 1 : 0,
            safetyMeasures.includes("Surveillance cameras") ? 1 : 0,
            safetyMeasures.includes("Security guards") ? 1 : 0,
            safetyMeasures.includes("Panic buttons") ? 1 : 0,
            safetyMeasures.includes("Emergency lockdown procedures") ? 1 : 0,
            currentEffectiveness,
            interestInAI === "yes" ? 1 : interestInAI === "possibly" ? 0 : -1,
            priorityLevel,
            responseSpeedImportance,
            concerns || ""
          ], (err, result) => {
            if (err) return res.status(500).json({ error: "Error inserting questionnaire", details: err });
    
            res.status(200).json({ message: "Questionnaire submitted successfully", result });
          });
        });
      }
    });
  });  
});

app.listen(3306, () => {
  console.log("Server running on port 3306");
});

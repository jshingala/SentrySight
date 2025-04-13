const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { address } = require('framer-motion/client'); 
require('dotenv').config();

const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

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

const verificationCodes = {}; // Temporary storage for codes (can use Redis for better persistence)

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
      user: "ff523db79546ef",   // Your email
      pass: "8e3d8c262542b1"      // Your email password or app password
  }
});

// Send Verification Code
app.post('/send-verification-code', (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  verificationCodes[email] = code; // Store code temporarily
  console.log(code);

  const mailOptions = {
      from: 'testersentrysight@gmail.com',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to send verification code' });
      }
      res.json({ message: 'Verification code sent successfully!' });
  });
});

// Verify Code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (verificationCodes[email] === code) {
      delete verificationCodes[email];  // Remove verified code from memory
      return res.json({ success: true, message: 'Verification successful!' });
  }
  res.status(400).json({ error: 'Invalid verification code' });
});

app.get('/companies', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  //load in one query
  const dataQuery = `
    SELECT q.business_id, q.submit_date, b.email, b.business_name
    FROM Questionnaire q
    JOIN Business b ON q.business_id = b.business_id
    LIMIT ? OFFSET ?`;

  const countQuery = "SELECT COUNT(*) AS total FROM Questionnaire";

  con.query(countQuery, (err, countResult) => {
    if (err) {
      console.error("Database error (count):", err);
      return res.status(500).json({ error: 'Database query error' });
    }

    const totalCompanies = countResult[0].total;

    con.query(dataQuery, [limit, offset], (err, results) => {
      if (err) {
        console.error("Database error (data):", err);
        return res.status(500).json({ error: 'Database query error' });
      }

      if (results.length === 0) {
        return res.json({ companies: [], totalCompanies });
      }

      // Send companies with submit_date included
      res.json({
        companies: results,
        totalCompanies
      });
    });
  });
});

app.get('/questionnaire_client', (req, res) => {
  const email = req.query.email;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const userQuery = "SELECT business_id, business_name FROM Business WHERE email = ?";
  con.query(userQuery, [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });

      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      const q_Query = "SELECT * FROM Questionnaire WHERE business_id = ?";

      con.query(q_Query, [user.business_id], (err, q_results) => {
          if (err) return res.status(500).json({ error: 'Database query error' });

          const questionnaire = q_results[0] || {};
          res.json({
            business_name: user.business_name || '',
            industry_type: questionnaire.industry_type || '',
            num_employees: questionnaire.num_employees || '',
            dailyVisitors: questionnaire.num_visitors || '',
            hasDetectionTech: questionnaire.en_detection || false,
            safetyMeasures: [questionnaire.safety_0 || false, questionnaire.safety_1 || false, 
              questionnaire.safety_2 || false, questionnaire.safety_3 || false],
            currentEffectiveness: questionnaire.effectiveness || 0,
            interestInAI: questionnaire.interest || false,
            priorityLevel: questionnaire.priority || 0,
            responseSpeedImportance: questionnaire.police_speed || 0,
            comments: questionnaire.comments || ''
          });
      });
  });
});

// New endpoint to get user profile information
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Serve the 'uploads' folder statically so files are publicly accessible
app.use('/uploads', express.static('uploads'));
// Existing endpoints

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

  const addressQuery = `
    UPDATE Business_address
    SET address1 = ?, address2 = ?, city = ?, state = ?, postal_code = ?, country = ?
    WHERE business_id = (SELECT business_id FROM Business WHERE email=?)`;

  con.query(addressQuery, [address1, address2, city, state, postal_code, country, email], (err, updateResults) => {
    if (err) return res.status(500).json({ error: 'Database update error' });

    if (updateResults.affectedRows === 0) {
      return res.status(404).json({ error: 'Address update failed' });
    }

    res.json({ message: 'Address updated successfully' });
  });
});

app.post('/update-password', (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10; // You can adjust this number for more security
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log('Error hashing the password:', err);
      return res.status(500).json({ error: 'Error hashing the password' });
    }

    const updateQuery = `UPDATE Business SET login_password = ? WHERE email = ?`;
  
    con.query(updateQuery, [hashedPassword, email], (err, updateResults) => {
      console.log("Received email:", email);
      console.log("Running query:", updateQuery);
      console.log("With values:", [hashedPassword, password, email]);

      if (err) return res.status(500).json({ error: 'Database update error' });

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ error: 'Password update failed' });
      }

      res.json({ message: 'Password updated successfully' });
    });
  });
});

// Sign-Up Route
app.post('/sign-up', (req, res) => {
  let { email, password, business_name, contact_number, _share } = req.body;

  // Trim inputs to avoid extra spaces
  email = email.trim();
  password = password.trim();

  if (email && password && business_name && contact_number) {
    // Hash the password before inserting
    const saltRounds = 10; // You can adjust this number for more security
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.log('Error hashing the password:', err);
        return res.status(500).json({ error: 'Error hashing the password' });
      }

      // Insert data into Business table with hashed password
      const query = `INSERT INTO Business (email, login_password, business_name, contact_number, _share) 
                     VALUES (?, ?, ?, ?, ?)`;
      con.query(query, [email, hashedPassword, business_name, contact_number, _share], (err, results) => {
        if (err) {
          console.log('Error type:', err.code);
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists!' });
          }
          return res.status(500).json({ error: 'Database error during business insertion' });
        }

        // Get the business_id using the email
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

          // Insert data into Business_address table with NULL values
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
    });
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

// Sign-In Route
app.post('/sign-in', (req, res) => {
  let { email, password } = req.body;

  // Trim inputs to avoid extra spaces
  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill out your email or password.' });
  }

  const query = "SELECT email, login_password, isAdmin FROM Business WHERE email = ?";
  con.query(query, [email], (err, results) => {
    if (err) {
      console.log('Error type:', err.code);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {  // If the email exists
      const storedHashedPassword = results[0].login_password;

      // Compare the entered password with the stored hashed password
      bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
        if (err) {
          console.log('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Error comparing passwords' });
        }

        if (isMatch) {
          res.json({ message: 'Login data matches!', results });
        } else {
          res.status(400).json({ error: 'Incorrect password.' });
        }
      });
    } else {
      res.status(404).json({ error: 'Email not found.' });
    }
  });
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

// New endpoint to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Build a URL to the uploaded file using your EC2 IP and port 3000
  const fileUrl = `http://3.133.147.122:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

app.listen(3306, '0.0.0.0', () => {
  console.log("Server running on port 3306");
});
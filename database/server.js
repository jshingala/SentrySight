import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
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

// Login system - get the database and see if there is matching email & password
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({ error: 'Please fill out your email or password.' });
  }

  const query = "SELECT email, login_password FROM Business WHERE email = ?";
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
  //console.log('Received data:', req.body);    //testing
  const { email, password, business_name, contact_number, address, _share } = req.body;
  
  if (email && password && business_name && contact_number) {
    const query = `INSERT INTO Business (email, login_password, business_name, 
                    contact_number, address, _share) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(query, [email, password, business_name, contact_number, address, _share], (err, results) => {
      if (err) {
        console.log('Error type:', err.code);
        if (err.code === 'ER_DUP_ENTRY') {
          // Handle unique constraint violation (duplicate email)
          return res.status(400).json({ error: 'Email already exists!' });
        }
      }
      res.json({ message: 'Data inserted successfully', results });
    });
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.post('/Questionnaire', (req, res) => {
  console.log('Received questionnaire request');
  
  con.ping((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      return res.status(500).json({ message: "Failed to connect to the database" });
    }
    console.log("Database connection successful");
    res.json({ message: "Successfully connected to the database" });
  });
});


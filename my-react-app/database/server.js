const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
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

// Getting data from the database
app.get('/business', (req, res) => {
  const query = "SELECT * FROM Business";

  con.query(query, (err, results)=>{
    if (err) throw err;

    res.json({ business: results });
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

app.listen(3306, () => {
  console.log("Server running on port 3306");
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const path = require('path');
const locationRoutes = require('./routes/location');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaya@2005',
    database: 'bus_tracking'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});+

// Routes
app.use('/auth', authRoutes);
app.use('/bus', busRoutes);
app.use('/location', locationRoutes);

app.post('/register',(req,res)=>{
    res.send(req.body);
    db.query("Insert Into users Values(,101,'shiva','madhurai',9042799750,'passenger',999999999.666666,999999999.666666)");
})
app.use("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
app.listen(port, () => {
    console.log("Server running on port ${port}");
});

module.exports = db;
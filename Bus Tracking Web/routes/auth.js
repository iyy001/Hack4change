const express = require('express');
const db = require('../server');
const router = express.Router();

router.post('/register', (req, res) => {
    const { name, location, mobile, role } = req.body;
    const sql = 'INSERT INTO users (name, location, mobile, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, location, mobile, role], (err, result) => {
        if (err) throw err;
        res.send('User registered...');
    });
});

router.post('/login', (req, res) => {
    const { mobile } = req.body;
    const sql = 'SELECT * FROM users WHERE mobile = ?';
    db.query(sql, [mobile], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid mobile number');
        }
    });
});

router.post('/logout', (req, res) => {
    // Handle logout logic
    res.send('User logged out');
});

router.post('/delete-account', (req, res) => {
    const { mobile } = req.body;
    const sql = 'DELETE FROM users WHERE mobile = ?';
    db.query(sql, [mobile], (err, result) => {
        if (err) throw err;
        res.send('Account deleted');
    });
});

module.exports = router;
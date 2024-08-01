const express = require('express');
const db = require('../server');
const router = express.Router();

router.post('/update', (req, res) => {
    const { mobile, lat, lng } = req.body;
    const sql = 'UPDATE users SET lat = ?, lng = ? WHERE mobile = ?';
    db.query(sql, [lat, lng, mobile], (err, result) => {
        if (err) throw err;
        res.send('Location updated');
    });
});

router.get('/get-location', (req, res) => {
    const { mobile } = req.query;
    const sql = 'SELECT lat, lng FROM users WHERE mobile = ?';
    db.query(sql, [mobile], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

module.exports = router;
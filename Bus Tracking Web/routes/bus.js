const express = require('express');
const db = require('../server');
const router = express.Router();

router.get('/schedule', (req, res) => {
    const sql = 'SELECT * FROM bus_schedule';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
const express = require('express');
const res = require('express/lib/response');
const { route } = require('.');
const router = express.Router();

const pool = require('../database');

router.get('/add',async(req,res)=>{
    const links = await pool.query('SELECT * FROM usuario ');
    console.log(links);
    res.status(201).json({
        message: links,
    });
});

module.exports = router;
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

router.post('/add', async (req, res) => {
    try {
        const { nombres, apellidos,correo} = req.body;
        const newUser = {
            nombres,
            apellidos,
            correo,
        };
        await pool.query('INSERT INTO usuario set ?', [newUser]);
        res.status(201).json({
            message: 'created',
            data: 'some'
          });
    } catch (error) {
        res.status(500).json({
            message:'Error en la consulta',
            error:error.message,
        })
    }
   
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuario WHERE ID = ?', [id]);
        res.status(201).json({
            message: 'borrado con exito',
            data: id
        });
        
    } catch (error) {
        res.status(500).json({
            message:'Error en la consulta',
            error:error.message,
        })
    }
    
});

module.exports = router;
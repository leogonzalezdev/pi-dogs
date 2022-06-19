const { Router } = require('express');
const Raza = require('../models/Raza')
const Temperamento = require('../models/Temperamento');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// --------- GET ---------
router.get('/dogs', (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`)
      .then(respuesta => {
        res.json(respuesta.data)
      })
    }else{
      axios.get(`https://api.thedogapi.com/v1/breeds`)
      .then(respuesta => res.json(respuesta.data))
    }
  } catch (error) {
    res.status(400).json({msg: error})
  }
});


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

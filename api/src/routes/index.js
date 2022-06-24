const { Router } = require("express");
const Raza = require("../models/Raza");
const Temperamento = require("../models/Temperamento");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// --------- GET ---------
router.get("/dogs/:id", (req, res) => {
  const id = req.params.id;
  try {
    axios.get(`https://api.thedogapi.com/v1/breeds`).then((response) => {
      const matchDogById = response.data.find((dog) => dog.id == id);
      res.json(matchDogById);
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.get("/dogs", (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      axios
        .get(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`)
        .then((respuesta) => {
          res.json(respuesta.data);
        })
        .catch(function (error) {
          res.status(400).json({ msg: error });
        });
    } else {
      axios.get(`https://api.thedogapi.com/v1/breeds`).then((respuesta) => res.json(respuesta.data));
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// --------- POST ---------
// router.post("/dogs", async (req, res) => {
//   const { name, height, weight, life_span, image, temperaments } = req.body;
//   if (temperaments.length === 0) {
//     return res.sendStatus(500);
//   }
//   try {
//     const newBreed = await Raza.create({
//       name,
//       height,
//       weight,
//       life_span,
//       image: image,
//     });
//     await newBreed.addTemperament(temperaments);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

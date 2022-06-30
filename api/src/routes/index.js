const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
// const Temperamento = require("../models/Temperamento");
const axios = require("axios");
const { Op } = require("sequelize");
const {getBreedById, getBreedByName} = require('../controllers/controllers');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// ---------     GET DOGS    ---------
router.get("/dogs/:id", async (req, res) => {
  getBreedById(req.params.id, req, res);
});

router.get("/dogs", async (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      getBreedByName(req.query.name, req, res);
    } else {
      const localBreed = await Raza.findAll({ include: Temperamento });
      const frontBreed = [];

      localBreed.forEach((raza) => {
        const temperamentFront = [];
        raza.temperamentos.forEach((temperament) => {
          temperamentFront.push(temperament.name);
        });

        const breedObj = {
          id: raza.id,
          name: raza.name,
          height: {
            imperial: raza.height,
            metric: raza.height,
          },
          weight: {
            imperial: raza.weight,
            metric: raza.weight,
          },
          image: {
            url: raza.image,
          },
          life_span: raza.life_span,
          temperament: temperamentFront.join(", "),
        };
        frontBreed.push(breedObj);
      });
      axios.get(`https://api.thedogapi.com/v1/breeds`).then((respuesta) => res.json(frontBreed.concat(respuesta.data)));
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
// --------- GET TEMPERAMENTS ---------

router.get("/temperaments", async (req, res) => {
  const temperaments = await Temperamento.findAll();
  try {
    res.json(temperaments);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// ---------     POST DOGS    ---------
router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, image, temperament } = req.body;

  if (!height || !name || !weight || !life_span || !image)
    return res.status(400).send("Falta enviar datos obligatorios");
  try {
    const newBreed = await Raza.create({
      name,
      height,
      weight,
      life_span,
      image,
    });

    const find = await Temperamento.findAll({
      where: { name: temperament },
    });

    await newBreed.addTemperamento(find);

    return res.status(200).json(newBreed);
  } catch (error) {
    return res.status(404).json({ msg: "Error en alguno de los datos provistos", err: error });
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

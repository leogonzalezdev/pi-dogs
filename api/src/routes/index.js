const { Router } = require("express");
const {Raza, Temperamento} = require("../db");
// const Temperamento = require("../models/Temperamento");
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

router.get("/dogs", async (req, res) => {
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
      const localBreed = await Raza.findAll();
      console.log(localBreed);
      axios.get(`https://api.thedogapi.com/v1/breeds`)
      .then((respuesta) => res.json(localBreed.concat(respuesta.data)));
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// --------- POST ---------
router.post("/dogs", async (req, res) => {

  const { name, height, weight, life_span, image, temperamentos } = req.body;
  // if (temperaments.length === 0) {
  //   return res.sendStatus(500);
  // }
  if (!height || !name || !weight || !life_span || !image || !temperamentos)
    return res.status(400).send("Falta enviar datos obligatorios");
  try {
    // crear el personaje
    const newBreed = Raza.create({
      name,
      height,
      weight,
      life_span,
      image,
    });

    const find = await Temperamento.findAll({
      where: {name: temperamentos}
    });
    
    console.log(find);

    newBreed.addTemperamento(find)

    // ver que y como se crea
    // enviarlo como respuesta
    return res.status(200).json(newBreed);

  } catch (error) {
    return res.status(404).json({ msg: "Error en alguno de los datos provistos", err: error });
  }

});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

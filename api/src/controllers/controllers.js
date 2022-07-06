const { Op } = require("sequelize");
const { Raza, Temperamento } = require("../db");
const axios = require("axios");


// ------------------ GET BREED BY ID||UUID ------------------
/*
  Esta función recibe un id como parametro, si el id es un número, significa que el usuario está haciendo una busqueda que corresponde hacer a la api.
  Si el id no es un número, significa que es un uuid, lo que se va a buscar 
  dentro de la base de datos local.
*/
async function getBreedById(id, req, res) {
  if (Number(id)) {
    try {
      axios.get(`https://api.thedogapi.com/v1/breeds`).then((response) => {
        const matchDogById = response.data.find((dog) => dog.id == id);
        res.json(matchDogById);
      });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  } else {
    const localBreedById = await Raza.findByPk(id, {
      include: Temperamento,
    });
    let temperamentFront = [];
    localBreedById.temperamentos.forEach((temperament) => {
      temperamentFront.push(temperament.name);
    });

    const breedObj = {
      id: localBreedById.id,
      name: localBreedById.name,
      height: {
        imperial: localBreedById.height,
        metric: localBreedById.height,
      },
      weight: {
        imperial: localBreedById.weight,
        metric: localBreedById.weight,
      },
      image: {
        url: localBreedById.image,
      },
      life_span: localBreedById.life_span,
      temperament: temperamentFront.join(", "),
    };
    res.json(breedObj);
  }
}
// ------------------ GET BREED BY NAME ------------------
/*
  Esta función recibe un parametro name, que es el nombre de la raza, este 
  parametro puede llegar a matchear en la api como en la base de datos local
  lo cual hace que se tengan que realizar ambas búsquedas y concatenar los 
  resultados en un solo array.
*/
async function getBreedByName(name, req, res) {
  const localSearch = await Raza.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: Temperamento,
  });

  const frontBreed = [];
  if (localSearch.length > 0) {
    localSearch.forEach((raza) => {
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
  }
  axios
    .get(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`)
    .then((respuesta) => {
      if (respuesta.data.length > 0) {
        res.json(respuesta.data.concat(frontBreed));
      } else {
        res.json(frontBreed);
      }
    })
    .catch(function (error) {
      res.status(400).json({ msg: error });
    });
}
module.exports = {
  getBreedById,
  getBreedByName
}
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const port = process.env.PORT || 5000
const {Raza, Temperamento} = require('./src/db.js')
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {

  let tempsObj = {};

  axios.get(`https://api.thedogapi.com/v1/breeds`)
  .then((response) => {
    response.data?.forEach((breed) => {
      let temperamentos = breed.temperament?.split(", ");
      temperamentos?.forEach(t => {
        Temperamento.findOrCreate(
          { where: { name: t } })
          .then((t) => {
          let arrayTemp = tempsObj[breed.id] || [];
          arrayTemp.push(t[0].dataValues.id);
          tempsObj = {
            ...tempsObj,
            [breed.id]: arrayTemp,
          };
        });
      });
    });
  });

  server.listen(port, () => {
    console.log("%s listening at 5000"); // eslint-disable-line no-console
  });
});
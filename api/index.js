const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  // let temperamentosObj = {};
  // axios.get(`https://api.thedogapi.com/v1/breeds`)
  // .then( respuesta => {
  //   respuesta.data.forEach( breed => {
      
  //   });
  // })

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

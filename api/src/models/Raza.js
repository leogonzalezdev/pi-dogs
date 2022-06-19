const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:true
    },
    Nombre:{
      type: DataTypes.STRING(30),
      allowNull:true
    },
    Altura:{
      type: DataTypes.FLOAT,
      allowNull:true
    },
    Peso:{
      type: DataTypes.FLOAT,
      allowNull:true
    },
    Years:{
      type: DataTypes.INTEGER,
      someAttribute:{
        max: 30
      },
    }
  });
};
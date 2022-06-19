const { Sequelize, Op } = require("sequelize");
const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

const db = new Sequelize(
  "postgres://postgres:Legiondark0100@localhost:5432/henry_sequelize",
  {
    logging: false,
  }
);

modelCharacter(db);
modelAbility(db);
modelRole(db);

const { Character, Ability, Role } = db.models;

// aca van las relaciones

// Character - n*n-> Role
Character.belongsToMany(Role, { through: "Personaje_Rol" });
Role.belongsToMany(Character, { through: "Personaje_Rol" });

// Character - 1*n -> Ability
Character.hasMany(Ability);
Ability.belongsTo(Character);

module.exports = {
  ...db.models,
  db,
  Op,
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ability", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
    description: {
      type: DataTypes.TEXT,
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: "compositeIndex",
      validate: {
        min: 10.0,
        max: 250.0,
      },
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        // "{name} (name({mana_cost} points of mana) - Description: ${description}"

        const mana = Math.floor(this.getDataValue("mana_cost")); // 120 MATH

        return ` ${this.name} (${mana} points of mana) - Description: ${this.description}`;
      },
      set(value) {
        throw new Error("Aca no bro, esto es tipo VIRTUAL");
      },
    },
  });
};

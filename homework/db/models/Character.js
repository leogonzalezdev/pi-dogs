const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true, // no se puede repetir
        validate: {
          notHenry(value) {
            if (value.toUpperCase() === "HENRY")
              throw new Error("El código no puede ser HENRY");
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: true, // no se puede repetir
        allowNull: false,
        validate: {
          notIn: [["Henry", "SoyHenry", "Soy Henry"]],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        get() {
          // 98 ---> "98 years old"
          const edad = this.getDataValue("age");
          return edad ? `${edad} years old` : null;
        },
      },
      race: {
        type: DataTypes.ENUM(
          "Human",
          "Elf",
          "Machine",
          "Demon",
          "Animal",
          "Other"
        ),
        defaultValue: "Other",
      },
      hp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};

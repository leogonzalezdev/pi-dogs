const { Router } = require("express");
const { Op, Character, Role } = require("../db");
const Ability = require("../db/models/Ability");
const router = Router();

// all request here, start with "/character"

router.post("/", async (req, res) => {
  const { code, name, hp, mana } = req.body;

  if (!code || !name || !hp || !mana)
    return res.status(404).send("Falta enviar datos obligatorios");

  try {
    // crear el personaje
    const personaje = await Character.create({ ...req.body });
    // console.log(personaje);
    // ver que y como se crea
    // enviarlo como respuesta
    return res.status(201).json(personaje);
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "Error en alguno de los datos provistos", err: error });
  }
});

router.get("/", (req, res) => {
  // GET /character?race=Demon
  const { race, age } = req.query; // Human Elf Demon...

  // {} || {race: 'Human'} || {age: 10} || {race: 'Human', age: 10}

  try {
    if (Object.keys(req.query).length) {
      // si hay query hay que filtrar
      // where === donde
      Character.findAll({ where: req.query }).then((respuesta) =>
        res.json(respuesta)
      );
    } else {
      // si no hay query debo enviar todos
      // findAll() === SELECT * FROM Character;
      Character.findAll().then((personajes) => res.json(personajes));
    }

    // if (race) {
    //   if (age) {
    //     Character.findAll({ where: { race, age } }).then((respuesta) =>
    //       res.json(respuesta)
    //     );
    //   } else {
    //     Character.findAll({ where: { race } }).then((respuesta) =>
    //       res.json(respuesta)
    //     );
    //   }
    // } else {
    //   Character.findAll().then((personajes) => res.json(personajes));
    // }
  } catch (error) {
    return res.send(error);
  }
});

router.put("/addAbilities", async (req, res) => {
  const { codeCharacter, abilities } = req.body;

  const personaje = await Character.findByPk(codeCharacter);
  if (!personaje) return res.status(404).send("Eu, no encontre el pj");

  // crear las habilidades primero
  for (let i = 0; i < abilities.length; i++) {
    personaje.createAbility(abilities[i]);
  }

  res.json({ msg: "Todo OK", data: personaje });

  // // primero crear las habilidades
  // await Ability.bulkCreate(abilities);
  // //despues relacionarlas
  // personaje.addAbilities([])

  // relacion
});

router.get("/roles/:code", async (req, res) => {
  // const character = await Character.findByPk(req.params.code);

  // // solo para que tengan roles relacionados y veamos el include funcionar
  // character.addRoles([1, 3]);
  // // ------------------------------

  // Lazy Loading
  // const roles = await character.getRoles();

  // res.json({ ...character, roles });

  // Eager loading
  const characterWithRoles = await Character.findByPk(req.params.code, {
    include: {
      model: Role,
      attributes: ["name"],
    },
  });
  res.json(characterWithRoles);
});

router.put("/:attribute", (req, res) => {
  const { value } = req.query;
  const { attribute } = req.params;

  if (value) {
    Character.update(
      { [attribute]: attribute === "age" ? Number(value) : value },
      { where: { [attribute]: null } }
    )
      .then(() => res.send("Personajes actualizados"))
      .catch((err) => res.status(404).send("Algo salió mal..."));
  } else {
    res.status(400).send("No especificaste el valor");
  }
});

router.get("/young", (req, res) => {
  Character.findAll({ where: { age: { [Op.lt]: 25 } } }).then((respuesta) => {
    respuesta.length > 0
      ? res.json(respuesta)
      : res.status(404).send("No encontre personajes jovenes");
  });
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  if (!code) return res.status(400).send("Debes enviar un CODE por params");
  try {
    const personaje = await Character.findByPk(code);

    if (!personaje) {
      return res
        .status(404)
        .send(`El código ${code} no corresponde a un personaje existente`);
    }

    return res.json(personaje);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// FRONT END COMO ENVIAMOS UN POST AL BACK CON DATOS EN EL BODY?
// Form.jsx

// onsubmit

// BODY axios.post("http://localhost:3000/character...", state)
// QUERY axios.post("http://localhost:3000/character ? race=" + raza)
// QUERY `/character?race=${raza}`
// PARAMS `/character/${raza}`

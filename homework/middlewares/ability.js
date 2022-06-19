const { Router } = require("express");
const { Ability } = require("../db");
const router = Router();

router.get("/", (req, res) => {
  Ability.findAll().then((respuesta) => res.json(respuesta));
});

router.post("/", (req, res) => {
  const { ability } = req.body;

  if (!ability.mana_cost || !ability.name)
    return res.status(404).send("Falta enviar datos obligatorios");

  Ability.create(ability)
    .then((r) => {
      res.status(201).json(r);
    })
    .catch((err) => res.send(err));
});

// router.put("/setCharacter", (req, res) => {
//   const { idAbility, codeCharacter } = req.body;

//   if (!idAbility || !codeCharacter) res.status(400).send("Faltan datos");

//   Ability.findByPk(idAbility)
//     .then((ability) => {
//       ability
//         ? ability.setCharacter(codeCharacter)
//         : res.send("No se encontró la habilidad buscada");

//       return ability;
//     })
//     .then((ability) => res.json(ability))
//     .catch((e) => console.log(e));
// });

router.put("/setCharacter", async (req, res) => {
  const { idAbility, codeCharacter } = req.body;

  if (!idAbility || !codeCharacter) res.status(400).send("Faltan datos");

  try {
    const ability = await Ability.findByPk(idAbility);

    if (!ability) return res.send("No se encontró la habilidad buscada");

    //acá establezco la relación entre esa habilidad y el personaje al que pertenece
    ability.setCharacter(codeCharacter);

    res.status(201).json(ability);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const Agendamento = require("../database/pet_servico");
const { Router } = require("express");
const PetServico = require("../database/pet_servico");

const router = Router();

//Listagem de agendamentos
router.get("/agendamentos", async (req, res) => {
  try {
    const listaAgendamentos = await PetServico.findAll();
    res.json(listaAgendamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

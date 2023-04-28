const Agendamento = require("../database/agendamento");
const { Router } = require("express");

const Pet = require("../database/pet");
const Servico = require("../database/servico");

const router = Router();

//Listagem de agendamentos
router.get("/agendamentos", async (req, res) => {
  try {
    const listaAgendamentos = await Agendamento.findAll();
    res.json(listaAgendamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/agendamentos", async (req, res) => {
  const { dataAgendada, PetId, ServicoId } = req.body;

  try {
    const pet = await Pet.findByPk(PetId);
    const servico = await Servico.findByPk(ServicoId);
    if (pet && servico) {
      const agendamento = await Agendamento.create({
        dataAgendada,
        PetId,
        ServicoId,
      });
      res.status(201).json({
        message: "Agendamento criado com sucesso",
        agendamento: agendamento,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

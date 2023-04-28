const Agendamento = require("../database/pet_servico");
const { Router } = require("express");
const PetServico = require("../database/pet_servico");
const Pet = require("../database/pet");
const Servico = require("../database/servico");

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

router.post("/servicos", async (req, res) => {
  const { dataAgendada, PetsId, ServicosId } = req.body;

  try {
    const pet = await Pet.findByPk(PetsId);
    const servico = await Servico.findByPk(ServicosId);
    if (pet && servico) {
      const agendamento = await PetServico.create({
        dataAgendada,
        PetsId,
        ServicosId,
      });
      res
        .status(201)
        .json({
          message: "Agendamento criado com sucesso",
          agendamento: agendamento,
        });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

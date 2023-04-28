const Pet = require("../database/pet");
const Servico = require("../database/servico");
const { Router } = require("express");

const router = Router();

//Definição das rotas - criação do grupo de rotas

//Inserção de serviços
router.post("/servicos", async (req, res) => {
    const { nome, preco } = req.body;
    try {
        const novoServico = await Servico.create({ nome, preco });
        res.json(novoServico);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

//Busca de todos os serviços
router.get("/servicos", async (req, res) => {
    const listaDeServicos = await Servico.findAll();
    res.json(listaDeServicos)

});

//Busca de um único serviço
router.get("/servicos/:id", async (req, res) => {
    try {
        const servico = await Servico.findOne({ where: { id: req.params.id } });
        if (servico) {
            res.json(servico);
        } else {
            res.status(404).json({ message: "Servico não encontrado." });
        }
    } catch {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
})


module.exports = router;
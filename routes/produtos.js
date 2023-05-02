// Importação das variáveis
const Produto = require("../database/produto");
const { Router } = require("express");
// const dayjs = require("dayjs");
// const today = dayjs();
// min={today.format("YYYY-MM-DD")}

// Criação do grupo de rotas (/produtos);
const router = Router();

// Definição de Rotas

// POST
router.post("/produtos", async (req, res) => {
    // Coletar dados do req.body
    
    const { nome, preco, descricao, desconto, categoria } = req.body;
    
    try {
        const dataDesconto = new Date("2023-05-30T00:00:00.000Z");
        dataDesconto.setHours(0, 0, 0, 0);
        if (
            ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Roupas"].includes(
                categoria
            ) &&
            desconto > 0 &&
            desconto < 100 &&
            dataDesconto >= new Date()
        ) {
            const novo = await Produto.create({
                nome,
                preco,
                descricao,
                desconto,
                dataDesconto: new Date(req.body.dataDesconto),
                categoria,
            });
            res.status(201).json(novo);
            console.log(novo);
        } else {
            res.status(400).json({ message: "Dados do produto inválidos" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// GET
// GET BY ID
// PUT
// DELETE

module.exports = router;

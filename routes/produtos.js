// Importação das variáveis
const Produto = require("../database/produto");
const { Router } = require("express");

// Criação do gripo de rotas (/produtos);
const router = Router();

// Definição de Rotas

// POST
router.post("/produtos", async (req, res) => {
    // Coletar dados do req.body
    const { nome, preco, descricao, desconto, dataDesconto, categoria} = req.body;
    try {
        const novo = await Produto.create(
            { nome, preco, descricao, desconto, dataDesconto, categoria }
        );
        if (
            ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Roupas"].includes(categoria) 
            && desconto > 0 && desconto < 100 
            && new Date(dataDesconto) > new Date()
            ) 
        {
            res.status(201).json(novo);
            console.log(novo);
        } else {
            res.status(400).json({ message: "Dados do produto inválidos" });
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});



// GET
// GET BY ID
// PUT
// DELETE


module.exports = router;
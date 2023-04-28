const Servico = require("../database/servico");

const { Router } = require("express");
const router = Router();



//ADICIONANDO SERVIÇO
router.post("/servicos", async (req, res) => {
    const { nome, preco} = req.body

    try {
        const validNome = (nome) => nome.length <=3 
        if(!nome || !preco ){
        return res.status(404).json({ message: "Nome ou preço inválido." });
        }
        if(validNome(nome)){
        return res.status(404).json({ message: "Nome inválido." });
        }

        const novoServico = await Servico.create(
            { nome, preco }
        )
        res.status(201).json(novoServico);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Um erro aconteceu."});
    }
})



module.exports = router;
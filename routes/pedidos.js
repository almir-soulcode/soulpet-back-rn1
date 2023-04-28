
const Produto = require("../database/produto");
const Cliente = require("../database/cliente");
const Pedido = require("../database/pedido");

const { Router } = require("express");

const router = Router();

// Listar todos os pedidos
router.get("/pedidos", async (req, res) => {
    try {
        const listaPedidos = await Pedido.findAll();
    res.json(listaPedidos)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Mostrar os dados do pedido de acordo com o id fornecido

router.get("/pedidos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
    res.json(pedido);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Mostrar os dados do pedido de acordo com o id do produto fornecido

router.get("/pedidos/produtos/:id", async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        res.json(produto);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});
// Mostrar os dados do pedido de acordo com o id do cliente fornecido
router.get("/pedidos/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.json(cliente);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

//post

// Inserir múltiplos pedidos
router.post("/pedidos", async (req, res) => {
    try {
        const pedidos = req.body;
        const validPedidos = [];

        // Verifica se todos os campos obrigatórios estão presentes e são válidos
        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i];

            if (!pedido.produtosId || !pedido.clientesId || !pedido.quantidade) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const produto = await Produto.findByPk(pedido.produtosId);
            const cliente = await Cliente.findByPk(pedido.clientesId);

            if (!produto || !cliente) {
                return res.status(400).json({ message: "Produto ou cliente não encontrado." });
            }

            validPedidos.push(pedido);
        }

        const result = await Pedido.bulkCreate(validPedidos);

        res.json({ message: "Pedidos inseridos com sucesso.", result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


router.put("/pedidos/:id", async (req, res) =>{
    const {id} = req.params;
    const {codigo,quantidade} = req.body;
    try{
        const pedido = await Pedido.findByPk(id);
        if(pedido){
            await pedido.update({codigo, quantidade});
            res.json({message: "Pedido editado"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({messae: "Um erro aconteceu."})
    }

})

//Remove o pedido com o respectivo id.

router.delete("/pedidos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if(!pedido){
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        await pedido.destroy();
        res.json({ message: "Pedido removido." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

//Remove todos os pedidos pelo respectivo id do cliente.

router.delete("/pedidos/clientes/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findAll({ where: { clientesId: req.params.id } });
        if(pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { clientesId: req.params.id } });

        res.json({ message: "Pedidos removidos com sucesso." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

//Remove todos os pedidos pelo respectivo id do produto.
router.delete("/pedidos/produtos/:id", async (req, res) => {
    try {
        const pedido = await Pedido.findAll({ where: { produtosId: req.params.id } });
        if(pedido.length === 0) {
            return res.status(404).json({ message: "Pedidos não encontrados." });
        }
        await pedido.destroy({ where: { produtosId: req.params.id } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});



module.exports = router;


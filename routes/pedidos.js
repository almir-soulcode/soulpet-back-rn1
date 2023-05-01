const Pedido = require("../database/pedido");
const Cliente = require("../database/cliente");

const { Router } = require("express");
const Produto = require("../database/produto");

// /pedidos
// Esta rota deve listar todos os pedidos.

const router = Router();
router.get("/pedidos", async (req, res) => {
  const listaPedidos = await Pedido.findAll();
  res.json(listaPedidos);
});

// /pedidos/:id
// Esta rota deve mostrar os dados do pedido de acordo com o id fornecido.
// O pedido retornado deve incluir os valores do produto e do cliente relacionado.

router.get("/pedidos/:id", async (req, res) => {
  const dadosPedido = await Pedido.findAll({
    where: { id: req.params.id },
    include: [Produto, Cliente],
  });

  if (dadosPedido) {
    res.json(dadosPedido);
  } else {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
});

// /pedidos/produtos/:id
// Esta rota deve mostrar os dados do pedido de acordo com o id do produto fornecido.
// O pedido retornado deve incluir os valores do cliente relacionado.

router.get("/pedidos/produtos/:id", async (req, res) => {
  const dadosPedido = await Pedido.findAll({
    where: { ProdutoId: req.params.id },
    include: [Produto, Cliente],
  });

  if (dadosPedido) {
    res.json(dadosPedido);
  } else {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
});

// /pedidos/clientes/:id
// Esta rota deve mostrar os dados do pedido de acordo com o id do cliente fornecido.
// O pedido retornado deve incluir os valores do produto relacionado.

router.get("/pedidos/clientes/:id", async (req, res) => {
  const dadosPedido = await Pedido.findAll({
    where: { ClienteId: req.params.id },
    include: [Produto],
  });

  if (dadosPedido) {
    res.json(dadosPedido);
  } else {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
});

// /pedidos
// A requisição deve receber em seu corpo um vetor de pedidos, que devem ser inseridos.
// Todos os campos do Body devem ser checados e validados antes de realizar inserção.
// Dica: bulkCreate

router.post("/pedidos", async (req, res) => {
  const pedidos = req.body;

  if (!pedidos || !Array.isArray(pedidos) || pedidos.length === 0) {
    res.status(400).json({ message: "Pedido inválido" });
    return;
  }

  try {
    const novosPedidos = await Pedido.bulkCreate(
      pedidos.map(pedido => ({
        codigo: pedido.codigo,
        quantidade: pedido.quantidade,
        ProdutoId: pedido.ProdutoId,
        ClienteId: pedido.ClienteId,
      }))
    );
    res.status(201).json(novosPedidos);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({ message: "Pedido inválido", errors: err.errors });
    } else {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  }
});

module.exports = router;

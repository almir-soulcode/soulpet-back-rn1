const Pedidos = require("../database/pedidos");
const Cliente = require("../database/cliente");
const Produto = require("../database/produto");
const { Router } = require("express");

const router = Router();

// Rota para listar todos os pedidos
router.get("/pedidos", async (req, res) => {
  const pedidos = await Pedidos.findAll({
    include: [Cliente, Produto], // traz junto os dados de cliente e produto
  });
  res.json(pedidos);
});

// Rota para mostrar um pedido específico
router.get("/pedidos/:id", async (req, res) => {
  const pedidos = await Pedidos.findOne({
    include: [Cliente, Produto], // traz junto os dados de cliente e produto
  });

  if (pedidos) {
    res.json(pedidos);
  } else {
    res.status(404).json({ message: "Pedido não encontrado." });
  }
});

// Rota para mostrar um pedido de acordo com o id do produto fornecido
router.get("/pedidos/produtos/:id", async (req, res) => {
  const pedidos = await Pedidos.findAll({
    include: [
      {
        model: Produto,
      },
      {
        model: Cliente,
      },
    ],
  });

  if (pedidos) {
    const filteredPedidos = pedidos.filter((pedido) =>
      pedido.produtos.some((produto) => produto.id === req.params.id)
    );
    res.json(filteredPedidos);
  } else {
    res.status(404).json({ message: "Pedido não encontrado." });
  }
});

// Rota para mostrar um pedido de acordo com o id do cliente fornecido
router.get("/pedidos/clientes/:id", async (req, res) => {
  const pedidos = await Pedidos.findAll({
    include: [Produto], // traz junto os dados de produto
  });
  res.json(pedidos);
});

router.post('/pedidos', async (req, res) => {
  try {
    const pedidos = req.body;

    // Verifica se o corpo da requisição contém um array de pedidos
    if (!Array.isArray(pedidos)) {
      return res.status(400).json({ message: 'O corpo da requisição deve ser um array de pedidos' });
    }

    // Valida os campos de cada pedido
    const pedidosValidos = pedidos.every(pedido => {
      return !!pedido.produto && !!pedido.quantidade && !!pedido.valor_unitario;
    });

    // Se algum pedido estiver inválido, retorna um erro 400
    if (!pedidosValidos) {
      return res.status(400).json({ message: 'Cada pedido deve ter um produto, quantidade e valor_unitario' });
    }

    // Insere os pedidos no banco de dados
    const resultado = await Pedidos.bulkCreate(pedidos);

    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao inserir pedidos' });
  }
});

router.put('/pedidos/:id', async (req, res) => {
  try {
    const pedidoAtualizado = req.body;
    const pedidoId = req.params.id;

    // Busca o pedido no banco de dados
    const pedido = await Pedidos.findByPk(pedidoId);

    // Verifica se o pedido existe
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Atualiza o pedido com os novos valores
    pedido.produto = pedidoAtualizado.produto || pedido.produto;
    pedido.quantidade = pedidoAtualizado.quantidade || pedido.quantidade;
    pedido.valor_unitario = pedidoAtualizado.valor_unitario || pedido.valor_unitario;

    // Salva as mudanças no banco de dados
    await pedido.save();

    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar pedido' });
  }
});

module.exports = router;
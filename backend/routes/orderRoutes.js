const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Protege todas as rotas (só logado pode comprar/ver)
router.use(authMiddleware);

// CRIAR PEDIDO (CHECKOUT)
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Carrinho vazio" });
    }

    // 1. Cria o Pedido
    const newOrder = await Order.create({
      userId: req.user.id,
      items,
      total,
      status: "Processando",
    });

    // 2. Limpa o Carrinho do Usuário (Opcional, mas recomendado)
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [] } }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

// LISTAR MEUS PEDIDOS
router.get("/", async (req, res) => {
  try {
    // Busca pedidos do usuário e ordena do mais recente para o mais antigo (-1)
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
});

module.exports = router;

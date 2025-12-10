const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          quantity: quantity || 1,
          price: product.price,
          image: product.image,
        });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            name: product.name,
            quantity: quantity || 1,
            price: product.price,
            image: product.image,
          },
        ],
      });
    }

    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao adicionar ao carrinho");
  }
});

//exibe depois
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).send("Erro ao buscar carrinho");
  }
});

module.exports = router;

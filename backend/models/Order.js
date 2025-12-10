const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      size: String,
      color: String,
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    default: "Processando",
    enum: ["Processando", "Em trânsito", "Entregue", "Cancelado"],
  },
  createdAt: { type: Date, default: Date.now },
});

// Configuração para o ID ficar bonito no frontend
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Order", OrderSchema);

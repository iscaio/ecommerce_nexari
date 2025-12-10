const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // ex: 'P', 'M'
    stock: { type: Number, default: 0 }, // ex: 5
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number }, // Para riscar o preço
  discount: { type: Number }, // % do desconto
  onSale: { type: Boolean, default: false }, // Ativa a badge de promoção
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  colors: [{ type: String }],
  sizes: [SizeSchema], // Array com controle de estoque
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", ProductSchema);

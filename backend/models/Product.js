const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  discount: { type: Number },
  onSale: { type: Boolean, default: false },
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  colors: [{ type: String }],
  sizes: [SizeSchema],
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", ProductSchema);

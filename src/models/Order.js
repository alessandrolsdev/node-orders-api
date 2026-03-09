const mongoose = require("mongoose");

/**
 * Schema do item dentro de um pedido
 * Campos mapeados: idItem → productId, quantidadeItem → quantity, valorItem → price
 */
const itemSchema = new mongoose.Schema({
  productId: { type: Number, required: [true, "productId é obrigatório"] },
  quantity:  { type: Number, required: [true, "quantity é obrigatório"], min: [1, "quantity deve ser >= 1"] },
  price:     { type: Number, required: [true, "price é obrigatório"],    min: [0, "price não pode ser negativo"] },
});

/**
 * Schema principal do pedido
 * orderId é único e serve como identificador de negócio (ex: v10089016vdb)
 */
const orderSchema = new mongoose.Schema(
  {
    orderId:      { type: String, required: [true, "orderId é obrigatório"], unique: true, trim: true },
    value:        { type: Number, required: [true, "value é obrigatório"],   min: [0, "value não pode ser negativo"] },
    creationDate: { type: Date,   required: [true, "creationDate é obrigatório"] },
    items: {
      type: [itemSchema],
      validate: { validator: (arr) => arr.length > 0, message: "O pedido deve ter ao menos um item" },
    },
  },
  { versionKey: "__v", timestamps: false }
);

module.exports = mongoose.model("Order", orderSchema);

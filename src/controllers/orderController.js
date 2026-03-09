const Order  = require("../models/Order");
const { mapRequestToDatabase, mapDatabaseToResponse } = require("../utils/mapper");

/**
 * @desc  Cria um novo pedido
 * @route POST /order
 */
const createOrder = async (req, res) => {
  try {
    const orderData = mapRequestToDatabase(req.body);

    const existing = await Order.findOne({ orderId: orderData.orderId });
    if (existing) {
      return res.status(409).json({ success: false, message: `Pedido '${orderData.orderId}' já existe.` });
    }

    const order = await Order.create(orderData);
    return res.status(201).json({ success: true, message: "Pedido criado com sucesso.", data: mapDatabaseToResponse(order) });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Erro de validação.", errors: messages });
    }
    console.error("Erro em createOrder:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

/**
 * @desc  Obtém um pedido pelo orderId
 * @route GET /order/:orderId
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }
    return res.status(200).json({ success: true, data: mapDatabaseToResponse(order) });
  } catch (error) {
    console.error("Erro em getOrderById:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

/**
 * @desc  Lista todos os pedidos
 * @route GET /order/list
 */
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ creationDate: -1 });
    return res.status(200).json({ success: true, total: orders.length, data: orders.map(mapDatabaseToResponse) });
  } catch (error) {
    console.error("Erro em listOrders:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

/**
 * @desc  Atualiza um pedido pelo orderId
 * @route PUT /order/:orderId
 */
const updateOrder = async (req, res) => {
  try {
    const updateData = mapRequestToDatabase(req.body);
    const order = await Order.findOneAndUpdate({ orderId: req.params.orderId }, updateData, { new: true, runValidators: true });

    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }
    return res.status(200).json({ success: true, message: "Pedido atualizado com sucesso.", data: mapDatabaseToResponse(order) });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Erro de validação.", errors: messages });
    }
    console.error("Erro em updateOrder:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

/**
 * @desc  Deleta um pedido pelo orderId
 * @route DELETE /order/:orderId
 */
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }
    return res.status(200).json({ success: true, message: `Pedido '${req.params.orderId}' deletado com sucesso.` });
  } catch (error) {
    console.error("Erro em deleteOrder:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };

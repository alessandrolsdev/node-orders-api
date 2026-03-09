/**
 * Mapeamento de campos entre o formato do request e o banco de dados:
 *   numeroPedido     → orderId
 *   valorTotal       → value
 *   dataCriacao      → creationDate
 *   items[].idItem           → items[].productId
 *   items[].quantidadeItem   → items[].quantity
 *   items[].valorItem        → items[].price
 */

const mapRequestToDatabase = (body) => {
  const { numeroPedido, valorTotal, dataCriacao, items = [] } = body;
  return {
    orderId:      numeroPedido,
    value:        valorTotal,
    creationDate: new Date(dataCriacao),
    items: items.map((item) => ({
      productId: Number(item.idItem),
      quantity:  item.quantidadeItem,
      price:     item.valorItem,
    })),
  };
};

const mapDatabaseToResponse = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id:          obj._id,
    orderId:      obj.orderId,
    value:        obj.value,
    creationDate: obj.creationDate,
    items:        obj.items.map((item) => ({ productId: item.productId, quantity: item.quantity, price: item.price, _id: item._id })),
    __v:          obj.__v,
  };
};

module.exports = { mapRequestToDatabase, mapDatabaseToResponse };

require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

/**
 * Inicializa o servidor:
 * 1. Conecta ao MongoDB
 * 2. Sobe o servidor HTTP na porta definida
 */
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
  });
};

startServer();

require("dotenv").config();
const express    = require("express");
const swaggerUi  = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const { initAdminUser } = require("./controllers/authController");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes  = require("./routes/authRoutes");

const app = express();

// ── Middlewares globais ───────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Documentação Swagger ──────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Rotas ─────────────────────────────────────────────────────
app.use("/auth",  authRoutes);
app.use("/order", orderRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "node-orders-api está funcionando ✅", docs: "http://localhost:3000/api-docs" });
});

// ── Rota não encontrada ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Rota '${req.method} ${req.originalUrl}' não encontrada.` });
});

// ── Erro global ───────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ success: false, message: "Erro interno do servidor." });
});

initAdminUser();

module.exports = app;

const jwt = require("jsonwebtoken");

/**
 * Middleware de autenticação JWT
 * Verifica o token Bearer no header Authorization antes de processar a rota
 * Header esperado: Authorization: Bearer <token>
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Token não fornecido. Use: Authorization: Bearer <token>" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ success: false, message: "Formato inválido. Use: Authorization: Bearer <token>" });
  }

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error.name === "TokenExpiredError" ? "Token expirado. Faça login novamente." : "Token inválido.";
    return res.status(401).json({ success: false, message });
  }
};

module.exports = authMiddleware;

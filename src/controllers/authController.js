const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcryptjs");

// Usuário admin mantido em memória (sem model no banco para simplificar)
let adminUser = null;

/**
 * Inicializa o usuário admin com senha hasheada — chamado uma vez ao subir o app
 */
const initAdminUser = async () => {
  const password       = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  adminUser = { username: process.env.ADMIN_USERNAME || "admin", password: hashedPassword };
  console.log(`👤 Usuário admin criado: ${adminUser.username}`);
};

/**
 * @desc  Autentica o usuário e retorna um token JWT
 * @route POST /auth/login
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username e password são obrigatórios." });
    }

    if (!adminUser || username !== adminUser.username) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { username: adminUser.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    return res.status(200).json({ success: true, message: "Login realizado com sucesso.", token, expiresIn: process.env.JWT_EXPIRES_IN || "24h" });
  } catch (error) {
    console.error("Erro em login:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};

module.exports = { login, initAdminUser };
